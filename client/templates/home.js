Template.home.helpers({
    activeApp: function() {
        return ManagedRepos.findOne({ isActive: true, owner: Meteor.userId() });
    }
});
