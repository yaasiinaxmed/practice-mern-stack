import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import BASE_URL from './BASE_URL'
import Cookies from 'js-cookie'

const getToken = () => {
    return Cookies.get("token")
}

export const userSlice = createApi({
    reducerPath: "user",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers) => {
            const token = getToken()
            
            if(token) {
                headers.set("Authorization", `Bearer ${token}`)
            }

            return headers
        },
    }),
    tagTypes: ['user'],
    endpoints: (builder) => ({
        getUser: builder.query({
            query: () => 'user',
            providesTags: ['user']
        })
    })
})

export const {useGetUserQuery} = userSlice

export default userSlice.reducer