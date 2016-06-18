Template.appSelect.helpers({
    username: function() {
        return Meteor.user().services.github.username
    },
    userImageURL: function() {
        return "https://avatars2.githubusercontent.com/u/2691401?s=72";
    },
});
