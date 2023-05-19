import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, TextStyle, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { infoEntity } from "../redux/info/infoEntity";
import { fetchAllInfo } from "../redux/info/infoSlice";
import { CategoryEntity } from "../redux/category/categoryEntity";
import { fetchAllCategories } from "../redux/category/categorySlice";
import { IssueEntity } from "../redux/issue/issueEntity";
import { fetchUserIssues } from "../redux/issue/issueSlice";

export default function Confirmation() {
  //   const categories: CategoryEntity[] = useSelector((state: RootState) => state.category.categories);
  //   const userIssues: IssueEntity[] = useSelector((state: RootState) => state.issue.userIssues);

  //   const dispatch = useDispatch<AppDispatch>();

  //   useEffect(() => {
  //     dispatch(fetchAllCategories());
  //     dispatch(fetchUserIssues());
  //   }, []);
  //   useEffect(() => {
  //     console.log(userIssues);
  //   }, [userIssues]);

  return (
    <ScrollView style={styles.rootContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.h1}>Confirmation</Text>
          <Text style={styles.text}>You have succesfully submitted you issue. We will get back at you</Text>
        </View>
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
});
