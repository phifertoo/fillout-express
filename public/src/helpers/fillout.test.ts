import { isFilterSatisfied } from "./fillout";
import { IFilterClause } from "../types/demo";
import { mockResponses } from "./mocks";

describe("isFilterSatisfied", () => {
  test("equals: for a given id, when filter === value should return true", () => {
    const filterClause: IFilterClause = {
      id: "4KC356y4M6W8jHPKx9QfEy",
      condition: "equals",
      value: "Nothing much to share yet!",
    };

    const response = mockResponses[0];
    expect(isFilterSatisfied(filterClause, response)).toBe(true);
  });

  test("equals: for a given id, when filter !== value should return true", () => {
    const filterClause: IFilterClause = {
      id: "4KC356y4M6W8jHPKx9QfEy",
      condition: "equals",
      value: "not found",
    };

    const response = mockResponses[0];
    expect(isFilterSatisfied(filterClause, response)).toBe(false);
  });

  test("does_not_equal: for a given id, when filter !== value should return true", () => {
    const filterClause: IFilterClause = {
      id: "4KC356y4M6W8jHPKx9QfEy",
      condition: "does_not_equal",
      value: "should not be found",
    };

    const response = mockResponses[0];
    expect(isFilterSatisfied(filterClause, response)).toBe(true);
  });

  test("does_not_equal:for a given id, when filter === value should return false", () => {
    const filterClause: IFilterClause = {
      id: "4KC356y4M6W8jHPKx9QfEy",
      condition: "does_not_equal",
      value: "Nothing much to share yet!",
    };

    const response = mockResponses[0];
    expect(isFilterSatisfied(filterClause, response)).toBe(false);
  });

  test("greater_than: for a given id, when value > filter should return true", () => {
    const filterClause: IFilterClause = {
      id: "fFnyxwWa3KV6nBdfBDCHEA",
      condition: "greater_than",
      value: 1,
    };

    const response = mockResponses[0];
    expect(isFilterSatisfied(filterClause, response)).toBe(true);
  });
  test("greater_than: for a given id, when value < filter should return true", () => {
    const filterClause: IFilterClause = {
      id: "fFnyxwWa3KV6nBdfBDCHEA",
      condition: "greater_than",
      value: 3,
    };

    const response = mockResponses[0];
    expect(isFilterSatisfied(filterClause, response)).toBe(false);
  });
});
