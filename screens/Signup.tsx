import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { SignUpUser } from "../redux/users/signupuserEntity";
import { signupBoard, signupTenant } from "../redux/users/usersSlice";
import { NavigationProp } from "@react-navigation/native";

type RootStackParamList = {
  Login: undefined;
};

type MainProps = {
  navigation: NavigationProp<RootStackParamList, "Login">;
};

export function Signup({ navigation }: MainProps) {
  const [showFormTenant, setShowFormTenant] = useState(false);
  const [showFormBoard, setShowFormBoard] = useState(false);
  const error: string | undefined = useSelector(
    (state: RootState) => state.users.error
  );

  const dispatch = useDispatch<AppDispatch>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [roleTenant, setRoleTenant] = useState("Tenant");
  const [roleBoard, setRoleBoard] = useState("Admin");

  // validation
  const [errors, setErrors] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const validateForm = () => {
    if (
      !email ||
      (!password && password.length > 4) ||
      !firstName ||
      !lastName ||
      !phone
    ) {
      setEmailError("Email is required.");
      setPasswordError("Please enter a password with at least 4 characters.");
      setFirstNameError("First name is required.");
      setLastNameError("Last name is required.");
      setPhoneError("Phone number is required.");
      return false;
    }

    if (!email.includes("@")) {
      setEmailError("Invalid email format.");
      return false;
    }

    if (!password || password.length < 4) {
      setPasswordError("Please enter a password with at least 4 characters.");
      return;
    }

    // Validation successful
    return true;
  };

  const clearFieldErrors = () => {
    setEmailError("");
    setPasswordError("");
    setFirstNameError("");
    setLastNameError("");
    setPhoneError("");
  };

  // validation end

  const handleSignupTenant = async (event: any) => {
    event.preventDefault();

    if (!validateForm()) {
      return; // Exit if form validation fails
    }

    const success = await dispatch(
      signupTenant(
        new SignUpUser(email, password, firstName, lastName, phone, roleTenant)
      )
    );

    if (success) {
      clearFieldErrors();
      navigation.navigate("Login");
    } else {
      setErrors("Sign-up failed. Please try again.");
      console.log("Sign-up failed");
    }
  };

  const handleSignupBoard = async (event: any) => {
    event.preventDefault();
    if (!validateForm()) {
      return; // Exit if form validation fails
    }
    const success = await dispatch(
      signupBoard(
        new SignUpUser(email, password, firstName, lastName, phone, roleBoard)
      )
    );

    if (success) {
      clearFieldErrors();
      navigation.navigate("Login");
    } else {
      setErrors("Sign-up failed. Please try again.");
      console.log("Sign-up failed");
    }
  };
  const handleYesClick = () => {
    setShowFormTenant(true);
    setShowFormBoard(false);
  };

  const handleNoClick = () => {
    setShowFormBoard(true);
    setShowFormTenant(false);
  };

  const handleGoBack = () => {
    setShowFormTenant(false);
    setShowFormBoard(false);
  };

  if (!showFormTenant && !showFormBoard) {
    return (
      <View style={styles.containerModal}>
        <Text style={styles.question}>Are you a tenant or a board member?</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleYesClick}>
            <Text style={styles.buttonText}>Tenant</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleNoClick}>
            <Text style={styles.buttonText}>Board member</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rectangle}>
          <Image source={require("../redux/users/assets/Rectangle.png")} />
        </View>
      </View>
    );
  }
  if (showFormTenant) {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <>
          <View style={styles.containerFlex}>
            <TouchableOpacity
              onPress={handleGoBack}
              style={styles.goBackButton}
            >
              <Image source={require("../assets/Icon.png")} />
            </TouchableOpacity>
            <Text style={styles.paragraph}>
              Welcome! Please enter your details.
            </Text>
          </View>
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
            {emailError !== "" && (
              <Text style={styles.error}>{emailError}</Text>
            )}
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
            {passwordError !== "" && (
              <Text style={styles.error}>{passwordError}</Text>
            )}
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>First name</Text>
            <TextInput
              placeholder="John"
              style={styles.input}
              onChangeText={(text) => {
                setFirstName(text);
                setFirstNameError(""); // Clear email error when typing
              }}
              value={firstName}
            />
            {firstNameError !== "" && (
              <Text style={styles.error}>{firstNameError}</Text>
            )}
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Last name</Text>
            <TextInput
              placeholder="Doe"
              style={styles.input}
              onChangeText={(text) => {
                setLastName(text);
                setLastNameError(""); // Clear email error when typing
              }}
              value={lastName}
            />
            {lastNameError !== "" && (
              <Text style={styles.error}>{lastNameError}</Text>
            )}
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Phone</Text>
            <TextInput
              placeholder="12345678"
              style={styles.input}
              onChangeText={(text) => {
                setPhone(text);
                setPhoneError(""); // Clear email error when typing
              }}
              value={phone}
            />
            {phoneError !== "" && (
              <Text style={styles.error}>{phoneError}</Text>
            )}
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Role</Text>
            <TextInput
              placeholder="Tenant"
              style={styles.input}
              onChangeText={setRoleTenant}
              value={roleTenant}
              editable={false} // Set editable to false to prevent user input
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSignupTenant}>
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableOpacity>
        </>

        {errors && <Text style={styles.error}>{errors}</Text>}
      </ScrollView>
    );
  }

  if (showFormBoard) {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <>
          <View style={styles.containerFlex}>
            <TouchableOpacity
              onPress={handleGoBack}
              style={styles.goBackButton}
            >
              <Image source={require("../assets/Icon.png")} />
            </TouchableOpacity>
            <Text style={styles.paragraph}>
              Welcome! Please enter your details.
            </Text>
          </View>
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
            {emailError !== "" && (
              <Text style={styles.error}>{emailError}</Text>
            )}
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
            {passwordError !== "" && (
              <Text style={styles.error}>{passwordError}</Text>
            )}
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>First name</Text>
            <TextInput
              placeholder="John"
              style={styles.input}
              onChangeText={(text) => {
                setFirstName(text);
                setFirstNameError(""); // Clear email error when typing
              }}
              value={firstName}
            />
            {firstNameError !== "" && (
              <Text style={styles.error}>{firstNameError}</Text>
            )}
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Last name</Text>
            <TextInput
              placeholder="Doe"
              style={styles.input}
              onChangeText={(text) => {
                setLastName(text);
                setLastNameError(""); // Clear email error when typing
              }}
              value={lastName}
            />
            {lastNameError !== "" && (
              <Text style={styles.error}>{lastNameError}</Text>
            )}
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Phone</Text>
            <TextInput
              placeholder="12345678"
              style={styles.input}
              onChangeText={(text) => {
                setPhone(text);
                setPhoneError(""); // Clear email error when typing
              }}
              value={phone}
            />
            {phoneError !== "" && (
              <Text style={styles.error}>{phoneError}</Text>
            )}
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Role</Text>
            <TextInput
              placeholder="Admin"
              style={styles.input}
              onChangeText={setRoleBoard}
              value={roleBoard}
              editable={false} // Set editable to false to prevent user input
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSignupBoard}>
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableOpacity>
        </>
        {error && <Text>{error}</Text>}
      </ScrollView>
    );
  }
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
  containerModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  containerFlex: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  question: {
    fontSize: 20,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#101828",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  formLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  formInput: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: 300,
  },
  goBackButton: {
    width: 60,
    height: 60,
    marginRight: 40,
    borderRadius: 30,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
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
    // paddingBottom: 30,
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
  rectangle: {
    position: "absolute",
    left: "40%",
    // right: "-10.27%",
    top: "57%",
    // bottom: "-14.58%",
  },
  extraSpace: {
    height: 100,
  },
  arrowIcon: {
    width: 20,
    height: 20,
    tintColor: "white",
  },
  error: {
    color: "red",
    fontWeight: "900",
    textAlign: "left",
  },
});
