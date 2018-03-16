import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-dom/test-utils";
import Meetups from "./Meetups.jsx";

const MEETUPS = [
  {
    url: "http://www.meetup.com/ny-tech/",
    group: {
      name: "Some Meetup"
    },
    created: 1506008725,
    time: 1506008726,
    rsvpCount: 55,
    rsvp_sample: []
  },
  {
    url: "http://www.meetup.com/xxxxxx/",
    group: {
      name: "Some Other Meetup"
    },
    created: 1506008727,
    time: 1506008728,
    rsvpCount: 2,
    rsvp_sample: []
  }
];

const PEOPLE = [
  {
    member: {
      name: "Person One",
      member_id: 1,
      member_photo: {
        thumb_link: "http://placebear.com/100/100"
      }
    }
  },
  {
    member: {
      name: "Person Two",
      member_id: 2,
      member_photo: {
        thumb_link: "http://placebear.com/100/100"
      }
    }
  }
];

it("renders no meetups", () => {
  const component = TestUtils.renderIntoDocument(
    <Meetups meetups={[]} errors={false} query="" />
  );
  const meetupsEl = TestUtils.scryRenderedDOMComponentsWithClass(
    component,
    "text--error"
  );
  expect(meetupsEl).toHaveLength;
});
it("renders meetups", () => {
  const component = TestUtils.renderIntoDocument(
    <Meetups meetups={MEETUPS} errors={false} query="whatev" />
  );
  const meetupsEl = TestUtils.scryRenderedDOMComponentsWithClass(
    component,
    "list-item"
  );
  expect(meetupsEl).toHaveLength;
});
it("renders meetups with RSVPers", () => {
  MEETUPS[1].rsvp_sample = PEOPLE;
  const component = TestUtils.renderIntoDocument(
    <Meetups meetups={MEETUPS} errors={false} query="whatev" />
  );
  const meetupsEl = TestUtils.scryRenderedDOMComponentsWithClass(
    component,
    "avatar--person"
  );
  expect(meetupsEl).toHaveLength;
});
