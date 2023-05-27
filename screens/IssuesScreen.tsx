import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { IssueEntity } from "../redux/issue/issueEntity";
import { fetchAllIssues, fetchSearchIssues } from "../redux/issue/issueSlice";
import { Feather } from "@expo/vector-icons";

export default function IssuesScreen() {
  const allIssues: IssueEntity[] = useSelector(
    (state: RootState) => state.issue.issues
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedIssues, setSearchedIssues] = useState<IssueEntity[]>([]);
  const filter = "this is it";
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchAllIssues());
  }, [dispatch]);

  const handleSearch = (subject: string) => {
    setSearchQuery(subject);
    const filtered = allIssues.filter((issue) =>
      issue.subject.toLowerCase().includes(subject.toLowerCase())
    );
    setSearchedIssues(filtered);
  };

  const handleFilter = (filter: string) => {
    // dispatch(setFilter(filter));
    console.log("works");
  };

  const issues = searchQuery ? searchedIssues : allIssues;
  const filterButtons = [
    "Bathroom",
    "Kitchen",
    "Parsites",
    "Heating",
    "Keys/Entrance",
    "Other",
  ];
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContentContainer}>
      <View style={styles.rootContainer}>
        {/* <Text style={styles.pageTitle}>Possible Issues</Text> */}
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Look for issues"
            value={searchQuery}
            onChangeText={handleSearch}
          />
          <View style={styles.iconContainer}>
            <Feather
              name="search"
              size={20}
              color="black"
              style={styles.icon}
              onPress={() => handleSearch(searchQuery)}
            />
          </View>
        </View>

        <ScrollView
          horizontal
          contentContainerStyle={styles.filterContainer}
          showsHorizontalScrollIndicator={false}
        >
          {filterButtons.map((filterButton, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.filterButton,
                filter === filterButton && styles.activeFilterButton,
              ]}
              onPress={() => handleFilter(filterButton)}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  filter === filterButton && styles.activeFilterButtonText,
                ]}
              >
                {filterButton}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        {issues.map((item) => (
          <View key={item.id} style={styles.cardContainer}>
            <View style={styles.imageContainer}>
              {item.imageUrl ? (
                <Image source={{ uri: item.imageUrl }} style={styles.image} />
              ) : (
                <Text>No Image</Text>
              )}
            </View>
            <View style={styles.contentContainer}>
              <Text style={styles.h2}>{item.subject}</Text>
              <Text style={styles.text}>{item.description}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
const screen = Dimensions.get("window");
const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollViewContentContainer: {
    flexGrow: 1,
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
    flexGrow: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 10,
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
});
