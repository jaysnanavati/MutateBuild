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
        HTTP.call('GET', 'https://api.github.com/user', { params: { access_token: Meteor.user().services.github.accessToken } }, function(error, response) {
            Meteor.users.update({ _id: Meteor.userId() }, { $set: { 'services.github.avatar_url': response } })
            console.log(response);
            return Meteor.user().services.github.avatar_url;
        });
    },
    appName: function() {
        return null;
    }
});
