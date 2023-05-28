import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { deleteUser } from "../redux/users/usersSlice";

type RootStackParamList = {
  Signup: undefined;
  Login: undefined;
};

type MainProps = {
  navigation: NavigationProp<RootStackParamList, "Signup">;
};

export function DeleteProfile() {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();

  const handleDelete = () => {
    console.log("Deleted");
    dispatch(deleteUser());
    handleGoBack();
    //  navigation.navigate("Signup");
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* <View style={styles.container}> */}
      <Text style={styles.question}>
        Are you sure you want to delete your account?
      </Text>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={handleDelete}>
          <Text style={styles.buttonText}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleGoBack}>
          <Text style={styles.buttonText}>No</Text>
        </TouchableOpacity>
      </View>
      {/* </View> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  question: {
    fontWeight: "500",
    fontSize: 16,
    color: "#667085",
    paddingVertical: 25,
    paddingHorizontal: 20,
  },
  detailsInfo: {
    fontWeight: "500",
    fontSize: 14,
    color: "#101828",
  },
  contact: {
    alignItems: "center",
    flexDirection: "row",
  },
  buttonContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#101828",
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginHorizontal: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttons: {
    alignItems: "center",
    flexDirection: "row",
  },
});
