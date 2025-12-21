import axios, { AxiosError } from "axios"; // Import AxiosError for type checking

const backend = import.meta.env.VITE_BACKEND_URL;

export async function getAdmissions() {
  const query = `
    query {
      admissions {
        success
        message
        data {
          id
          name
          email
          grade
          phone
          age
        }
      }
    }
  `;

  try {
    const response = await axios.post(
      backend + "/graphql" + "/admissions", // Note: The path structure looks unusual. It should usually be just /graphql
      { query },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    
    if (response.data.errors) {
      return {
        success: false,
        message: response.data.errors[0].message,
        data: [],
      };
    }

    return response.data.data.admissions;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const axiosError: AxiosError = error;

      if (axiosError.response) {
        return {
          success: false,
          message: "Server Error: " + axiosError.response.status,
          data: [],
        };
      } else if (axiosError.request) {
        return {
          success: false,
          message: "No response from server",
          data: [],
        };
      } else {
        // Something happened in setting up the request that triggered an Error
        return {
          success: false,
          message: axiosError.message,
          data: [],
        };
      }
    } else if (error instanceof Error) {
      // Handle non-Axios standard JavaScript errors
      return {
        success: false,
        message: error.message,
        data: [],
      };
    }

    // Fallback for completely unknown errors
    return {
      success: false,
      message: "An unexpected unknown error occurred.",
      data: [],
    };
  }
}


