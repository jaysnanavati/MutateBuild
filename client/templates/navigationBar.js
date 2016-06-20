Template.navigationBar.helpers({
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
})
