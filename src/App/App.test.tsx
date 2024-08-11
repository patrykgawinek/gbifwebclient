import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import { App } from "src/App";
import React from "react";

describe("App root", () => {
  test("renders home page", () => {
    const component: React.ReactElement = <App />;
    const rendered = render(component);
    expect(rendered).toMatchSnapshot();
  });
});
