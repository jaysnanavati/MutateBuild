Template.buildDetails.helpers({
    logs: function(buildId) {
        return BuildLogs.findOne({ _id: buildId }).logs
    }
})

Template.buildDetails.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe("getBuildLogs");
    })
});
