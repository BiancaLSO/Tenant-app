import React, { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../store";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { signup } from "../redux/users/usersSlice";
import { NavigationProp } from "@react-navigation/native";
import { SignUpUser } from "../redux/users/signupuserEntity";

type RootStackParamList = {
  Main: undefined;
};

type MainProps = {
  navigation: NavigationProp<RootStackParamList, "Main">;
};

export function Signup({ navigation }: MainProps) {
  const error: string | undefined = useSelector(
    (state: RootState) => state.users.error
  );

  const dispatch = useDispatch<AppDispatch>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");

  const handleSignup = (event: any) => {
    event.preventDefault();

    dispatch(
      signup(new SignUpUser(email, password, firstName, lastName, phone, role))
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <>
        <Text style={styles.title}>Sign up</Text>
        <Text style={styles.paragraph}>
          Welcome! Please enter your details.
        </Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="Indtast din email adresse"
            style={styles.input}
            onChangeText={setEmail}
            value={email.toLowerCase()}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            secureTextEntry={true}
            placeholder="*******"
            style={styles.input}
            onChangeText={setPassword}
            value={password}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>First name</Text>
          <TextInput
            placeholder="John"
            style={styles.input}
            onChangeText={setFirstName}
            value={firstName}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Last name</Text>
          <TextInput
            placeholder="Doe"
            style={styles.input}
            onChangeText={setLastName}
            value={lastName}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone</Text>
          <TextInput
            placeholder="12345678"
            style={styles.input}
            onChangeText={setPhone}
            value={phone}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Role</Text>
          <TextInput
            placeholder="Tenant"
            style={styles.input}
            onChangeText={setRole}
            value={role}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>
      </>
      {/* <View style={styles.rectangle}>
        <Image source={require("../redux/users/assets/Rectangle.png")} />
      </View> */}
      <Text>{error}</Text>
    </ScrollView>
  );
}
const screen = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "flex-start",
    padding: 20,
    paddingBottom: 700, // Adjust this value as needed
    // marginBottom: 20,
  },
  title: {
    display: "flex",
    justifyContent: "flex-start",
    fontWeight: "bold",
    fontSize: 24,
    paddingBottom: 10,
    color: "#101828",
  },
  logoContainer: {
    position: "absolute",
    top: 50,
    left: 0,
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  paragraph: {
    paddingBottom: 30,
    color: "#667085",
  },
  label: {
    fontSize: 16,
    color: "#101828",
    marginBottom: 10,
  },
  input: {
    width: screen.width - 40,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#101828",
    borderRadius: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    width: screen.width - 40,
    marginBottom: -300,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  rectangle: {
    position: "absolute",
    left: "40%",
    // right: "-10.27%",
    top: "100%",
    // bottom: "-14.58%",
  },
  extraSpace: {
    height: 100,
  },
});
