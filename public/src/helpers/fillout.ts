import axios, { AxiosResponse } from "axios";
import { Request } from "express";
import { apiGet } from "./api";
import { IFilterClause } from "../types/demo";
import { IData } from "../types/demo";

// Define the URL of the API endpoint you want to fetch data from

export const getFillout = async (
  formID: string,
  req: Request
): Promise<any> => {
  try {
    const baseURL = "https://api.fillout.com";
    const formRoute = "v1/api/forms";
    let newURL = `${baseURL}/${formRoute}/${formID}/submissions`;
    // const demoID = "cLZojxk94ous";

    // carry forward the queries necessary for fillout API
    newURL +=
      "?" +
      Object.entries(req.query)
        .map(([key, value]) => `${key}=${encodeURIComponent(value as string)}`)
        .join("&");
    // console.log(response.data);
    const response: AxiosResponse<any> = await apiGet(newURL);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Axios error (e.g., network error, status code 4xx or 5xx)
      console.error("Axios error:", error.message);
    } else {
      // Other error
      console.error("Error:", error);
    }
  }
};

export const filterData = (
  response: any,
  filters: IFilterClause[]
): IData[] => {
  const rawResponses: IData[] = response.data.responses;
  const outputResponses: IData[] = [];

  // iterate through the questions of all of the responses.
  // the responses must pass all the responses to be returned
  rawResponses.map((r): any => {
    if (
      // for all filters, if you can find the question that satisfies the condition, we add it to the output
      filters.every((f) => {
        return isFilterSatisfied(f, r);
      })
    ) {
      outputResponses.push(r);
    }
  });

  return outputResponses;
};

export const isFilterSatisfied = (
  filter: IFilterClause,
  response: IData
): boolean => {
  const answer = response.questions.find((q) => q.id === filter.id);

  if (filter.condition === "equals") {
    return answer?.value === filter.value;
  }
  if (filter.condition === "does_not_equal") {
    return answer?.value !== filter.value;
  }
  if (filter.condition === "greater_than") {
    if (answer?.value === null) {
      return false;
    }

    if (typeof answer?.value === "number" && typeof filter.value === "number") {
      // Convert answer.value to a number if it's a string
      const answerValue =
        typeof answer.value === "string"
          ? parseFloat(answer.value)
          : answer.value;
      const filterValue =
        typeof filter.value === "string"
          ? parseFloat(filter.value)
          : filter.value;

      return answerValue > filterValue;
    }
    if (typeof answer?.value === "string" && typeof filter.value === "string") {
      const answerValue = new Date(answer?.value);
      const filterValue = new Date(filter?.value);

      return answerValue > filterValue;
    }
  }

  if (filter.condition === "less_than") {
    if (answer?.value === null) {
      return false;
    }

    if (typeof answer?.value === "number" && typeof filter.value === "number") {
      // Convert answer.value to a number if it's a string
      const answerValue =
        typeof answer.value === "string"
          ? parseFloat(answer.value)
          : answer.value;
      const filterValue =
        typeof filter.value === "string"
          ? parseFloat(filter.value)
          : filter.value;

      return answerValue < filterValue;
    }
    if (typeof answer?.value === "string" && typeof filter.value === "string") {
      const answerValue = new Date(answer?.value);
      const filterValue = new Date(filter?.value);

      return answerValue < filterValue;
    }
  }

  return false;
};
