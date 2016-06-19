if (Meteor.isClient) {
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
            return Meteor.user().services.github.avatar_url;
        },
        appName: function() {
            return null;
        }
    });

    Template.home.onRendered(function() {

    });
}
