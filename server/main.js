import { Meteor } from 'meteor/meteor';

import "./accounts.js"

Meteor.startup(() => {
    // code to run on server at startup

    Meteor.methods({
        getUserAvatarURL: function() {

        },
        getUserRepos: function() {
            return "repos from server"
        }
    });
});
