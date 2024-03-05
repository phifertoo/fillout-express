import axios, { AxiosResponse } from "axios";

// Define the URL of the API endpoint you want to fetch data from

export const apiGet = async (apiURL: string): Promise<any> => {
  const headers = {
    Authorization: `Bearer sk_prod_TfMbARhdgues5AuIosvvdAC9WsA5kXiZlW8HZPaRDlIbCpSpLsXBeZO7dCVZQwHAY3P4VSBPiiC33poZ1tdUj2ljOzdTCCOSpUZ_3912`,
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

// http://localhost:3000/1/filteredresponses?filters=[{"id":"color","condition":"equals","value":"blue"},{"id":"price","condition":"less_than","value":1000}]
// http://localhost:3000/1/filteredresponses?filters=[{"id":"4KC356y4M6W8jHPKx9QfEy","condition":"equals","value":"Nothing much to share yet!"}]
