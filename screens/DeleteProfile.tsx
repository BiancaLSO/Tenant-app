import { NavigationProp, useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { deleteUser } from "../redux/users/usersSlice";
import { UsersEntity } from "../redux/users/usersEntity";
import { useState } from "react";

type RootStackParamList = {
  Signup: undefined;
  Login: undefined;
};

type MainProps = {
  navigation: NavigationProp<RootStackParamList, "Signup">;
};

export function DeleteProfile({ navigation }: MainProps) {
  const user: UsersEntity | null = useSelector(
    (state: RootState) => state.users.user
  );
  const [userId, setUserId] = useState(user ? user.id : 0);
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = () => {
    if (userId) {
      dispatch(deleteUser(userId));
      navigation.navigate("Signup");
    } else {
      console.log("Error");
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
