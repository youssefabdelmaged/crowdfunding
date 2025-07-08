import { jwtDecode } from "jwt-decode";
import api from "../api";

const CURRENT_USER = "CURRENT_USER";
const ACCESS_TOKEN = "access";

export async function fetchAndStoreCurrentUser() {
  try {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      console.log("No access token found");
      return null;
    }

    // Decode the token to get user info (assuming user id is in 'user_id' or 'sub' claim)
    const decoded = jwtDecode(token);
    const userId = decoded.user_id || decoded.sub;
    if (!userId) {
      console.log("User ID not found in token");
      return null;
    }

    // Fetch user details from backend
    const response = await api.get(`api/users/${userId}`);
    const user = response.data;

    // Store user details in local storage
    localStorage.setItem(CURRENT_USER, JSON.stringify(user));

    return user;
  } catch (error) {
    console.error("Failed to fetch and store current user:", error);
    return null;
  }
}

export function getCurrentUserFromLocalStorage() {
  const userStr = localStorage.getItem(CURRENT_USER);
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
}
