import Axios from "axios";

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

// Use Vite environment variable for API URL
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

// **Signup Action**
export const signup = (username, email, password) => async dispatch => {
  try {
    const response = await Axios.post(`${API_URL}/auth/signup`, {
      username,
      email,
      password,
    }, { withCredentials: true });

    if (response.data.message === "User created successfully") {
      dispatch({ type: SIGNUP_SUCCESS });
      return Promise.resolve(response.data.message);
    } else {
      dispatch({ type: SIGNUP_FAILURE });
      return Promise.reject("Signup failed");
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Signup failed";
    console.error("Signup error:", errorMessage);
    dispatch({ type: SIGNUP_FAILURE, payload: errorMessage });
    return Promise.reject(errorMessage);
  }
};

// **Login Action**
export const login = (email, password) => async dispatch => {
  try {
    const response = await Axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    }, { withCredentials: true });

    if (response.data.message === "Login successful") {
      const token = response.data.token;
      localStorage.setItem('token', token);  // Store token in localStorage

      dispatch({ type: LOGIN_SUCCESS, payload: { token } });
      return Promise.resolve(token);
    } else {
      dispatch({ type: LOGIN_FAILURE });
      return Promise.reject("Login failed");
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Login failed";
    console.error("Login error:", errorMessage);
    dispatch({ type: LOGIN_FAILURE, payload: errorMessage });
    return Promise.reject(errorMessage);
  }
};

// **Logout Action**
export const logout = () => {
  localStorage.removeItem('token');
  return { type: LOGOUT_SUCCESS };
};
