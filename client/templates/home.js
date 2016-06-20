Template.home.helpers({
    fullName: function() {
        if (Meteor.user()) {
            return Meteor.user().profile.name;
        } else {
            return null;
        }
    },
    userImageURL: function() {
        return "https://avatars2.githubusercontent.com/u/2691401?s=72"
    },
    activeApp: function() {
        return ManagedRepos.findOne({ isActive: true, owner: Meteor.userId() });
    }
});

Template.home.onCreated(function() {});
