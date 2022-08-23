import { StatusBar } from "expo-status-bar";
import React, { useContext, useState } from "react";
import { SafeAreaView, StyleSheet, TextInput, View, Text, ScrollView } from "react-native";

import { IconButton } from "../components";
import TodoInsert from '../components/TodoInsert';
import TodoList from '../components/TodoList';

import Firebase from "../config/firebase";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const auth = Firebase.auth();

export default function HomeScreen({ navigation }) {
  const { user } = useContext(AuthenticatedUserContext);
  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };
  // todos: {id: Number, textValue: string, checked: boolean }
  const [todos, setTodos] = useState([]);
  const addTodo = text => {
    setTodos([
      ...todos,
      { id: Math.random().toString(), textValue: text, checked: false },
    ]);
  };
  const onRemove = id => e => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  const onToggle = id => e => {
    navigation.navigate("Camera"),
      setTodos(
        todos.map(todo =>
          todo.id === id ? { ...todo, checked: !todo.checked } : todo,
        ),
      );
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark-content" />
      <View style={styles.row}>
        <Text style={styles.appTitle}>Delivery List</Text>
        <IconButton
          name="logout"
          size={24}
          color="#000000"
          onPress={handleSignOut}
        />
      </View>
      <View style={styles.card}>
        <TodoInsert onAddTodo={addTodo} />
        <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
      </View>
    </SafeAreaView>
    /*
    <View style={styles.container}>
      <StatusBar style="dark-content" />
      <View style={styles.row}>
        <Text style={styles.title}>Welcome {user.email.split("@")[0]}!</Text>
        <IconButton
          name="logout"
          size={24}
          color="#fff"
          onPress={handleSignOut}
        />
      </View>
      <IconButton
        name="camera"
        size={40}
        color="#fff"
        onPress={() => navigation.navigate("Camera")}
      />
    </View>
    */
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF0F5",
    paddingHorizontal: 12,

  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  appTitle: {
    color: '#000000',
    fontSize: 30,
    marginTop: 30,
    marginBottom: 30,
    fontWeight: '300',
    textAlign: 'center',
    alignItems: "center",
  },
  card: {
    backgroundColor: '#fff',
    flex: 1,
    borderTopLeftRadius: 10, // to provide rounded corners
    borderTopRightRadius: 10, // to provide rounded corners
    marginLeft: 10,
    marginRight: 10,
  },
  input: {
    padding: 20,
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
    fontSize: 24,
    marginLeft: 20,
  },
});
