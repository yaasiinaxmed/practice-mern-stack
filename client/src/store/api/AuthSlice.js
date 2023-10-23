import {createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import BASE_URL from "./BASE_URL";
import Cookies from 'js-cookie'

const setToken = (token) => {
    Cookies.set("token", token)
}

export const authSlice = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL
    }),
    tagTypes: ["userApi"],
    endpoints: (builder) => ({
        signup: builder.mutation({
            query: (newUser) => ({
                url: "signup",
                method: "POST",
                body: newUser,
            }),
            invalidatesTags: ["userApi"]
        }),
        login: builder.mutation({
            query: (user) => ({
                url: "login",
                method: "POST",
                body: user
            }),
            invalidatesTags: ["userApi"],
            onQueryStarted: async (arg, {queryFulfilled}) => {
               try {
                const result = await queryFulfilled
                setToken(result.data.token)
               } catch (error) {
                 console.log("Error login:", error)
               }
            }
        })
    })
})

export const { useSignupMutation, useLoginMutation} = authSlice

export default authSlice.reducer