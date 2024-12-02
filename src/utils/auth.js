import { request } from "./api";

const BASE_URL = "http://localhost:3001";

export const register = ({ name, avatar, email, password }) => {
  console.log("1. Registration attempt:", { name, email, hasAvatar: !!avatar });

  return request(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
      ...(avatar?.trim() && { avatar: avatar.trim() }),
    }),
  });
};

export const login = ({ email, password }) => {
  return request(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
};

export const checkToken = (token) => {
  return request(`${BASE_URL}/users/me`, {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

export const updateProfile = ({ name, avatar }, token) => {
  return request(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  });
};
