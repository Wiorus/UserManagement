import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
}

interface UsersState {
  users: User[];
  filteredUsers: User[];
  status: "idle" | "loading" | "failed";
}

const initialState: UsersState = {
  users: [],
  filteredUsers: [],
  status: "idle",
};

export const fetchUsers = createAsyncThunk<User[]>(
  "users/fetchUsers",
  async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    return response.data;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    filterUsers: (state, action) => {
      const { name, username, email, phone } = action.payload;
      state.filteredUsers = state.users.filter(
        (user) =>
          (name
            ? user.name.toLowerCase().includes(name.toLowerCase())
            : true) &&
          (username
            ? user.username.toLowerCase().includes(username.toLowerCase())
            : true) &&
          (email
            ? user.email.toLowerCase().includes(email.toLowerCase())
            : true) &&
          (phone ? user.phone.includes(phone) : true)
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "idle";
        state.users = action.payload;
        state.filteredUsers = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { filterUsers } = usersSlice.actions;
export default usersSlice.reducer;
