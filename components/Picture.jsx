import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView, Button, Image, TouchableOpacity } from "react-native";
import { useEffect, useRef, useState } from "react";
import { Camera } from "expo-camera";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import { Feather } from "@expo/vector-icons";

export function Picture(props) {
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>;
  } else if (!hasCameraPermission) {
    return <Text>Permission for camera not granted. Please change this in settings.</Text>;
  }

  const extractFilename = (uri) => {
    const parts = uri.split("/");
    return parts[parts.length - 1];
  };

  let takePic = async () => {
    let options = {
      quality: 0.1,
      base64: true,
      exif: false,
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    props.setPhotoToDisplay(newPhoto);
    setPhoto(newPhoto);
    props.handlePhotoName(extractFilename(newPhoto.uri));
  };

  if (photo) {
    let savePhoto = () => {
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        setPhoto(undefined);
        props.setCamera(false);
      });
    };

    return (
      <SafeAreaView style={styles.container}>
        <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }}></Image>
        {hasMediaLibraryPermission ? <Button title="Save to camera roll" onPress={savePhoto} /> : undefined}
        <Button title="Try again" onPress={() => setPhoto(undefined)} />
      </SafeAreaView>
    );
  }

  return (
    <Camera style={styles.container} ref={cameraRef}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={takePic}>
          <Feather name="circle" size={60} color="white" />
        </TouchableOpacity>
      </View>
    </Camera>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    width: "100%",
    height: 500,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  buttonContainer: {
    backgroundColor: "transparent",
    alignSelf: "center",
    justifySelf: "flex-end",
    margin: 15,
  },
  preview: {
    alignSelf: "stretch",
    flex: 1,
  },
});
