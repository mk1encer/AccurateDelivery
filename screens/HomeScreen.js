import { StatusBar } from "expo-status-bar";
import React, { useState, useContext } from "react";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";

import { IconButton } from "../components";
import TodoInsert from "../components/TodoInsert";
import TodoList from "../components/TodoList";

import Firebase from "../config/firebase";
import axios from "axios";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";
import * as Location from "expo-location";
import S3 from "../components/S3";

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
  const addTodo = ({ order_id, items, address, request_info }) => {
    setTodos([
      ...todos,
      {
        id: order_id,
        textValue: items,
        address: address,
        request: request_info,
        checked: false,
      },
    ]);
  };
  const onRemove = (id) => (e) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  const onToggle = (id) => (e) => {
    navigation.navigate("Camera"),
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, checked: !todo.checked } : todo
        )
      );
  };
  const [deliveryList, setDeliveryList] = useState([
    {
      order_id: "mk1encer",
      items: ["삼다수", "접시"],
      address: "장충단로 6길 42",
      request_info: "문앞에 놔두세요",
    },
    {
      order_id: "dgu",
      items: ["콜라", "접시"],
      address: "장충단로 6길 42",
      request_info: "문앞에 놔두세요",
    },
    {
      order_id: "mk1",
      items: ["삼다", "사탕"],
      address: "장충단로 6길 42",
      request_info: "문앞에 놔두세요",
    },
  ]);
  const loadAddress = () => {
    const response = axios.get(
      `http://localhost:8080/api/order/user/${user.email.split("@")[0]}`
    );

    setDeliveryList(response.data);
    //order_id,items,address,request_info

    deliveryList.map((list) => {
      addTodo(list);
    });
    alert(Object.values(todos[0]));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark-content" />
      <View style={styles.row}>
        <Text style={styles.appTitle}>Delivery List</Text>
        <IconButton name="plus" size={40} onPress={loadAddress} />
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
    color: "#000000",
    fontSize: 30,
    marginTop: 30,
    marginBottom: 30,
    fontWeight: "300",
    textAlign: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    flex: 1,
    borderTopLeftRadius: 10, // to provide rounded corners
    borderTopRightRadius: 10, // to provide rounded corners
    marginLeft: 10,
    marginRight: 10,
  },
  input: {
    padding: 20,
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
    fontSize: 24,
    marginLeft: 20,
  },
});
