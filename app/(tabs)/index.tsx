import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const VoiceAssistantUI = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "How are you?", sender: "user" },
    { id: 2, text: "I'm fine, How may I help you today.", sender: "bot" },
    {
      id: 3,
      text: "Create an image of a dog playing with a cat",
      sender: "user",
    },
    { id: 4, image: "https://via.placeholder.com/150", sender: "bot" }, // Replace with actual image URL
  ]);

  return (
    <View style={styles.container}>
      {/* Assistant Header */}
      <View style={styles.header}>
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/4712/4712035.png",
          }}
          style={styles.assistantIcon}
        />
        <Text style={styles.assistantText}>Assistant</Text>
      </View>

      {/* Chat Messages */}
      <ScrollView style={styles.chatContainer}>
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.message,
              msg.sender === "user" ? styles.userMessage : styles.botMessage,
            ]}
          >
            {msg.text && <Text style={styles.messageText}>{msg.text}</Text>}
            {msg.image && (
              <Image source={{ uri: msg.image }} style={styles.messageImage} />
            )}
          </View>
        ))}
      </ScrollView>

      {/* Microphone Button */}
      <TouchableOpacity style={styles.micButton}>
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/3845/3845763.png",
          }}
          style={styles.micIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default VoiceAssistantUI;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    elevation: 3,
  },
  assistantIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  assistantText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  message: {
    padding: 12,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: "80%",
  },
  userMessage: {
    backgroundColor: "#e0e0e0",
    alignSelf: "flex-end",
  },
  botMessage: {
    backgroundColor: "#D6F8C6",
    alignSelf: "flex-start",
  },
  messageText: {
    fontSize: 16,
  },
  messageImage: {
    width: 200,
    height: 150,
    borderRadius: 8,
    marginTop: 5,
  },
  micButton: {
    alignSelf: "center",
    backgroundColor: "#ff3b30",
    padding: 15,
    borderRadius: 50,
    position: "absolute",
    bottom: 30,
  },
  micIcon: {
    width: 40,
    height: 40,
    tintColor: "#fff",
  },
});
