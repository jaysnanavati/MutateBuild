Template.home.helpers({
    fullName: function() {
        return Meteor.user().profile.name;
    },
    repoName: function() {
        return "2048 Demo"
    },
    buildPassing: function() {
        return true;
    },
    userImageURL: function() {
        return "https://avatars2.githubusercontent.com/u/2691401?s=72";
    },
    appName: function() {
        return null;
    }
});
