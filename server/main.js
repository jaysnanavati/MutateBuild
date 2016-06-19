import { Meteor } from 'meteor/meteor';

import "./accounts.js"

Meteor.startup(() => {
    // code to run on server at startup

    Meteor.methods({
        getUserRepos: function() {
            this.unblock();
            return "repos from server"
        }
    });
});
