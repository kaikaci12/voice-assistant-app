import {
  Image,
  StyleSheet,
  Platform,
  SafeAreaView,
  View,
  Pressable,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
export default function HomeScreen() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.titleContainer}>
        <ThemedText type="title" darkColor="#000">
          Yapping with Jarvis
        </ThemedText>
        <Image
          source={require("@/assets//images/chatbot.png")}
          style={styles.image}
        />
      </View>

      <Pressable onPress={() => router.push("/(tabs)")} style={styles.button}>
        Continue
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  image: {
    width: 200,
    height: 200,
  },
  button: {
    width: 200,
    height: 50,
    backgroundColor: "green",

    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    textAlign: "center",
    color: "white",
    fontSize: 24,
    marginTop: 40,
  },
});
