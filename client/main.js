import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';


Accounts.onLogin(function(data) {
    if (!Meteor.user().services.github.avatar_url) {
        console.log(data)
        Meteor.user().services.github.avatar_url = "https://avatars2.githubusercontent.com/u/2691401?s=72";
    }
})

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
