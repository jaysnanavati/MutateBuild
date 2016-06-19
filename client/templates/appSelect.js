Template.appSelect.helpers({
    username: function() {
        return Meteor.user().services.github.username
    },
    userImageURL: function() {
        return "https://avatars2.githubusercontent.com/u/2691401?s=72";
    }
});

Template.appSelect.onCreated(function() {
    Meteor.call("getUserRepos", function(error, results) {
        console.log(results); //results.data should be a JSON object
    });
});
