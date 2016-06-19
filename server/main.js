import { Meteor } from 'meteor/meteor';

import "./accounts.js"

Meteor.startup(() => {
    // code to run on server at startup

    Meteor.methods({
        getUserAvatarURL: function() {
            return "https://avatars2.githubusercontent.com/u/2691401?s=72";
        },
        getUserRepos: function() {
            return "repos from server"
        }
    });
});
