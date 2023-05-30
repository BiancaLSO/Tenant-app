import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TextInput, Dimensions, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { IssueEntity } from "../redux/issue/issueEntity";
import { fetchAllIssues, fetchFilteredIssues } from "../redux/issue/issueSlice";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@react-navigation/native";
import { deleteIssue } from "../redux/issue/issueSlice";
import { UsersEntity } from "../redux/users/usersEntity";
import { fetchUserData } from "../redux/users/usersSlice";

type RootStackParamList = {
  ChooseCategory: undefined;
};
type MainProps = {
  navigation: NavigationProp<RootStackParamList, "ChooseCategory">;
};

export default function IssuesScreen({ navigation }: MainProps) {
  const [role, setRole] = useState<string | undefined>();
  const allIssues: IssueEntity[] = useSelector((state: RootState) => state.issue.issues);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedIssues, setSearchedIssues] = useState<IssueEntity[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const filteredIssues = useSelector((state: RootState) => state.issue.filteredIssues);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchAllIssues());
  }, [dispatch]);

  useEffect(() => {
    if (selectedCategory !== null) {
      dispatch(fetchFilteredIssues(selectedCategory));
    }
  }, [dispatch, selectedCategory]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userFromProfile = await dispatch(fetchUserData());
        setRole(userFromProfile.payload.role);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (subject: string) => {
    setSearchQuery(subject);
    const filtered = allIssues.filter((issue) => issue.subject.toLowerCase().includes(subject.toLowerCase()));
    setSearchedIssues(filtered);
  };

  const handleFilter = (category: string) => {
    setSelectedCategory(category === "All" ? null : category);
  };

  const handleCreateIssue = () => {
    navigation.navigate("ChooseCategory");
  };

  const handleDeleteIssue = (id: number | undefined) => {
    dispatch(deleteIssue(id));
  };

  useEffect(() => {
    dispatch(fetchAllIssues());
  }, [allIssues]);

  const renderIssueCard = (item: IssueEntity) => (
    <View key={item.id} style={styles.cardContainer}>
      <View style={styles.imageContainer}>{item.imageUrl ? <Image source={{ uri: item.imageUrl }} style={styles.image} /> : <View></View>}</View>
      <View style={styles.contentContainer}>
        <Text style={styles.h2}>{item.subject}</Text>
        <Text style={styles.text}>{item.description}</Text>
      </View>
      {role === "admin" ? (
        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteIssue(item.id)}>
          <Feather name="trash-2" size={24} color="white"></Feather>
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </View>
  );

  const issues = searchQuery ? searchedIssues : selectedCategory ? filteredIssues : allIssues;

  const categoryMapping: { [key: string]: string | null } = {
    All: null,
    Kitchen: "Kitchen",
    Bathroom: "Bathroom",
    Parasites: "Parasites",
    Heating: "Heating",
    "Keys/Entrance": "Keys/Entrance",
    Other: "Other",
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.scrollViewContentContainer}>
        <View style={styles.rootContainer}>
          <View style={styles.container}>
            <TextInput style={styles.input} placeholder="Search for issues" value={searchQuery} onChangeText={handleSearch} />
            <View style={styles.iconContainer}>
              <Feather name="search" size={20} color="black" style={styles.icon} onPress={() => handleSearch(searchQuery)} />
            </View>
          </View>

          <ScrollView horizontal contentContainerStyle={styles.filterContainer} showsHorizontalScrollIndicator={false}>
            {Object.keys(categoryMapping).map((category, index) => {
              const isActive = (category === "All" && selectedCategory === null) || category === selectedCategory;
              return (
                <TouchableOpacity key={index} style={[styles.filterButton, isActive && styles.activeFilterButton]} onPress={() => handleFilter(category)}>
                  <Text style={[styles.filterButtonText, isActive && styles.activeFilterButton]}>{category}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {issues.map(renderIssueCard)}
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.createButton} onPress={handleCreateIssue}>
        <Text style={styles.createButtonText}>+</Text>
      </TouchableOpacity>
    </>
  );
}

const screen = Dimensions.get("window");
const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollViewContentContainer: {
    // flexGrow
  },
  pageTitle: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 25,
    marginVertical: 15,
    backgroundColor: "#EFEFEF",
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
  input: {
    flex: 1,
    fontSize: 18,
    marginLeft: 10,
    marginRight: 15,
    width: screen.width - 80,
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  icon: {
    marginLeft: 10,
  },
  iconContainer: {
    backgroundColor: "#A5ED7B",
    paddingRight: 10,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 5,
    marginRight: 15,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
  },
  container: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginVertical: 10,
    paddingHorizontal: 10,
    flexWrap: "wrap",
  },
  filterButton: {
    backgroundColor: "#101828",
    color: "white",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  activeFilterButton: {
    backgroundColor: "#A5ED7B",
  },
  filterButtonText: {
    fontSize: 16,
    color: "white",
  },
  activeFilterButtonText: {
    color: "white",
  },
  createButton: {
    backgroundColor: "#A5ED7B",
    position: "absolute",
    bottom: 20,
    right: 20,
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 16,
    width: 50,
    zIndex: 1, //  Set a higher z-index to bring the button forward
  },
  createButtonText: {
    color: "#101828",
    fontSize: 30,
    fontWeight: "bold",
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
