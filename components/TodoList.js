// components/TodoList.js
import React from "react";
import { StyleSheet, ScrollView, Text } from "react-native";
import TodoListItem from "./TodoListItem";

const TodoList = ({ todos, onRemove, onToggle }) => {
  return (
    <ScrollView contentContainerStyle={styles.listContainer}>
      {todos.map((todo) => (
        <TodoListItem
          id={todo.id}
          textValue={todo.textValue}
          address={todo.address}
          request={todo.request}
          onRemove={onRemove}
          onToggle={onToggle}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    alignItems: "center",
  },
});

export default TodoList;
