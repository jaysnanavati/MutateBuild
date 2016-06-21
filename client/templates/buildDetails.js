Template.buildDetails.helpers({
    logs: function(buildId) {
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
    revision: function(buildId) {
        return BuildLogs.findOne({ _id: buildId }).revision.substring(0, 7)
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
