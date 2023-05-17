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
} from "react-native";
import { login, logout, updateToken } from "../redux/users/usersSlice";
import { UsersEntity } from "../redux/users/usersEntity";
import * as SecureStore from "expo-secure-store";

export function Login() {
  const token: string | undefined | null = useSelector(
    (state: RootState) => state.users.token
  );
  const error: string | undefined = useSelector(
    (state: RootState) => state.users.error
  );

  const dispatch = useDispatch<AppDispatch>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginSuccess = (event: any) => {
    event.preventDefault();
    dispatch(login(new UsersEntity(email, password)));
  };

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("token");
    dispatch(logout());
  };

  useEffect(() => {
    const asyncFunc = async () => {
      const token = await SecureStore.getItemAsync("token");

      if (token) {
        console.log("Token exists, logging out");
        await SecureStore.deleteItemAsync("token");
        dispatch(logout());
      } else {
        console.log("Token is", token);
        const user = new UsersEntity(email, password);
        dispatch(login(user));
      }
    };

    asyncFunc();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log ind</Text>
      <Text style={styles.paragraph}>
        Welcome back! Please enter your details.
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
          placeholder="*******"
          style={styles.input}
          onChangeText={setPassword}
          value={password}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLoginSuccess}>
        <Text style={styles.buttonText}>Log ind</Text>
      </TouchableOpacity>

      {token && (
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Log ud</Text>
        </TouchableOpacity>
      )}
      <View style={styles.rectangle}>
        <Image source={require("../redux/users/assets/Rectangle.png")} />
      </View>

      <Text>{error}</Text>
    </View>
  );
}
const screen = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 16,
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
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#101828",
    borderRadius: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    width: screen.width - 40,
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
    top: "61%",
    // bottom: "-14.58%",
  },
});