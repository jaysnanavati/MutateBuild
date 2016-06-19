Accounts.onCreateUser(function(options, user) {
    console.log(user);
    var accessToken = user.services.github.accessToken,
        result,
        profile;
    result = Meteor.http.get("https://api.github.com/user", {
        params: {
            access_token: accessToken
        }
    });
    if (result.error)
        throw result.error;

    profile = _.pick(result.data,
        "login",
        "name",
        "avatar_url",
        "url",
        "company",
        "blog",
        "location",
        "email",
        "bio",
        "html_url");

    user.profile = profile;

    return user;
});

Accounts.onLogin(function(data) {
    if (!Meteor.user().services.github.avatar_url) {
        Meteor.user().services.github.avatar_url = "https://avatars2.githubusercontent.com/u/2691401?s=72";
    }
})
