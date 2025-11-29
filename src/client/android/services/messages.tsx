import axios from "axios";

const API_BASE = "http://localhost:8080/api/v1";

export const getConversations = async (token: string, page = 1, page_size = 20) => {
  const response = await axios.get(`${API_BASE}/messages/`, {
    headers: { Authorization: `Bearer ${token}` },
    params: { page, page_size },
  });
  return response.data;
};

export const getConversationWithUser = async (token: string, user_id: string, page = 1, page_size = 20) => {
  const response = await axios.get(`${API_BASE}/messages/${user_id}`, {
    headers: { Authorization: `Bearer ${token}` },
    params: { page, page_size },
  });
  return response.data;
};

export const sendMessage = async (
  token: string,
  user_id: string,
  content: string,
  sender_public_key: string,
  receiver_public_key: string
) => {
  const response = await axios.post(
    `${API_BASE}/messages/${user_id}/send`,
    { content, sender_public_key, receiver_public_key },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};
