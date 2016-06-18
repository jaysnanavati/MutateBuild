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
        return Meteor.user().provider.github.avatar_url;
    },
    appName: function() {
        return null;
    }
});

Template.home.onCreated(function() {
    HTTP.call('GET', 'https://api.github.com/user', { params: { access_token: Meteor.user().services.github.accessToken } }, function(error, response) {
        console.log(response);
    });
});
