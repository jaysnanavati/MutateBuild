import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

FlowRouter.route('/', {
    name: 'Root',
    triggersEnter: [function(context, redirect) {
        redirect("Home.Show")
    }]
});

FlowRouter.route('/test', {
    name: 'Home.Test',
    action(params, queryParams) {
        HTTP.call('GET', 'https://api.github.com/user', { params: { access_token: Meteor.user().provider.github.accessToken } }, function(error, response) {
            if (error) {
                console.log(error);
            } else {
                Meteor.user().provider.github.avatar_url = response.data.avatar_url;
                Meteor.user().provider.github.repos_url = response.data.repos_url;
                BlazeLayout.render('home', {});
            }
        });
    }
});

FlowRouter.route('/home', {
    name: 'Home.Show',
    triggersEnter: checkUserLoggedIn,
    action(params, queryParams) {
        BlazeLayout.render('home', {});
    }
});

FlowRouter.route('/login', {
    name: 'Login.Show',
    triggersEnter: [function(context, redirect) {
        if (Meteor.userId()) {
            redirect("Home.Show")
        }
    }],
    action(params, queryParams) {
        BlazeLayout.render('login_page_template', {});
    }
});

function checkUserLoggedIn(context, redirect) {
    if (!Meteor.userId()) {
        redirect("Login.Show");
    }
}
