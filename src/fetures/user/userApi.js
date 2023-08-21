import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Get All Permission
export const getAllUserPermission = createAsyncThunk(
  "user/getAllPermission",
  async () => {
    try {
      const response = await axios.get(
        "https://aspire-io7b2khl3-sayyidsaadi.vercel.app/api/v1/permission",
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// Create New Permission
export const createNewPermission = createAsyncThunk(
  "user/createNewPermission",
  async (data) => {
    try {
      const response = await axios.post(
        "https://aspire-io7b2khl3-sayyidsaadi.vercel.app/api/v1/permission",
        data,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// Delete Permission
export const deletePermission = createAsyncThunk(
  "user/deletePermission",
  async (id) => {
    try {
      const response = await axios.delete(
        `https://aspire-io7b2khl3-sayyidsaadi.vercel.app/api/v1/permission/${id}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// Update Permission Status
export const updatePermissionStatus = createAsyncThunk(
  "user/updatePermissionStatus",
  async ({ id, status }) => {
    try {
      const response = await axios.patch(
        `https://aspire-io7b2khl3-sayyidsaadi.vercel.app/api/v1/permission/status/${id}`,
        { status },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// Get All Roles
export const getAllRoles = createAsyncThunk("user/getAllRoles", async () => {
  try {
    const response = await axios.get(
      "https://aspire-io7b2khl3-sayyidsaadi.vercel.app/api/v1/role",
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// Create New Role
export const createNewRole = createAsyncThunk(
  "user/createNewRole",
  async (data) => {
    try {
      const response = await axios.post(
        "https://aspire-io7b2khl3-sayyidsaadi.vercel.app/api/v1/role",
        data,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// Delete Roles
export const deleteRoles = createAsyncThunk("user/deleteRoles", async (id) => {
  try {
    const response = await axios.delete(
      `https://aspire-io7b2khl3-sayyidsaadi.vercel.app/api/v1/role/${id}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// Update Role
export const updateRolesUpdate = createAsyncThunk(
  "user/updateRolesUpdate",
  async (data) => {
    try {
      const response = await axios.patch(
        `https://aspire-io7b2khl3-sayyidsaadi.vercel.app/api/v1/role/${data.id}`,
        data,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// Update Role Status
export const updateRolesStatus = createAsyncThunk(
  "user/updateRolesStatus",
  async ({ id, status }) => {
    try {
      const response = await axios.patch(
        `https://aspire-io7b2khl3-sayyidsaadi.vercel.app/api/v1/role/status/${id}`,
        { status },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// Create New User
export const createUser = createAsyncThunk("user/createUser", async (data) => {
  try {
    const response = await axios.post(
      "https://aspire-io7b2khl3-sayyidsaadi.vercel.app/api/v1/user/",
      data,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// Get All User
export const getAllUser = createAsyncThunk("user/getAllUser", async () => {
  try {
    const response = await axios.get(
      "https://aspire-io7b2khl3-sayyidsaadi.vercel.app/api/v1/user/",
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// Update User
export const userUpdate = createAsyncThunk("user/userUpdate", async (data) => {
  try {
    const response = await axios.patch(
      `https://aspire-io7b2khl3-sayyidsaadi.vercel.app/api/v1/user/${data._id}`,
      data,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// Delete User
export const userDelete = createAsyncThunk("user/userDelete", async (id) => {
  try {
    const response = await axios.delete(
      `https://aspire-io7b2khl3-sayyidsaadi.vercel.app/api/v1/user/${id}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// Update User Status
export const updateUserStatus = createAsyncThunk(
  "user/updateUserStatus",
  async ({ id, status }) => {
    try {
      const response = await axios.put(
        `https://aspire-io7b2khl3-sayyidsaadi.vercel.app/api/v1/user/status/${id}`,
        { status },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
