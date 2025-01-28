import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  email: string;
  userName: string;
  image_url: string;
}

const userInitialState: UserState = {
  email: "",
  userName: "",
  image_url: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      state.email = action.payload.email;
      state.userName = action.payload.userName;
      state.image_url = action.payload.image_url;
    },
    logOutUser(state) {
      state.email = "";
      state.userName = "";
      state.image_url = "";
    },
  },
});

export const { setUser, logOutUser } = userSlice.actions;
export default userSlice.reducer;
