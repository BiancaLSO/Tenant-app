import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { UsersEntity } from "../redux/users/usersEntity";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { fetchUserData } from "../redux/users/usersSlice";
import { NavigationProp } from "@react-navigation/native";
import { IssueEntity } from "../redux/issue/issueEntity";
import { ScrollView } from "react-native-gesture-handler";
import { fetchAllIssues, fetchUserIssues } from "../redux/issue/issueSlice";

type RootStackParamList = {
  EditProfile: undefined;
  DeleteProfile: undefined;
};

type MainProps = {
  navigation: NavigationProp<
    RootStackParamList,
    "EditProfile" | "DeleteProfile"
  >;
};

export default function Profile({ navigation }: MainProps) {
  const user: UsersEntity | null = useSelector(
    (state: RootState) => state.users.user
  );
  const userIssues: IssueEntity[] = useSelector(
    (state: RootState) => state.issue.userIssues
  );

  const dispatch = useDispatch<AppDispatch>();
  const [userId, setUserId] = useState<number | undefined>(0);
  const [userInfo, setUserInfo] = useState({});
  const [apartmentInfo, setApartmentInfo] = useState({
    allowPets: false,
    apartment: 0,
    extraDetails: "",
    floor: 0,
    id: 0,
    region: "",
    street: "",
  });

  const onEditPress = () => {
    navigation.navigate("EditProfile");
  };

  const onDeletePress = () => {
    navigation.navigate("DeleteProfile");
  };

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
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setUserId(user?.id);
  }, [user]);

  useEffect(() => {
    dispatch(fetchUserIssues(userId));
  }, [userId]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {user ? (
        <>
          <View style={styles.user}>
            <Image
              style={styles.imgProfile}
              source={require("../assets/Rectangle.png")}
            />
            <Text style={styles.name}>
              {user.firstName} {user.lastName}
            </Text>
            <Text style={styles.typeOfUser}>
              {user.role
                ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
                : ""}
            </Text>
          </View>
          <View style={styles.contact}>
            <TouchableOpacity style={styles.button} onPress={onEditPress}>
              <Icon
                name="edit"
                size={30}
                color="#F2F4F7"
                style={styles.icons}
              />
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onDeletePress}>
              <Icon
                name="delete"
                size={30}
                color="#F2F4F7"
                style={styles.icons}
              />
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
          <View>
            <View style={styles.details}>
              <Text style={styles.detailsTitle}>Email</Text>
              <Text style={styles.detailsInfo}>{user.email}</Text>
            </View>
            <View style={styles.details}>
              <Text style={styles.detailsTitle}>Phone</Text>
              <Text style={styles.detailsInfo}>{user.phone}</Text>
            </View>
            {userInfo ? (
              <View style={styles.details}>
                <Text style={styles.detailsTitle}>Address</Text>
                <Text style={styles.detailsInfo}>
                  {apartmentInfo.street} no. {apartmentInfo.apartment},{" "}
                  {apartmentInfo.floor}, {apartmentInfo.region}
                </Text>
              </View>
            ) : (
              <></>
            )}
          </View>
          <View style={{ alignSelf: "flex-start" }}>
            <Text style={styles.myIssuesTitle}>
              My issues ({userIssues?.length})
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
              marginVertical: 10,
            }}
          >
            {userIssues?.map((issue) => (
              <View key={issue.id} style={styles.categoryItem}>
                <Text style={styles.detailsTitle}>{issue.subject}</Text>
                <Text style={styles.detailsInfo}>{issue.description}</Text>
              </View>
            ))}
          </View>
        </>
      ) : (
        <Text>Loading profile...</Text>
      )}
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
  imgProfile: {
    marginTop: 30,
    height: 100,
    width: 100,
  },
  user: {
    alignItems: "center",
    width: 380,
    height: 250,
  },
  name: {
    fontWeight: "600",
    fontSize: 20,
    lineHeight: 50,
  },
  typeOfUser: {
    fontWeight: "500",
    fontSize: 18,
    lineHeight: 30,
    color: "#667085",
  },
  details: {
    justifyContent: "center",
    width: 353,
    height: 60,
    backgroundColor: "#E4E7EC",
    borderRadius: 5,
    margin: 5,
    padding: 14,
  },
  detailsTitle: {
    fontWeight: "500",
    fontSize: 14,
    color: "#667085",
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
  button: {
    width: 174,
    height: 58,
    backgroundColor: "#101828",
    borderRadius: 5,
    margin: 5,
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "500",
    fontSize: 12,
    marginTop: 1,
    color: "#F2F4F7",
  },
  icons: {
    textAlign: "center",
    marginTop: 5,
  },
  myIssuesTitle: {
    paddingHorizontal: 20,
    paddingTop: 15,
    fontWeight: "600",
    fontSize: 20,
    lineHeight: 50,
    color: "#101828",
  },
  categoryItem: {
    justifyContent: "center",
    width: 353,
    height: 60,
    backgroundColor: "#E4E7EC",
    borderRadius: 10,
    margin: 5,
    padding: 14,
  },
});
