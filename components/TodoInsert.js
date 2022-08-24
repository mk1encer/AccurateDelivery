// components/TodoInsert.js
import React, { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";

const TodoInsert = ({ onAddTodo }) => {
  const [newTodoItem, setNewTodoItem] = useState("");
  const todoInputHandler = (newTodo) => {
    setNewTodoItem(newTodo);
  };
  const addTodoHandler = () => {
    onAddTodo(newTodoItem);
    setNewTodoItem("");
  };
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="배송 추가"
        value={newTodoItem}
        onChangeText={todoInputHandler}
        placeholderTextColor={"#999"}
        autoCorrect={false}
      />
      <View style={styles.button}>
        <Button
          onPress={addTodoHandler}
          title={"ADD"}
          backgroundColor="#8b00ff"
          titleColor="#fff"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    flex: 1,
    padding: 20,
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
    fontSize: 24,
    marginLeft: 20,
  },
  button: {
    marginRight: 10,
    backgroundColor: "#8b00ff",
  },
});

export default TodoInsert;
