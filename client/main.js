import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

FlowRouter.route('/', {
    name: 'Home.Show',
    triggersEnter: [function(context, redirect) {
        redirect("Home.Show")
    }]
});

FlowRouter.route('/home', {
    name: 'Home.Show',
    action(params, queryParams) {
        BlazeLayout.render('home', {});
    }
});

FlowRouter.route('/login', {
    name: 'Login.Show',
    triggersEnter: [function(context, redirect) {
        if (Meteor.user()) {
            redirect("Home.Show")
        }
    }],
    action(params, queryParams) {
        BlazeLayout.render('login_page_template', {});
    }
});

function checkUserLoggedIn(context, redirect) {
    if (!Meteor.user()) {
        redirect("Login.Show");
    }
}
