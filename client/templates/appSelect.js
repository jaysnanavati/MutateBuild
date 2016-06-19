Template.appSelect.helpers({
    username: function() {
        return Meteor.user().services.github.username
    },
    userImageURL: function() {
        return return Meteor.user().profile.avatar_url;
    }
});

Template.appSelect.onCreated(function() {
    Meteor.call("getUserRepos", function(error, results) {
        console.log(results); //results.data should be a JSON object
    });
});
