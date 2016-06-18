Template.home.helpers({
    firstName: function() {
        return Meteor.user().profile.first_name;
    },
    fullName: function() {
        return Meteor.user().profile.first_name + " " + Meteor.user().profile.last_name;
    }
});
