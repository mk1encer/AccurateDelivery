import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  TextInput,
  Button,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import * as firebase from "firebase";
import { signIn } from "./lib/auth";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signInSubmit = async () => {
    try {
      const { user } = await signIn({ email, passrowd });
      Alert.alert(user);
    } catch (e) {}
    Alert.alert("로그인 실패");
  };

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="truck-delivery" size={80} color="black" />
      <TextInput
        style={styles.inputBox}
        placeholder="ID"
        value={email}
        autoCapitalize="none"
        onChangeText={(email) => setEmail(email)}
      />
      <TextInput
        style={styles.inputBox}
        placeholder="Password"
        value={password}
        autoCapitalize="none"
        onChangeText={(pw) => setPassword(pw)}
      />
      <Button title="Sign in" style={styles.button} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF0F5",
    alignItems: "center",
    justifyContent: "center",
  },
  inputBox: {
    height: 40,
    width: 200,
    backgroundColor: "white",
    margin: 3,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },
  button: {
    borderWidth: 1,
    fontSize: 24,
    borderRadius: 8,
    backgroundColor: "#4B0082",
  },
});
