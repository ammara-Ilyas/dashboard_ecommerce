// const HOSTNAME = "http://localhost:5000/api";
const HOSTNAME = "http://127.0.0.1:5000/api"; // Instead of localhost
import { token } from "./Token";
// Function to make API calls using fetch
const callPrivateApi = async (endpoint, method, payload) => {
  console.log("data in api call", endpoint, method, payload);

  const headers = {
    Accept: "application/json",
    Authorization: `Bearer ${token}`, // ✅ Correct way
  };

  let body = null;

  if (!(payload instanceof FormData)) {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(payload);
  } else {
    body = payload; // Let fetch set the headers automatically for FormData
  }

  try {
    const response = await fetch(`${HOSTNAME}${endpoint}`, {
      method,
      headers,
      body: method !== "GET" ? body : undefined,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const callPublicApi = async (endpoint, method, payload) => {
  console.log("data in api call", endpoint, method, payload);

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const body = payload ? JSON.stringify(payload) : null;

  try {
    const response = await fetch(`${HOSTNAME}${endpoint}`, {
      method,
      headers,
      body: method !== "GET" ? body : undefined,
    });
    console.log("response in public apis", response);

    if (!response.ok) {
      const errorData = await response.json();
      console.log("error in public apis", errorData);

      throw errorData;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export { callPublicApi, callPrivateApi };
