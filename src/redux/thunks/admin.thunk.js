import { createAsyncThunk } from "@reduxjs/toolkit";
import { server } from "../../constants/config";
import axios from "axios";

const adminLogin = createAsyncThunk("admin/login", async (secretKey) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };
  try {
    const { data } = await axios.post(
      `${server}/admin/verify`,
      { secretKey },
      config
    );
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

const getAdmin = createAsyncThunk("admin/getAdmin", async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };
  try {
    const { data } = await axios.get(`${server}/admin`, config);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

const adminLogout = createAsyncThunk("admin/logout", async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };
  try {
    const { data } = await axios.get(`${server}/admin/logout`, config);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export { adminLogin, getAdmin, adminLogout };
