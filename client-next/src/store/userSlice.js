import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: {},
    isAuth: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setIsAuth: (state, action) => {
            state.isAuth = action.payload;
        },
    },
});

export const { setUser, setIsAuth } = userSlice.actions;
export default userSlice.reducer;