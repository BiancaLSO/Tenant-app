import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image, TextInput, TextStyle, TouchableOpacity } from "react-native";
import { NavigationProp, RouteProp, useRoute } from "@react-navigation/native";

type RootStackParamList = {
  Menu: undefined;
  Confirmation: { photoToDisplay?: string; imageUrl?: string; subject: string; description: string; issueId: number };
};

type ConfirmationScreenRouteProp = RouteProp<RootStackParamList, "Confirmation">;
type MainProps = {
  navigation: NavigationProp<RootStackParamList, "Confirmation">;
};

export default function Confirmation({ navigation }: MainProps) {
  const route = useRoute<ConfirmationScreenRouteProp>();
  const { photoToDisplay, imageUrl, subject, description, issueId } = route.params;
  console.log(imageUrl);
  const handleNavigate = () => {
    navigation.navigate("Menu");
  };
  return (
    <ScrollView style={styles.rootContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.h1}>Confirmation</Text>
          <Text style={styles.text}>You have succesfully submitted you issue. We will get back at you through an email as soon as possible</Text>
          <Text style={styles.h2}>Issue number {issueId} </Text>
          <Text style={styles.h2}>Subject of you issue: </Text>
          <Text style={styles.text}>{subject}</Text>
          <Text style={styles.h2}>Description of your issue:</Text>
          <Text style={styles.text}>{description}</Text>

          {photoToDisplay && imageUrl ? (
            <>
              <Text style={styles.h2}>Picture:</Text>
              <Image source={{ uri: imageUrl }} style={styles.uploadedImage} />
            </>
          ) : null}
          <TouchableOpacity onPress={handleNavigate} style={styles.button}>
            <Text style={{ color: "black", textAlign: "center", fontSize: 15 }}>Home</Text>
          </TouchableOpacity>
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
    display: "flex",
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

  uploadedImage: {
    width: 300,
    height: 600,
    marginBottom: 20,
    resizeMode: "contain",
    alignSelf: "center",
  },
  button: {
    color: "#0B1F2F",
    backgroundColor: "#A5ED7B",
    width: "40%",
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
  },
});
