import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import { App } from "src/App";
import React from "react";

describe("App root", () => {
  beforeAll(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2020-01-01"));
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  test("renders home page", () => {
    const component: React.ReactElement = <App />;
    const rendered = render(component);
    expect(rendered).toMatchSnapshot();
  });
});
