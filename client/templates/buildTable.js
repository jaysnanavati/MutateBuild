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
        return "fa fa-refresh fa-spin fa-fw fa-2x build-running";
    } else if (status === "passed") {
        return "fa fa-check fa-2x build-passing";
    } else if (status === "failed") {
        return "fa fa-exclamation-circle fa-2x build-failing";
    } else {
        return "fa fa-exclamation-triangle fa-2x build-failing";
    }

});

Template.registerHelper('record', function(record) {
    if (record == null) {
        return "-";
    } else if (record instanceof Number) {
        return record.toFixed(2);
    } else {
        return record;
    }
});

Template.buildTable.helpers({
    appName: function() {
        return activeApp.name;
    },
    buildPassing: function() {
        return false;
    },
    buildLogs: function() {
        return BuildLogs.find({ repoId: activeApp._id }, { sort: { started: -1 } })
    }
});

Template.buildTable.events({
    'click .bildRepo-btn': function(e) {
        // code goes here
        Meteor.call("bildRepo", activeApp, null);
    }
});

Template.buildTable.onCreated(function() {
    var self = this;
    activeApp = ManagedRepos.findOne({ isActive: true, owner: Meteor.userId() });
    self.autorun(function() {
        self.subscribe("getBuildLogs");
    })
});
