import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Meteor.subscribe("getUserData");
Meteor.subscribe("getManagedRepos");


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
    }
});

FlowRouter.route('/build/:buildId', {
    name: 'Build.Show',
    triggersEnter: checkUserLoggedIn,
    action(params, queryParams) {
        BlazeLayout.render('buildDetails', { buildId: params.buildId });
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

Tracker.autorun(function(c) {
    if (!Meteor.userId()) {
        FlowRouter.go("Login.Show");
    } else {
        FlowRouter.go("Home.Show");
    }
});


function checkUserLoggedIn(context, redirect) {
    if (!Meteor.userId()) {
        redirect("Login.Show");
    }
}
