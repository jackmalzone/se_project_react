const baseUrl = "http://localhost:3001";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

export function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

export function getItems() {
  const token = localStorage.getItem("jwt");
  console.log("Fetching items with token:", token ? "Present" : "Missing");

  return request(`${baseUrl}/items`, {
    headers: {
      "Content-Type": "application/json",
      ...(token && { authorization: `Bearer ${token}` }),
    },
  })
    .then((data) => {
      console.log("Server response for items:", data);
      console.log("Full item data from server:", JSON.stringify(data, null, 2));
      return data;
    })
    .catch((error) => {
      console.error("Server error fetching items:", error);
      throw error;
    });
}

export const addItem = (item, token) => {
  console.log("Sending item to server:", JSON.stringify(item, null, 2));
  console.log("Token for addItem:", token ? "Present" : "Missing");

  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(item),
  });
};

export const deleteItem = (id) => {
  const token = localStorage.getItem("jwt");
  if (!token) {
    return Promise.reject(new Error("No authorization token found"));
  }

  return request(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

export const addCardLike = (id, token) => {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
};

export const removeCardLike = (id, token) => {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
};
