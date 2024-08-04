import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";
// Định nghĩa các async thunk actions
export const login = createAsyncThunk(
    "account/login",
    async ({ username, password }, { rejectWithValue }) => {
        try {
            const response = await fetch("http://localhost:3000/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });
            if (!response.ok) {
                const error = await response.json();
                return rejectWithValue(error);
            }
            const data = await response.json();
            // console.log(data);
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const signup = createAsyncThunk(
    "account/signup",
    async (
        {
            username,
            fullname,
            email,
            password,
            phone,
            address,
            confirm_password,
        },
        { rejectWithValue }
    ) => {
        try {
            const response = await fetch(
                "http://localhost:3000/users/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username,
                        fullname,
                        email,
                        password,
                        phone,
                        address,
                        confirm_password,
                    }),
                }
            );
            if (!response.ok) {
                const error = await response.json();
                return rejectWithValue(error);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateAccount = createAsyncThunk(
    "account/updateAccount",
    async (
        { username, fullname, email, phone, address },
        { getState, rejectWithValue }
    ) => {
        try {
            const { user } = getState().account;

            const response = await fetch(
                `http://localhost:3000/users/${user.data._id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username,
                        fullname,
                        email,
                        phone,
                        address,
                    }),
                }
            );
            if (!response.ok) {
                const error = await response.json();
                return rejectWithValue(error);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const changePassword = createAsyncThunk(
    "account/changePassword",
    async (
        { currentPassword, newPassword, confirmNewPassword },
        { getState, rejectWithValue }
    ) => {
        try {
            const { user } = getState().account;
            const response = await fetch(
                `http://localhost:3000/users/password/${user.data._id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        currentPassword,
                        newPassword,
                        confirmNewPassword,
                    }),
                }
            );
            if (!response.ok) {
                const error = await response.json();
                return rejectWithValue(error);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Định nghĩa slice
const accountSlice = createSlice({
    name: "account",
    initialState: {
        user: null,
        isLoading: false,
        error: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            // Xóa dữ liệu từ sessionStorage khi logout
            sessionStorage.removeItem("user");
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(signup.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(signup.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(updateAccount.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateAccount.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(updateAccount.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(changePassword.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(changePassword.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { logout, setUser } = accountSlice.actions;
export default accountSlice.reducer;
