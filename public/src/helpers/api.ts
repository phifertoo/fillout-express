import axios, { AxiosResponse } from "axios";
require("dotenv").config();

// Define the URL of the API endpoint you want to fetch data from

export const apiGet = async (apiURL: string): Promise<any> => {
  const filloutKey = process.env.FILLOUT_KEY || "";

  const headers = {
    Authorization: `Bearer ${filloutKey}`,
  };

  try {
    const response: AxiosResponse<any> = await axios.get(apiURL, { headers });
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

// sample URL's with queries
// http://localhost:3000/1/filteredresponses?filters=[{"id":"color","condition":"equals","value":"blue"},{"id":"price","condition":"less_than","value":1000}]
// http://localhost:3000/1/filteredresponses?filters=[{"id":"4KC356y4M6W8jHPKx9QfEy","condition":"equals","value":"Nothing much to share yet!"}]
