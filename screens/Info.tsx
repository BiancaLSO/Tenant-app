import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, TextStyle } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { infoEntity } from "../redux/info/infoEntity";
import { fetchAllInfo } from "../redux/info/infoSlice";

export default function Info() {
  const info: infoEntity[] = useSelector((state: RootState) => state.info.info);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchAllInfo());
  }, []);
  useEffect(() => {
    console.log(info);
  }, [info]);

  return (
    <View style={styles.rootContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.h1}>Help Page</Text>
          <Text style={styles.text}>On this page you can find the answers to different administration questions and helping articles. If your answer is not here please contact us by calling our office or at administration@email.com</Text>
        </View>
        {info?.map((item) => (
          <View key={item.id}>
            <Text style={styles.h2}>{item.title}</Text>
            <Text style={styles.text}>{item.info}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    margin: 25,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: "#0B1F2F",
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
});
