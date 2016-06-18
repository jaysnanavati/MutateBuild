Template.home.helpers({
    firstName: function() {
        return Meteor.user().profile.first_name;
    },
    full_name: function() {
        return Meteor.user().profile.first_name + " " + Meteor.user().profile.last_name;
    }
});
