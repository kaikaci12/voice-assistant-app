import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { dummymessages } from "@/constants/messages";
import Voice from "@react-native-voice/voice";

const VoiceAssistantUI = () => {
  const [messages, setMessages] = useState(dummymessages);
  const [recording, setRecording] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  // Toggle recording state
  const toggleRecording = () => {
    setRecording((prev) => !prev);
  };
  const clear = () => {
    setMessages([]);
  };
  const stopSpeaking = () => {
    setSpeaking(false);
  };

  useEffect(() => {
    Voice.onSpeechStart = speechStartHandler;
    Voice.onSpeechEnd = speechEndHandler;
    Voice.onSpeechResults = speechResultsHandler;
  });
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

      {/* Audio Controls */}
      <View style={styles.audio}>
        <Pressable onPress={() => setMessages([])}>
          <Text>Clear</Text>
        </Pressable>
        <TouchableOpacity
          style={[
            styles.micButton,
            { backgroundColor: isRecording ? "red" : "green" }, // Change color based on recording state
          ]}
          onPress={toggleRecording}
        >
          <FontAwesome name="microphone" size={30} color="white" />
        </TouchableOpacity>
        <Pressable>
          <Text>Stop</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default VoiceAssistantUI;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
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
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 80,
  },
  audio: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    elevation: 3,
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});
