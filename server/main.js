import { Meteor } from 'meteor/meteor';
import "./accounts.js"
import Fiber from 'fibers'

require('shelljs/global');
var parseString = require('xml2js').parseString;
xml2js = require('xml2js');

const fs = require("fs");
const path = require('path');

ManagedRepos = new Meteor.Collection("ManagedRepos");
BuildLogs = new Meteor.Collection("BuildLogs");

Meteor.startup(() => {
    Meteor.publish("getUserData", function() {
        return Meteor.users.find({ _id: this.userId });
    });
    Meteor.publish("getManagedRepos", function() {
        return ManagedRepos.find({ owner: this.userId });
    });
    Meteor.publish("getBuildLogs", function() {
        return BuildLogs.find({ owner: this.userId });
    });

    // code to run on server at startup
    Meteor.methods({
        bildRepo: function(activeApp, lastCommit, callback) {
            if (!lastCommit) {
                //get last commit
                var user = Meteor.users.findOne({ _id: Meteor.userId() });
                HTTP.call('GET', 'https://api.github.com/repos/' + user.services.github.username + "/" + activeApp.name + "/commits", {
                    params: {
                        "access_token": user.services.github.accessToken,
                        "per_page": 1
                    },
                    headers: {
                        "User-Agent": "node.js"
                    }
                }, function(error, response) {
                    if (error) {
                        console.log(error);
                    } else {
                        handleLastCommit(_.first(response.data));
                    }
                });
            } else {
                handleLastCommit(lastCommit);
            }

            function handleLastCommit(commit) {
                //Insert a new build log
                var data = {
                    "repoId": activeApp._id,
                    "owner": Meteor.userId(),
                    "started": new Date(),
                    "status": "running",
                    "author": commit.commit.author.name,
                    "revision": commit.sha,
                    "commit_message": commit.commit.message
                }
                BuildLogs.insert(data, function(error, docId) {
                    //build exec steps
                    if (docId) {
                        var home = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
                        var buildLocation = home + "/mutatebuilds/" + docId;
                        shell.mkdir("-p", buildLocation);
                        shell.exec("git clone " + activeApp.clone_url + " " + buildLocation, function(code, stdout, stderr) {
                            if (code == 0) {
                                var mutationSettings = JSON.parse(shell.cat(buildLocation + "/mut-settings.json"));
                                //prepare config string
                                var config = [
                                    'sourceRootDir="' + buildLocation + '";',
                                    'executablePath="' + docId + "/" + mutationSettings.executable + '";',
                                    'source=' + (JSON.stringify(mutationSettings.source).replace("[", "(").replace("]", ")")) + ";",
                                    'testingFramework="' + mutationSettings.testingFramework + '";',
                                    'CuTestLibSource="' + mutationSettings.CuTestLibSource + '";'
                                ]
                                shell.exec("touch " + buildLocation + "/config.cfg", function(code, stdout, stderr) {
                                    _.each(config, function(c) {
                                        var sc = ShellString(c + "\n");
                                        sc.toEnd(buildLocation + "/config.cfg");
                                    })
                                    shell.exec("bash " + home + "/runMutation.sh " + docId, function(code, stdout, stderr) {
                                        //parse results
                                        if (code == 0) {
                                            var resultsLocation = home + "/mutatebuilds/exec_" + docId + '/gstats.xml';
                                            var parser = new xml2js.Parser();
                                            fs.readFile(resultsLocation, function(err, data) {
                                                if (!err) {
                                                    Fiber(function() {
                                                        parser.parseString(data, function(err, result) {
                                                            if (!err) {
                                                                BuildLogs.update({ _id: docId }, { $set: parseResult(result) });
                                                            }
                                                        });
                                                    }).run();
                                                }
                                            });
                                        }
                                    });
                                });
                            }
                        });
                    }
                });
            }

            function parseResult(result) {
                var gstats = result.gstats;
                var mutationOperators = gstats.mutation_operator;
                //aggregated data
                var totalGenerated = 0;
                var totalSurvived = 0;
                var totalKilled = 0;
                var overallMS = 0;

                _.each(mutationOperators, function(operator) {
                    totalGenerated += operator["-generated_mutants"];
                })

                return {
                    totalTests: gstats["aggregate_stats"]["-total_tests_run"],
                    totalGenerated: totalGenerated,
                    totalSurvived: totalSurvived,
                    totalKilled: totalKilled,
                    overallMS: overallMS
                }
            }
        }
    })
});
