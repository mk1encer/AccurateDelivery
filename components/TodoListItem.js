// components/TodoListItem.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const TodoListItem = ({ textValue, id, checked, onRemove, onToggle }) => {
  const onLocate = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      })();
    }, []);

    let text = "Waiting..";
    if (errorMsg) {
      text = errorMsg;
    } else if (location) {
      text = JSON.stringify(location);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPressOut={onToggle(id)}>
        {checked ? (
          <View style={styles.completeCamera}>
            <MaterialCommunityIcons
              name="camera-off-outline"
              size={30}
              color="#FFF0F5"
            />
          </View>
        ) : (
          <View style={styles.camera}>
            <MaterialCommunityIcons
              name="camera-marker-outline"
              size={30}
              color="#8b00ff"
            />
          </View>
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={onLocate}>
        <Text
          style={[
            styles.text,
            checked ? styles.strikeText : styles.unstrikeText,
          ]}
        >
          {`${id} ${textValue} `}
        </Text>
      </TouchableOpacity>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonText} onPress={onRemove(id)}>
            {checked ? (
              <View style={styles.completeCamera}>
                <MaterialCommunityIcons
                  name="trash-can-outline"
                  size={25}
                  color="#FFF0F5"
                />
              </View>
            ) : (
              <View style={styles.camera}>
                <MaterialCommunityIcons
                  name="trash-can-outline"
                  size={25}
                  color="#8b00ff"
                />
              </View>
            )}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomColor: "#bbb",
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    flex: 5,
    fontWeight: "500",
    fontSize: 18,
    marginVertical: 20,
    width: 100,
  },
  camera: {
    width: 30,
    height: 30,
    marginRight: 20,
    marginLeft: 20,
  },
  completeCamera: {
    marginRight: 20,
    marginLeft: 20,
  },
  strikeText: {
    color: "#bbb",
    textDecorationLine: "line-through",
  },
  unstrikeText: {
    color: "#29323c",
  },
  buttonContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
});

export default TodoListItem;
