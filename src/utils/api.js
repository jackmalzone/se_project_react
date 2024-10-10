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
  return request(`${baseUrl}/items`);
}

export const addItem = (item) => {
  console.log("Sending item to server:", JSON.stringify(item, null, 2));
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
};

export const deleteItem = (id) => {
  return request(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  });
};
