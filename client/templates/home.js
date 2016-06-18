Template.home.helpers({
    fullName: function() {
        return Meteor.user().profile.name;
    }
});
