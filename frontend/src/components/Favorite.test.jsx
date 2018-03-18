import React from "react";
import TestUtils from "react-dom/test-utils";
import Favorite from "./Favorite.jsx";

it("renders favorite button as active", () => {
  const component = TestUtils.renderIntoDocument(
    <Favorite isActive={true} />
  );
  const favoriteEl = TestUtils.scryRenderedDOMComponentsWithClass(
    component,
    "active"
  );
  expect(favoriteEl).toHaveLength;
});