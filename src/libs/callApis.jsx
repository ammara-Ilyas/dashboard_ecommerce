const HOSTNAME = "https://ecommerce-apis-hl5w.onrender.com/api";
// Utility to get token dynamically (adjust to your app's storage)

const callPrivateApi = async (endpoint, method, payload, token) => {
  const headers = {
    Accept: "application/json",
    Authorization: `Bearer ${token}`, // ✅ Correct way
  };

  let body = null;
  // console.log("headers", headers);

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
  // console.log("data in api call", endpoint, method, payload);

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

export { callPublicApi, callPrivateApi };
