import { Meteor } from 'meteor/meteor';

import "./accounts.js"

Meteor.startup(() => {
    // code to run on server at startup

    Meteor.methods({
        getUserAvatarURL: function() {
            var access_token = this.user.services.github.accessToken;
            result = Meteor.http.get("https://api.github.com/user", {
                params: {
                    access_token: access_token
                }
            });
            if (result.error)
                throw result.error;

            return result.data;
        },
        getUserRepos: function() {
            return "repos from server"
        }
    });
});
