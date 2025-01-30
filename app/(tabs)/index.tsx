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

  // Initialize Voice
  useEffect(() => {
    if (!Voice) {
      console.error(
        "Voice is undefined. Check library installation and linking."
      );
      return;
    }
    // Set up event listeners
    Voice.onSpeechStart = speechStartHandler;
    Voice.onSpeechEnd = speechEndHandler;
    Voice.onSpeechResults = speechResultsHandler;
    Voice.onSpeechError = speechErrorHandler;

    return () => {
      // Clean up event listeners
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  // Speech start handler
  const speechStartHandler = () => {
    console.log("Speech started");
  };

  // Speech end handler
  const speechEndHandler = () => {
    console.log("Speech ended");
  };

  // Speech results handler
  const speechResultsHandler = (event) => {
    const text = event.value[0]; // Get the recognized text
    console.log("Speech results:", text);
    addMessage(text, "user"); // Add the recognized text as a user message
  };

  // Speech error handler
  const speechErrorHandler = (event) => {
    console.log("Speech error:", event.error);
    setRecording(false); // Stop recording on error
  };

  // Start recording
  const startRecording = async () => {
    try {
      await Voice.start("en-US"); // Start recording with English language
      setRecording(true);
      console.log("Recording started");
    } catch (error) {
      console.log("Error starting recording:", error);
    }
  };

  // Stop recording
  const stopRecording = async () => {
    try {
      await Voice.stop(); // Stop recording
      setRecording(false);
      console.log("Recording stopped");
    } catch (error) {
      console.log("Error stopping recording:", error);
    }
  };

  // Stop speaking (e.g., stop text-to-speech or audio playback)
  const stopSpeaking = () => {
    // Add logic to stop any ongoing audio playback or text-to-speech
    console.log("Stopping speaking...");
    setSpeaking(false);
  };

  // Add a message to the chat
  const addMessage = (text, sender) => {
    const newMessage = {
      id: messages.length + 1,
      text,
      sender,
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  // Clear all messages
  const clearMessages = () => {
    setMessages([]);
  };

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
        <Pressable onPress={clearMessages}>
          <Text>Clear</Text>
        </Pressable>
        <TouchableOpacity
          style={[
            styles.micButton,
            { backgroundColor: recording ? "red" : "green" }, // Change color based on recording state
          ]}
          onPress={recording ? stopRecording : startRecording}
        >
          <FontAwesome name="microphone" size={30} color="white" />
        </TouchableOpacity>
        <Pressable onPress={stopSpeaking}>
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
