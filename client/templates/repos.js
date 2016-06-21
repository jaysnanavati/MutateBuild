Repos = new Meteor.Collection(null);
ManagedRepos = new Meteor.Collection("ManagedRepos");

Template.Repos.helpers({
    username: () => {
        // on the client
        if (Meteor.user()) {
            return Meteor.user().services.github.username
        } else {
            return null;
        }
    },
    userImageURL: () => {
        return "https://avatars2.githubusercontent.com/u/2691401?s=72"
    },
    repos: () => {
        return Repos.find({ owner: Meteor.userId(),language: "C" });
    }
});

Template.Repos.events({
    'click .repo-selection': function(e) {
        // code goes here
        $(e.currentTarget).parents().find(".appselect-build-btn").removeClass("show")
        $(e.currentTarget).parent().find(".appselect-build-btn").toggleClass("show")
        $(e.currentTarget).closent(".repo-item").toggleClass("selected")
    },
    'click .appselect-build-btn': function(e) {
        var newObject = jQuery.extend(true, { isActive: true }, this);
        ManagedRepos.insert(newObject);
    }
});

Template.Repos.onCreated(function() {
    var self = this;
    self.autorun(function() {
        var user = Meteor.user();
        if (user && user.services) {
            HTTP.call('GET', 'https://api.github.com/users/' + user.services.github.username + "/repos?per_page=1000", {
                params: {
                    "access_token": user.services.github.accessToken
                },
                headers: {
                    "User-Agent": "node.js"
                }
            }, function(error, response) {
                if (error) {
                    console.log(error);
                } else {
                    _.each(response.data, function(repo) {
                        Repos.insert({ gitId: repo.id, name: repo.name, clone_url: repo.clone_url, description: repo.description, language: repo.language, default_branch: repo.default_branch, owner: Meteor.userId() });
                    })
                }
            });
        }
    });
});
