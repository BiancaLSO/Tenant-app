import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, TextStyle, TouchableOpacity, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { CategoryEntity } from "../redux/category/categoryEntity";
import { fetchAllCategories, setSelectedCategory } from "../redux/category/categorySlice";
import { IssueEntity } from "../redux/issue/issueEntity";
import { deleteIssue, fetchUserIssues } from "../redux/issue/issueSlice";
import { NavigationProp } from "@react-navigation/native";
import { UsersEntity } from "../redux/users/usersEntity";
import { fetchUserData } from "../redux/users/usersSlice";
import { Feather } from "@expo/vector-icons";

type RootStackParamList = {
  ChooseCategory: undefined;
  CreateIssue: undefined;
};

type MainProps = {
  navigation: NavigationProp<RootStackParamList, "ChooseCategory">;
};

export default function ChooseCategory({ navigation }: MainProps) {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [userId, setUserId] = useState<number | undefined>(0);
  const categories: CategoryEntity[] = useSelector((state: RootState) => state.category.categories);
  const userIssues: IssueEntity[] = useSelector((state: RootState) => state.issue.userIssues);
  const user: UsersEntity | null = useSelector((state: RootState) => state.users.user);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUserData());
    dispatch(fetchAllCategories());
  }, []);
  useEffect(() => {
    setUserId(user?.id);
  }, [user]);
  useEffect(() => {
    dispatch(fetchUserIssues(userId));
  }, [userId, userIssues]);

  const handleChooseCategory = (category: CategoryEntity) => {
    dispatch(setSelectedCategory(category));
    if (category) {
      navigation.navigate("CreateIssue");
    }
  };
  const handleDeleteIssue = (id: number | undefined) => {
    dispatch(deleteIssue(id));
  };

  const renderIssueCard = (item: IssueEntity) => (
    <View key={item.id} style={styles.cardContainer}>
      <View style={styles.imageContainer}>{item.imageUrl ? <Image source={{ uri: item.imageUrl }} style={styles.image} /> : <View></View>}</View>
      <View style={styles.contentContainer}>
        <Text style={styles.h2}>{item.subject}</Text>
        <Text style={styles.text}>{item.description}</Text>
      </View>
      <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteIssue(item.id)}>
        <Feather name="trash-2" size={24} color="white"></Feather>
      </TouchableOpacity>
    </View>
  );

  const renderContent = () => {
    if (selectedTabIndex === 0) {
      return (
        <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center", marginVertical: 10 }}>
          {categories?.map((category) => (
            <TouchableOpacity key={category.id} style={styles.categoryItem} onPress={() => handleChooseCategory(category)}>
              <Text style={styles.categoryButton}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      );
    } else if (selectedTabIndex === 1) {
      return <View style={{ display: "flex", flexDirection: "column", justifyContent: "center", marginVertical: 10 }}>{userIssues ? userIssues?.map(renderIssueCard) : <></>}</View>;
    }
  };

  return (
    <ScrollView style={styles.rootContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.h1}>Choose a category</Text>
          <Text style={styles.text}>Choose the category where the issue you have is included.</Text>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        {/* Tab Buttons */}
        <View style={styles.tabsHeader}>
          <TouchableOpacity onPress={() => setSelectedTabIndex(0)}>
            <View style={[styles.tabButton, selectedTabIndex === 0 && styles.tabButtonSelected]}>
              <Text>Category tab</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedTabIndex(1)}>
            <View style={[styles.tabButton, selectedTabIndex === 1 && styles.tabButtonSelected]}>
              <Text>My issues ({userIssues?.length})</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        {renderContent()}
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    marginHorizontal: 25,
  },
  header: {
    paddingVertical: 20,
  },
  h1: {
    color: "#0B1F2F",
    fontSize: 35,
    fontWeight: "700",
    marginBottom: 15,
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
  tabsHeader: {
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#0B1F2F",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  tabButton: {
    padding: 15,
  },
  tabButtonSelected: {
    borderBottomWidth: 5,
    borderBottomColor: "#A5ED7B",
  },
  categoryItem: {
    backgroundColor: "#F2F4F7",
    margin: 5,
    flexBasis: "40%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  categoryButton: {
    color: "#0B1F2F",
    fontSize: 20,
    fontWeight: "500",
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
  deleteButton: {
    backgroundColor: "#101828",
    paddingHorizontal: 12,
    borderRadius: 25,
    paddingVertical: 12,
    marginLeft: 10,
  },
});
