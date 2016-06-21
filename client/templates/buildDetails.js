Template.buildDetails.helpers({
    logs: function(buildId) {
        return BuildLogs.findOne({ _id: buildId }).logs
    },
    buildStatus: function(buildId) {
        return BuildLogs.findOne({ _id: buildId }).status
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
