import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

FlowRouter.route('/', {
    name: 'Root',
    triggersEnter: [function(context, redirect) {
        redirect("Home.Show")
    }]
});

FlowRouter.route('/home', {
    name: 'Home.Show',
    triggersEnter: checkUserLoggedIn,
    action(params, queryParams) {
        BlazeLayout.render('home', {});
        HTTP.call('GET', 'https://api.github.com/user', { params: { access_token: Meteor.user().services.github.accessToken } }, function(error, response) {
            if (error) {
                console.log(error);
            } else {

            }
        });
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
