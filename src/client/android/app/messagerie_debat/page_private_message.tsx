import React, { useState, useEffect } from "react";
import { View, StyleSheet, KeyboardAvoidingView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { getConversationWithUser, sendMessage } from "@/services/messages";
import { Message, PrivateConversation } from "@/types/messages";
import { UserModel } from "@/types/user_model";
import ConversationView from "@/components/ConversationView";
import MessageInput from "@/components/MessageInput";
import ChatHeader from "@/components/ChatHeader";
import { conversationsFull, getConversationById } from "@/public/message/exemple_message" // <<


export default function PrivateMessagePage() {
  const params = useLocalSearchParams();
  const withId = params.withId as string;
  const username = params.username as string;
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzY0NDQzNzY4LCJpYXQiOjE3NjQ0NDAxNjgsImp0aSI6IjE4Nzk4NjMyNzM1NjQxNzQ5MjY3MzdlOWMxNzU0OGViIiwidXNlcl9pZCI6ImVkYmUxYzcyLTlmNDYtNDFmMy1hZDQ4LWUyNzkzM2YwZTFmZCJ9.9U7-QQRWGNG7mxkZWfwhqYOenZ779t-5ctJ68Vslia0";

  const [conversation, setConversation] = useState<PrivateConversation | null>(null);

  const senderPublicKey = "edbe1c72-9f46-41f3-ad48-e27933f0e1fd";
  const receiverPublicKey = "80cd9cc4-63a7-4832-a517-972d3bc44386";

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await getConversationWithUser(token, withId);
        const messages: Message[] = data.results.map((m: any) => ({
          id: m.message_id,
          text: m.encrypted_content_receiver,
          timestamp: new Date(m.created_at).getTime(),
          from: m.sender_id,
        }));

        setConversation({
          with: { id: withId, username } as UserModel,
          messages,
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchMessages();
  }, [withId]);

  const handleSend = (text: string) => {
    if (!conversation) return;
    
    try {
      const data = await sendMessage(
        token,
        withId,
        text,
        senderPublicKey,
        receiverPublicKey
      );

      setConversation((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          messages: [
            ...prev.messages,
            {
              id: data.message_id,
              text: text,
              timestamp: new Date(data.created_at).getTime(),
              from: data.sender_id,
            },
          ],
        };
      });

    } catch (err) {
      console.error(err);
    }
  };

  if (!conversation) return null;

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={"height"}
      keyboardVerticalOffset={80}
    >
      <ChatHeader 
        name={conversation.with.username}
        photo={conversation.with.photo}
      />

      <ConversationView
        messages={conversation.messages}
        selfId="me"
      />

      <MessageInput onSend={handleSend} />
    </KeyboardAvoidingView>
  );

}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" }
});
