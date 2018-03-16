# Full Stack Test

This little React app is great at finding Meetups, but there's no way to favorite them for later.

You have four tasks to complete:

1. Build an API to add/remove favorite Meetups.
2. Build a favoriting UI
3. Build an API to view the favorites you saved.
4. Build a UI to view the favorites you've saved

Don't spend any time worrying about authentication or users.

Don't spend any time worrying about browser testing. As long as it's working in Chrome latest, that's fine.

You can build the API in whatever stack you're comfortable with, feel free to change the React app how you see fit.

Good luck!

## Getting the React app running

This app was built with [create-react-app](https://github.com/facebookincubator/create-react-app), but we've used `yarn run eject` so you can change the webpack config if needed.

We use [yarn](https://yarnpkg.com/en/) to manage packages, but you can replace `npm` for `yarn` in these instructions and things should work fine.

1. Make sure you have a recent version of [node](https://nodejs.org/en/).
2. run `yarn install` in the app directory.
3. run `yarn start`.
4. The app should load in your browser!

You can use `yarn run build` if you want to host this somewhere.

## What we're using

* [react](https://facebook.github.io/react/) -- React.
* [fetch-jsonp](https://github.com/camsong/fetch-jsonp) -- Lets us do a [JSONP](https://en.wikipedia.org/wiki/JSONP) request to Meetup's API to avoid cross-domain issues.
* [meetup-web-components](https://github.com/meetup/meetup-web-components) -- A set of React components from Meetup to build Meetup-like UIs.
* [swarm-sasstools](https://meetup.github.io/swarm-sasstools/seldon/doc.html) -- Sass/CSS library that goes along with our web components.
* [Meetup's API](https://www.meetup.com/meetup_api/) -- Specifically [OpenEvents](https://www.meetup.com/meetup_api/docs/2/open_events/)

## What we're expecting back

Please send back all the code you wrote and modified in a zip file and either instructions for getting it up and running or a link to a hosted version.

## Evaluation

This exercise is designed to showcase your engineering expertise to us on your own time **(although, we don’t expect you to spend more than three hours on this)**, without all the pressures and restrictions of a live coding interview environment. We understand that you have a finite amount of time to complete this exercise, and our expectations are adjusted accordingly.

Some (but not all) of the questions we will ask of your solution:
* How well was your API designed?
* How did you combine Meetup's API and your own API?
* How difficult would it be for an engineer on our team to inherit, understand, and continue to work on this code base?
* How maintainable is your solution?

We may follow-up with more questions, so be prepared to discuss how you would continue to maintain and build atop your submission.

We will review your submission in the latest production version of Google Chrome.
