const BASE_URL = "http://localhost:3001";

export const register = ({ name, avatar, email, password }) => {
  console.log("Sending registration request to:", `${BASE_URL}/signup`);
  console.log("Registration payload:", {
    name,
    avatar,
    email,
    password: "***",
  });

  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  })
    .then(async (res) => {
      const data = await res.json();
      console.log("Server response:", { status: res.status, data });

      if (res.ok) {
        return data;
      }
      throw new Error(data.message || `Error: ${res.status}`);
    })
    .catch((err) => {
      console.error("Registration request failed:", err);
      throw err;
    });
};

export const login = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  });
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
};

export const updateProfile = ({ name, avatar }, token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
};
