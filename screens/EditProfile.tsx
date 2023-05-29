import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { UsersEntity } from "../redux/users/usersEntity";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useEffect, useState } from "react";
import { fetchUserData, updateUser } from "../redux/users/usersSlice";
import { useNavigation } from "@react-navigation/native";

export default function EditProfile() {
  const user: UsersEntity | null = useSelector(
    (state: RootState) => state.users.user
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();

  const [apartmentInfo, setApartmentInfo] = useState({
    allowPets: false,
    apartment: 0,
    extraDetails: "",
    floor: 0,
    id: 0,
    region: "",
    street: "",
  });
  const [email, setEmail] = useState(user?.email ?? "");
  //   const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState(user?.firstName ?? "");
  const [lastName, setLastName] = useState(user?.lastName ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [role, setRole] = useState(user?.role);
  const [address, setAddress] = useState({
    id: 0,
    street: "",
    apartment: 0,
    floor: 0,
    region: "",
  });

  // validation
  const [errors, setErrors] = useState("");
  const [emailError, setEmailError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userFromProfile = await dispatch(fetchUserData());
        setApartmentInfo({
          allowPets: userFromProfile.payload.apartmentInfo.allowPets,
          apartment: userFromProfile.payload.apartmentInfo.apartment,
          extraDetails: userFromProfile.payload.apartmentInfo.extraDetails,
          floor: userFromProfile.payload.apartmentInfo.floor,
          id: userFromProfile.payload.apartmentInfo.id,
          region: userFromProfile.payload.apartmentInfo.region,
          street: userFromProfile.payload.apartmentInfo.street,
        });
        setAddress({
          id: userFromProfile.payload.apartmentInfo.id,
          street: userFromProfile.payload.apartmentInfo.street,
          apartment: userFromProfile.payload.apartmentInfo.apartment,
          floor: userFromProfile.payload.apartmentInfo.floor,
          region: userFromProfile.payload.apartmentInfo.region,
        });
        console.log(apartmentInfo);
        console.log(address);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const onUpdatePress = () => {
    navigation.goBack();
  };

  const handleUpdate = () => {
    if (!validateForm()) {
      return;
    }

    try {
      const updatedUser: UsersEntity = {
        username: email,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        role: role,
      };
      console.log("Updated user from profile", updatedUser);
      dispatch(updateUser(updatedUser));
      onUpdatePress();
    } catch (error) {
      setErrors("Update failed. Please try again.");
      console.log("Update failed");
    }
  };

  const validateForm = () => {
    setEmailError("");
    setFirstNameError("");
    setLastNameError("");
    setPhoneError("");

    if (!email) {
      setEmailError("Email is required.");
      return false;
    }

    if (!email.includes("@")) {
      setEmailError("Invalid email format.");
      return false;
    }

    if (!firstName) {
      setFirstNameError("First name is required.");
      return false;
    }

    if (!lastName) {
      setLastNameError("Last name is required.");
      return false;
    }

    if (!phone) {
      setPhoneError("Phone is required.");
      return false;
    }

    // Validation successful
    return true;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setEmailError("");
          }}
        />
        {emailError !== "" && <Text style={styles.error}>{emailError}</Text>}
      </View>
      {/* <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
      </View> */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={(text) => {
            setFirstName(text);
            setFirstNameError("");
          }}
        />
        {firstNameError !== "" && (
          <Text style={styles.error}>{firstNameError}</Text>
        )}
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={(text) => {
            setLastName(text);
            setLastNameError("");
          }}
        />
        {lastNameError !== "" && (
          <Text style={styles.error}>{lastNameError}</Text>
        )}
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Phone</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={(text) => {
            setPhone(text);
            setPhoneError("");
          }}
        />
        {phoneError !== "" && <Text style={styles.error}>{phoneError}</Text>}
      </View>
      {/* Add them for admin */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Role</Text>
        <TextInput style={styles.input} value={role} editable={false} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Address</Text>
        <TextInput style={styles.input} editable={false}>
          {address.street} no. {address.apartment}, {address.floor},{" "}
          {address.region}
        </TextInput>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText} onPress={handleUpdate}>
            Update
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const screen = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
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
  buttons: {
    alignItems: "center",
    flexDirection: "row",
  },
});
