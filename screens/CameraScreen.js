import { Ionicons } from "@expo/vector-icons";
import { Camera, CameraType } from "expo-camera";
import { useRef, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import * as MediaLibrary from "expo-media-library";

export default function CameraScreen() {
  const camera = useRef();

  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const [cameraReady, setCameraReady] = useState(false);
  const [takenPhoto, setTakenPhoto] = useState("");

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const toggleFlash = () => {
    if (flashMode === Camera.Constants.FlashMode.off) {
      setFlashMode(Camera.Constants.FlashMode.on);
    } else {
      setFlashMode(Camera.Constants.FlashMode.off);
    }
  };

  const takePhoto = async () => {
    if (camera.current) {
      const { height, uri, width } = await camera.current.takePictureAsync({
        quality: 1,
        exif: true,
      });
      await MediaLibrary.saveToLibraryAsync(uri);
      alert(uri);

      setTakenPhoto(uri);
    }
  };

  const onUpload = async () => {
    alert(takenPhoto);
  };
  return (
    <View style={styles.container}>
      {takenPhoto === "" ? (
        <Camera
          style={styles.camera}
          type={type}
          flashMode={flashMode}
          ref={camera}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleFlash}>
              <Ionicons
                name={
                  flashMode === Camera.Constants.FlashMode.off
                    ? "flash-off"
                    : "flash"
                }
                style={styles.text}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={takePhoto}>
              <Ionicons name="camera" style={styles.text} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
              <Text style={styles.text}>Flip</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      ) : (
        <View style={styles.container}>
          <Image source={{ uri: takenPhoto }} style={{ flex: 20 }} />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onUpload}>
              <Text
                style={{ color: "black", fontWeight: "bold", fontSize: 24 }}
              >
                upload
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
    fontSize: 40,
    color: "white",
  },
  text: {
    fontSize: 35,
    fontWeight: "bold",
    color: "white",
  },
});
