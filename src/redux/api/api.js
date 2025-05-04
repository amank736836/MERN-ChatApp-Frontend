import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../../constants/config";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${server}`,
  }),
  tagTypes: ["Chat", "User", "Request"],
  refetchOnFocus: true,
  endpoints: (builder) => ({
    getMyChats: builder.query({
      query: () => ({
        url: "/chat",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Chat"],
    }),
    searchUser: builder.query({
      query: (name) => ({
        url: `/user/search`,
        params: { name },
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["User"],
    }),
    getNotifications: builder.query({
      query: () => ({
        url: "/user/notifications",
        credentials: "include",
      }),
      keepUnusedDataFor: 0,
      // providesTags: ["Request"],
    }),

    getChatDetails: builder.query({
      query: ({ chatId, populate = false }) => ({
        url: `/chat/${chatId}`,
        params: { populate },
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Chat"],
    }),
    getMessages: builder.query({
      query: ({ chatId, page = 1 }) => ({
        url: `/chat/message/${chatId}`,
        params: { page },
        method: "GET",
        credentials: "include",
      }),
      keepUnusedDataFor: 0,
    }),
    getMyGroups: builder.query({
      query: () => ({
        url: "/chat/group",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Chat"],
    }),
    getAvailableFriends: builder.query({
      query: (chatId) => ({
        url: `/user/friends`,
        params: { chatId },
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Chat"],
    }),
    sendFriendRequest: builder.mutation({
      query: (userId) => ({
        url: `/user/sendRequest`,
        body: { userId },
        method: "PUT",
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
    acceptFriendRequest: builder.mutation({
      query: (data) => ({
        url: `/user/acceptRequest`,
        body: data,
        method: "PUT",
        credentials: "include",
      }),
      invalidatesTags: ["Chat", "Request"],
    }),
    sendAttachments: builder.mutation({
      query: (data) => ({
        url: "/chat/message",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    newGroup: builder.mutation({
      query: (data) => ({
        url: "/chat/group",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Chat"],
    }),
    renameGroup: builder.mutation({
      query: ({ chatId, name }) => ({
        url: `/chat/${chatId}`,
        method: "PUT",
        body: { name },
        credentials: "include",
      }),
      invalidatesTags: ["Chat"],
    }),
    removeMember: builder.mutation({
      query: ({ chatId, memberId }) => ({
        url: `/chat/removeMember`,
        method: "PUT",
        body: { chatId, memberId },
        credentials: "include",
      }),
      invalidatesTags: ["Chat"],
    }),
    addMembers: builder.mutation({
      query: ({ members, chatId }) => ({
        url: `/chat/group`,
        method: "PUT",
        body: { members, chatId },
        credentials: "include",
      }),
      invalidatesTags: ["Chat"],
    }),
    deleteChat: builder.mutation({
      query: (chatId) => ({
        url: `/chat/${chatId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Chat"],
    }),
    leaveGroup: builder.mutation({
      query: (chatId) => ({
        url: `/chat/group`,
        method: "DELETE",
        body: { chatId },
        credentials: "include",
      }),
      invalidatesTags: ["Chat"],
    }),
    getDashboardStats: builder.query({
      query: () => ({
        url: "/admin/stats",
        method: "GET",
        credentials: "include",
      }),
      keepUnusedDataFor: 0,
    }),
    getUsersDashboardStats: builder.query({
      query: () => ({
        url: "/admin/users",
        method: "GET",
        credentials: "include",
      }),
      keepUnusedDataFor: 0,
    }),
    getChatsDashboardStats: builder.query({
      query: () => ({
        url: "/admin/chats",
        method: "GET",
        credentials: "include",
      }),
      keepUnusedDataFor: 0,
      providesTags: ["Chat"],
    }),
    getMessagesDashboardStats: builder.query({
      query: () => ({
        url: "/admin/messages",
        method: "GET",
        credentials: "include",
      }),
      keepUnusedDataFor: 0,
      providesTags: ["Chat"],
    }),
  }),
});

export default api;

export const {
  useGetMyChatsQuery,
  useLazySearchUserQuery,
  useGetNotificationsQuery,
  useGetChatDetailsQuery,
  useGetMessagesQuery,
  useGetMyGroupsQuery,
  useGetAvailableFriendsQuery,
  useGetDashboardStatsQuery,
  useGetUsersDashboardStatsQuery,
  useGetMessagesDashboardStatsQuery,
  useGetChatsDashboardStatsQuery,
  useSendFriendRequestMutation,
  useAcceptFriendRequestMutation,
  useSendAttachmentsMutation,
  useNewGroupMutation,
  useRenameGroupMutation,
  useRemoveMemberMutation,
  useAddMembersMutation,
  useDeleteChatMutation,
  useLeaveGroupMutation,
} = api;
