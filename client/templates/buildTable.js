BuildLogs = new Meteor.Collection("BuildLogs");

var activeApp;

Template.registerHelper('shortSSH', function(sshString) {
    if (sshString.length > 7) {
        return Spacebars.SafeString(sshString.substring(0, 7));
    } else {
        return Spacebars.SafeString(sshString);
    }
});

Template.registerHelper('icon', function(status) {
    if (status === "running") {
        return "fa fa-refresh fa-spin fa-fw build-running";
    } else if (status === "passed") {
        return "fa fa-check  build-passed";
    } else if (status === "failed") {
        return "fa fa-exclamation-circle  build-failed";
    } else {
        return "fa fa-exclamation-triangle  build-failed";
    }

});

Template.registerHelper('record', function(record) {
    if (record == null) {
        return "-";
    } else {
        return record;
    }
});
Template.buildTable.helpers({
    appName: function() {
        return activeApp.name;
    },
    buildLogs: function() {
        return BuildLogs.find({ repoId: activeApp._id }, { sort: { started: -1 } })
    },
    buildStatus: function() {
        return BuildLogs.findOne({ repoId: activeApp._id }, { sort: { started: -1 } })
    }
});

Template.buildTable.events({
    'click .bildRepo-btn': function(e) {
        // code goes here
        Meteor.call("bildRepo", activeApp, null);
    },
    'click .build-item': function(e) {
        FlowRouter.go('/build/' + this._id);
    }
});

Template.buildTable.onCreated(function() {
    var self = this;
    activeApp = ManagedRepos.findOne({ isActive: true, owner: Meteor.userId() });
    self.autorun(function() {
        self.subscribe("getBuildLogs");
    })
});
