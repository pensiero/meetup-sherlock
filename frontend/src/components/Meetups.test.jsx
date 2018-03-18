import React from "react";
import TestUtils from "react-dom/test-utils";
import Meetups from "./Meetups.jsx";

const MEETUPS = [
  {
    id: 1,
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
    id: 2,
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

const FAVORITES = [
  2
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

it("renders meetups without favorite button", () => {
  const component = TestUtils.renderIntoDocument(
    <Meetups meetups={MEETUPS} favorites={null} errors={false} query="" />
  );
  const meetupsEl = TestUtils.scryRenderedDOMComponentsWithClass(
    component,
    "favorite"
  );
  expect(meetupsEl).not.toHaveLength;
});

it("renders meetups with favorite button", () => {
  const component = TestUtils.renderIntoDocument(
    <Meetups meetups={MEETUPS} favorites={[]} errors={false} query="" />
  );
  const meetupsEl = TestUtils.scryRenderedDOMComponentsWithClass(
    component,
    "favorite"
  );
  expect(meetupsEl).toHaveLength;
});

it("renders no favorite meetups", () => {
  const component = TestUtils.renderIntoDocument(
    <Meetups meetups={MEETUPS} favorites={[]} errors={false} query="" />
  );
  const meetupsEl = TestUtils.scryRenderedDOMComponentsWithClass(
    component,
    "favorite active"
  );
  expect(meetupsEl).not.toHaveLength;
});

it("renders meetups with at least a favorite one", () => {
  const component = TestUtils.renderIntoDocument(
    <Meetups meetups={MEETUPS} favorites={FAVORITES} errors={false} query="" />
  );
  const meetupsEl = TestUtils.scryRenderedDOMComponentsWithClass(
    component,
    "favorite active"
  );
  expect(meetupsEl).toHaveLength;
});