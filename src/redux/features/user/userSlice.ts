import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  id: string;
  name: string;
  email: string;
  image_url: string;
}

const userInitialState: UserState = {
  id: "",
  name: "",
  email: "",
  image_url: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.image_url = action.payload.image_url;
    },
    logOutUser(state) {
      state.id = "";
      state.name = "";
      state.email = "";
      state.image_url = "";
    },
  },
});

export const { setUser, logOutUser } = userSlice.actions;
export default userSlice.reducer;
