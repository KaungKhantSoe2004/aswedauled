import axios, { AxiosError } from "axios"; // Import AxiosError for type checking
import type { AdmissionType } from "../types";

const backend_domain_name = import.meta.env.VITE_BACKEND_URL;

export async function getState(query: string) {
  try {
    const response = await axios.post(
      `http://localhost:1500/graphql`,
      { query },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log(response.data);
    if (response.data.errors) {
      return {
        success: false,
        message: response.data.errors[0].message,
        data: [],
      };
    }

    return response.data.data;
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

export async function getActivities() {
  const query = `
    query {
      activities  {
        success
        message
        data {
            id
            activityName
            image
            created_at
        }
      }
    }
  `;
  console.log("ok bro ");
  return await getState(query);
}

export async function getFaqs() {
  const query = `
    query{
      faqs{
       success
       message
       data{
         id
         question
         answer
       }
      }
    }
    
    `;
  return await getState(query);
}

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
  getState(query);
}

export async function getGalleries() {
  const query = `
    query {
      galleries {
      success
      message
      data{
       id
       galleryName
       image
      }
      
      }
    }
    `;
  return await getState(query);
}

export async function createAdmission(
  inputData: AdmissionType,
  grade: string | undefined
) {
  const formData = new FormData();
  formData.append("name", inputData.name);
  formData.append("email", inputData.email);
  formData.append("age", inputData.age);
  formData.append("phone", inputData.phone);
  // formData.append("grade", inputData.grade);
  formData.append("gender", inputData.gender);
  formData.append("guardianName", inputData.guardianName || "");
  formData.append("guardianPhone", inputData.guardianPhone || "");
  if (typeof grade == "string") {
    formData.append("grade", grade);
  }

  if (inputData.profile) {
    formData.append("profile", inputData.profile);
  }
  if (inputData.prevSchool_doc) {
    inputData.prevSchool_doc.forEach((file) => {
      formData.append("prevSchool_doc", file);
    });
  }
  console.log(formData);
  // return;
  const response = await axios.post(
    "http://localhost:1500/api/admissions/createAdmission",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
  console.log(response.data);
}
