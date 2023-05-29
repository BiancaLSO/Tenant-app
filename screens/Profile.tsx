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
import { Feather } from "@expo/vector-icons";
import { deleteIssue, fetchUserIssues } from "../redux/issue/issueSlice";

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

  const [role, setRole] = useState(user?.role === "admin" ?? "");
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

  const handleDeleteIssue = (id: number | undefined) => {
    dispatch(deleteIssue(id));
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
  }, [userId, userIssues]);

  const renderIssueCard = (item: IssueEntity) => (
    <View key={item.id} style={styles.cardContainer}>
      <View style={styles.imageContainer}>
        {item.imageUrl ? (
          <Image source={{ uri: item.imageUrl }} style={styles.image} />
        ) : (
          <View></View>
        )}
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.h2}>{item.subject}</Text>
        <Text style={styles.text}>{item.description}</Text>
      </View>
      {role ? (
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteIssue(item.id)}
        >
          <Feather name="trash-2" size={24} color="white"></Feather>
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </View>
  );

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
          ></View>
          {userIssues ? userIssues.map(renderIssueCard) : <></>}
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
    // justifyContent: "center",
    alignItems: "center",
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
    backgroundColor: "#d7d7d7",

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
    marginTop: 20,
    paddingStart: 25,
    fontWeight: "600",
    fontSize: 20,
    lineHeight: 50,
    color: "#101828",
  },
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 25,
    marginVertical: 10,
    backgroundColor: "#d7d7d7",
    borderRadius: 10,
    padding: 10,
  },
  imageContainer: {
    marginRight: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  contentContainer: {
    flex: 1,
  },
  h2: {
    color: "#0B1F2F",
    fontSize: 25,
    fontWeight: "500",
    marginTop: 15,
  },
  text: {
    color: "#0B1F2F",
    fontSize: 17,
  },
  deleteButton: {
    backgroundColor: "#101828",
    paddingHorizontal: 12,
    borderRadius: 25,
    paddingVertical: 12,
    marginLeft: 10,
  },
  deleteButtonText: {
    color: "white",
  },
});
