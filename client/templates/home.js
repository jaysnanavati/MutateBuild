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
        Meteor.call('getUserAvatarURL', function(error, response) {
            Meteor.users.update({ _id: Meteor.userId() }, { $set: { 'profile.avatar_url': response } })
            console.log(response);
            return Meteor.user().profile.avatar_url;
        });
    },
    appName: function() {
        return null;
    }
});
