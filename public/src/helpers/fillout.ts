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
        return filterBasedOnCondition(f, r);
      })
    ) {
      outputResponses.push(r);
    }
  });

  return outputResponses;
};

export const filterBasedOnCondition = (
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

      // Now both operands are numbers, you can perform the comparison
      return answerValue > filterValue;
    }
    if (typeof answer?.value === "string" && typeof filter.value === "string") {
      const answerValue = new Date(answer?.value);
      const filterValue = new Date(filter?.value);

      return answerValue > filterValue;
    }
  }

  if (filter.condition === "less_than") {
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

      // Now both operands are numbers, you can perform the comparison
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
// const filterBasedOnCondition = (
//   filter: IFilterClause,
//   response: IData
// ): boolean => {
//   const answer = response.questions.find((q) => q.id === filter.id);

//   if (filter.condition === "equals") {
//     return !!response.questions.find(
//       (q) => q.id === filter.id && q.value === filter.value
//     );
//   }
//   if (filter.condition === "does_not_equal") {
//     return !!response.questions.every((q) => {
//       if (q.id === filter.id) {
//         return q.value !== filter.value;
//       }
//       return true;
//     });
//   }

//   // if (condition === "greater_than") {
//   //   return value > filter;
//   // }
//   // if (condition === "less_than") {
//   //   return value < filter;
//   // }

//   return false;
// };
// const filterBasedOnCondition = (
//   condition: "equals" | "does_not_equal" | "greater_than" | "less_than",
//   value: any,
//   filter: number | string
// ): boolean => {
//   if (condition === "equals") {
//     return value === filter;
//   }
//   if (condition === "does_not_equal") {
//     return value !== filter;
//   }
//   if (condition === "greater_than") {
//     return value > filter;
//   }
//   if (condition === "less_than") {
//     return value < filter;
//   }

//   return false;
// };

// http://localhost:3000/cLZojxk94ous/filteredresponses?filters=[{"id":"dSRAe3hygqVwTpPK69p5td","condition":"greater_than","value":"2024-03-03"},{"id":"4KC356y4M6W8jHPKx9QfEy","condition":"equals","value":"Thank you!"}]
