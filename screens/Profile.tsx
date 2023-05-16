import React, { useState } from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function Profile() {
  return (
    <View style={styles.container}>
      <View style={styles.user}>
        <Image style={styles.imgProfile} source={require("../assets/Rectangle.png")} />
        <Text style={styles.name}>First Last Name</Text>
        <Text style={styles.typeOfUser}>type of user</Text>
      </View>
      <View style={styles.contact}>
        <TouchableOpacity style={styles.button}>
          <Icon name="edit" size={30} color="#F2F4F7" style={styles.icons} />
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Icon name="delete" size={30} color="#F2F4F7" style={styles.icons} />
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
      <View>
        <View style={styles.details}>
          <Text style={styles.detailsTitle}>Email</Text>
          <Text style={styles.detailsInfo}>text</Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.detailsTitle}>Phone</Text>
          <Text style={styles.detailsInfo}>text</Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.detailsTitle}>Address</Text>
          <Text style={styles.detailsInfo}>full address</Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.detailsTitle}>Period</Text>
          <Text style={styles.detailsInfo}>startdate and end date</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
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
});
