import React from "react";

import {
  render,
  cleanup,
  fireEvent,
  getByText,
  getByPlaceholderText,
} from "@testing-library/react";

import SearchPhotos from "../../searchPhotos";

afterEach(cleanup);

// first test that searchPhotos renders (pretty much our whole app)
it("renders without crashing", () => {
  render(<SearchPhotos />);
});

// next test the button and input

it("renders a blank value in input field by default", () => {
  const { getByPlaceholderText } = render(<SearchPhotos />);
  expect(getByPlaceholderText("Search for an object")).toHaveValue("");
});

it("renders new value in input field if we change it. that value persists after search", async () => {
  const onSubmit = jest.fn();
  const { container } = render(<SearchPhotos searchPhotos={onSubmit} />);

  fireEvent.change(getByPlaceholderText(container, "Search for an object"), {
    target: { value: "fish" },
  });

  expect(getByPlaceholderText(container, "Search for an object").value).toBe(
    "fish"
  );

  fireEvent.click(getByText(container, "Search"));

  expect(getByPlaceholderText(container, "Search for an object").value).toBe(
    "fish"
  );
});
