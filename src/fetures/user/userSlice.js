import { createSlice } from "@reduxjs/toolkit";
import {
  createNewPermission,
  createNewRole,
  createUser,
  deletePermission,
  deleteRoles,
  getAllRoles,
  getAllUser,
  getAllUserPermission,
  updatePermissionStatus,
  updateRolesStatus,
  updateRolesUpdate,
  updateUserStatus,
  userDelete,
  userUpdate,
} from "./userApi";

// Create User Slice
export const userSlice = createSlice({
  name: "user",
  initialState: {
    users: null,
    permissions: null,
    roles: null,
    message: null,
    error: null,
  },
  reducers: {
    setMessageEmpty: (state, action) => {
      (state.message = null), (state.error = null);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUserPermission.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getAllUserPermission.fulfilled, (state, action) => {
        state.permissions = action.payload.allPermissions;
      })
      .addCase(createNewPermission.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(createNewPermission.fulfilled, (state, action) => {
        state.permissions = state.permissions ?? [];
        state.permissions.push(action.payload.permission);
        state.message = action.payload.message;
      })
      .addCase(deletePermission.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deletePermission.fulfilled, (state, action) => {
        state.permissions = state.permissions.filter(
          (data) => data._id !== action.payload.permission._id
        );
        state.message = action.payload.message;
      })
      .addCase(updatePermissionStatus.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updatePermissionStatus.fulfilled, (state, action) => {
        state.permissions[
          state.permissions.findIndex(
            (data) => data._id == action.payload.data._id
          )
        ] = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(getAllRoles.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getAllRoles.fulfilled, (state, action) => {
        state.roles = action.payload.roles;
      })
      .addCase(createNewRole.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(createNewRole.fulfilled, (state, action) => {
        state.roles = state.roles ?? [];
        state.roles.push(action.payload.role);
        state.message = action.payload.message;
      })
      .addCase(deleteRoles.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteRoles.fulfilled, (state, action) => {
        state.roles = state.roles.filter(
          (data) => data._id !== action.payload.role._id
        );
        state.message = action.payload.message;
      })
      .addCase(updateRolesStatus.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateRolesStatus.fulfilled, (state, action) => {
        state.roles[
          state.roles.findIndex((data) => data._id == action.payload.data._id)
        ] = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(updateRolesUpdate.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateRolesUpdate.fulfilled, (state, action) => {
        state.roles[
          state.roles.findIndex((data) => data._id == action.payload.data._id)
        ] = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.users = state.users ?? [];
        state.users.push(action.payload.user);

        state.message = action.payload.message;
      })
      .addCase(getAllUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.users = action.payload.users;
      })
      .addCase(userUpdate.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(userUpdate.fulfilled, (state, action) => {
        state.users[
          state.users.findIndex((data) => data._id == action.payload.data._id)
        ] = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(userDelete.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(userDelete.fulfilled, (state, action) => {
        state.users = state.users.filter(
          (delData) => delData._id !== action.payload.user._id
        );
        state.message = action.payload.message;
      })
      .addCase(updateUserStatus.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateUserStatus.fulfilled, (state, action) => {
        state.users[
          state.users.findIndex(
            (statusUser) => statusUser._id === action.payload.data._id
          )
        ] = action.payload.data;
        state.message = action.payload.message;
      });
  },
});

// Export Actions
export const { setMessageEmpty } = userSlice.actions;

// Export Selector
export const getAllUserData = (state) => state.user;

// Export Reducer
export default userSlice.reducer;
