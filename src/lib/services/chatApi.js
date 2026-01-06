import { apiClient } from "../apiClient";

/**
 * Fetch all chat sessions for the current user
 */
export const getChatSessions = async () => {
    const response = await apiClient.get("/chats");
    return response.data;
};

/**
 * Fetch a single chat session by ID
 */
export const getChatSession = async (id) => {
    const response = await apiClient.get(`/chats/${id}`);
    return response.data;
};

/**
 * Create a new chat session
 */
export const createChatSession = async (data) => {
    const response = await apiClient.post("/chats", data);
    return response.data;
};

/**
 * Update an existing chat session
 */
export const updateChatSession = async (id, data) => {
    const response = await apiClient.put(`/chats/${id}`, data);
    return response.data;
};

/**
 * Delete a chat session
 */
export const deleteChatSession = async (id) => {
    const response = await apiClient.delete(`/chats/${id}`);
    return response.data;
};
