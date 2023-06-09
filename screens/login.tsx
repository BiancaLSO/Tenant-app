import React, { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../store";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity, Image } from "react-native";
import { login, logout, setRefresh, updateToken } from "../redux/users/usersSlice";
import { UsersEntity } from "../redux/users/usersEntity";
import * as SecureStore from "expo-secure-store";
import { NavigationProp } from "@react-navigation/native";

type RootStackParamList = {
  Menu: undefined;
  Signup: undefined;
};

type MainProps = {
  navigation: NavigationProp<RootStackParamList, "Menu">;
};

export function Login({ navigation }: MainProps) {
  const token: string | undefined | null = useSelector((state: RootState) => state.users.token);
  const error: string | undefined = useSelector((state: RootState) => state.users.error);

  const dispatch = useDispatch<AppDispatch>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLoginSuccess = (event: any) => {
    event.preventDefault();

    if (validateFields()) {
      dispatch(login(new UsersEntity(email, password)));
      dispatch(setRefresh(true));
      navigation.navigate("Menu");
    }
  };
  const validateFields = () => {
    let isValid = true;

    if (!email.includes("@")) {
      setEmailError("Email is required");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (password.length < 4) {
      setPasswordError("Please enter a password with at least 4 characters.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("token");
    dispatch(logout());
    dispatch(setRefresh(false));
    console.log("You are logged out");
  };

  const handleNavigateSignup = () => {
    navigation.navigate("Signup");
  };

  useEffect(() => {
    const asyncFunc = async () => {
      const token = await SecureStore.getItemAsync("token");

      if (token) {
        console.log("Token exists, logging out");
        await SecureStore.deleteItemAsync("token");
        dispatch(logout());
      } else {
        dispatch(updateToken(token));
        console.log("token is", token);
      }
    };

    asyncFunc();
  }, []);

  return (
    <View style={styles.container}>
      {token ? (
        <Text style={styles.paragraph}>You are logged in.</Text>
      ) : (
        <>
          <Text style={styles.title}>Log ind</Text>
          <Text style={styles.paragraph}>Welcome back! Please enter your details.</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              placeholder="Indtast din email adresse"
              style={styles.input}
              onChangeText={(text) => {
                setEmail(text);
                setEmailError(""); // Clear email error when typing
              }}
              value={email.toLowerCase()}
            />
            {emailError !== "" && <Text style={styles.error}>{emailError}</Text>}
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              secureTextEntry={true}
              placeholder="*******"
              style={styles.input}
              onChangeText={(text) => {
                setPassword(text);
                setPasswordError(""); // Clear email error when typing
              }}
              value={password}
            />
            {passwordError !== "" && <Text style={styles.error}>{passwordError}</Text>}
          </View>

          <TouchableOpacity style={styles.button} onPress={handleLoginSuccess}>
            <Text style={styles.buttonText}>Log in</Text>
          </TouchableOpacity>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text style={styles.noAcc}>You do not have an account yet?</Text>
            <TouchableOpacity style={{ height: 50 }} onPress={handleNavigateSignup}>
              <Text style={styles.link}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {token && (
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Log out</Text>
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
  noAcc: {
    fontSize: 16,
    color: "#101828",
    marginTop: 30,
  },
  link: {
    fontSize: 16,
    color: "#101828",
    marginTop: 30,
    marginLeft: 5,
    textDecorationLine: "underline",
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
    top: "61%",
    zIndex: -1,
  },
  error: {
    color: "red",
    fontWeight: "900",
    textAlign: "left",
  },
});
