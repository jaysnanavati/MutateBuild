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
        return Meteor.call('getUserAvatarURL', function(error, response) {
            Meteor.users.update({ _id: Meteor.userId() }, { $set: { 'profile.avatar_url': response } })
            console.log(response);
        });
    },
    appName: function() {
        return null;
    }
});

Template.home.onCreated(function() {
    Meteor.call('getUserAvatarURL', function(error, response) {
        Meteor.users.update({ _id: Meteor.userId() }, { $set: { 'profile.avatar_url': response } })
        console.log(response);
    });
})
