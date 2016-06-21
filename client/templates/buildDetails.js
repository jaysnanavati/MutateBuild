var buildId;

Template.buildDetails.helpers({
    logs: function(buildId) {
        buildId = buildId;
        return BuildLogs.findOne({ _id: buildId }).logs
    },
    buildStatus: function(buildId) {
        var status = BuildLogs.findOne({ _id: buildId }).status
        if (status === "running") {
            return "fa fa-refresh fa-spin fa-fw build-running";
        } else if (status === "passed") {
            return "fa fa-check  build-passed";
        } else if (status === "failed") {
            return "fa fa-exclamation-circle  build-failed";
        }
    },
    isRunning: function(buildId) {
        var status = BuildLogs.findOne({ _id: buildId }).status
        return status === "running";
    },
    revision: function(buildId) {
        return BuildLogs.findOne({ _id: buildId }).revision.substring(0, 7)
    },
    totalTests: function(buildId) {
        return BuildLogs.findOne({ _id: buildId }).totalTests
    },
    totalGenerated: function(buildId) {
        return BuildLogs.findOne({ _id: buildId }).totalGenerated
    },
    totalKilled: function(buildId) {
        return BuildLogs.findOne({ _id: buildId }).totalKilled
    },
    overallMS: function(buildId) {
        return BuildLogs.findOne({ _id: buildId }).overallMS
    },
    averageCFD: function(buildId) {
        return BuildLogs.findOne({ _id: buildId }).averageCFD
    },
    totalEquivalent: function(buildId) {
        return BuildLogs.findOne({ _id: buildId }).totalEquivalent
    },
    generatedMutants: function(buildId) {
        var result = [];
        var data = BuildLogs.findOne({ _id: buildId });
        _.each(_.keys(data.gstats), function(k) {
            result.push({ mutationCode: k, count: ((parseInt(data.gstats[k]["generated_mutants"]) / data.totalGenerated) * 100).toFixed(2) });
        });
        return _.sortBy(result, "count");
    },
    cfdMutants: function(buildId) {
        var result = [];
        var data = BuildLogs.findOne({ _id: buildId });
        _.each(_.keys(data.gstats), function(k) {
            result.push({ mutationCode: k, count: ((parseFloat(data.gstats[k]["average_CFD"]) / data.averageCFD) * 100).toFixed(2) });
        });
        return _.sortBy(result, "count");
    },
    survivedPie: function(buildId) {
        var result = [];
        var data = BuildLogs.findOne({ _id: buildId });
        var SSD = 0;
        var SSWDVE = 0;
        var SSWDCFD = 0;
        _.each(_.keys(data.gstats), function(k) {
            if (data.gstats[k]["survived_SD"]) {
                SSD += parseInt(data.gstats[k]["survived_SD"]);
            }
            if (data.gstats[k]["survived_WD_CFD"]) {
                SSWDCFD += parseInt(data.gstats[k]["survived_WD_CFD"]);
            }
            if (data.gstats[k]["survived_WD_VE"]) {
                SSWDVE += parseInt(data.gstats[k]["survived_WD_VE"]);
            }
        });
        return [{
            type: "CFDVE",
            color: "blue",
            count: ((SSD / (SSD + SSWDVE + SSWDCFD) * 100)).toFixed(2)
        }, {
            type: "CFD",
            color: "green",
            count: ((SSWDCFD / (SSD + SSWDVE + SSWDCFD)) * 100).toFixed(2)
        }, {
            type: "VE",
            color: "purple",
            count: ((SSWDVE / (SSD + SSWDVE + SSWDCFD)) * 100).toFixed(2)
        }]
    }
})


Template.buildDetails.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe("getBuildLogs");
    })
});

Template.buildDetails.events({
    'click .back-to-builds': function(e) {
        // code goes here
        FlowRouter.go('/home');
    }
});
