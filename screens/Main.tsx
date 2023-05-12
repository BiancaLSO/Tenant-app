import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, TextStyle } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Info from "./Info";

export default function Main() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    console.log("Search for:", searchQuery);
    // add your search logic here
  };
  // const navigation = useNavigation();

  // const handleNavigate = () => {
  //   navigation.navigate("Info");
  // };
  return (
    <ScrollView>
      <View style={styles.container}>
        <TextInput style={styles.input} placeholder="Look for issues other people encountered" value={searchQuery} onChangeText={(text) => setSearchQuery(text)} onSubmitEditing={handleSearch} />
        <View style={styles.iconContainer}>
          <Feather name="search" size={24} color="black" style={styles.icon} onPress={handleSearch} />
        </View>
      </View>
      <ScrollView showsHorizontalScrollIndicator={false} style={styles.scrollView} horizontal={true}>
        <View style={styles.rectangleBlue}>
          <Image source={require("../assets/Vector.png")} style={styles.iconCard1} />
          <View style={styles.textGrid}>
            <View>
              <Text style={styles.text1}>Rent has to be paid in</Text>
              <Text style={styles.title1}>7 days</Text>
            </View>
            <View style={styles.button}>
              <Text style={styles.buttonText}>How to pay</Text>
            </View>
          </View>
        </View>
        <View style={styles.rectangleGrey}>
          <Image source={require("../assets/headset.png")} style={styles.iconCard2} />
          <View style={styles.textGrid}>
            <View>
              <Text style={styles.text2}>Service center closes in</Text>
              <Text style={styles.title2}>3h 45min</Text>
            </View>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Call now</Text>
            </View>
          </View>
        </View>
        <View style={[styles.rectangleGrey, styles.marginRight]}>
          <Image source={require("../assets/person.png")} style={styles.iconCard3} />
          <View style={styles.textGrid}>
            <View>
              <Text style={styles.text2}>Property office closes in</Text>
              <Text style={styles.title2}>5h 35min</Text>
            </View>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Call now</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.shortcutsSection}>
        <Text style={styles.title2}>Shortcuts</Text>
        <View style={styles.shortcutFlex}>
          <Image source={require("../assets/Administrativ-hjaelp.png")} style={styles.iconAdm} />
          <View style={styles.borderBottom}>
            <View>
              <Text style={styles.shorcutTitle}>Administrativ help</Text>
              <Text style={styles.text2}>Permits, Sublets, Termination...</Text>
            </View>
            <Feather name="chevron-right" style={styles.arrowRight} size={30} color="#000" />
          </View>
        </View>
        <View style={styles.shortcutFlex}>
          <Image source={require("../assets/Beboerservice.png")} style={styles.iconAdm} />
          <View style={styles.borderBottom}>
            <View>
              <Text style={styles.shorcutTitle}>Issues service</Text>
              <Text style={styles.text2}>Defects, Repairs, Improveme...</Text>
            </View>
            <Feather name="chevron-right" style={styles.arrowRight} size={30} color="#000" />
          </View>
        </View>
        <View style={styles.shortcutFlex}>
          <Image source={require("../assets/House.png")} style={styles.iconAdm} />
          <View style={styles.borderBottom}>
            <View>
              <Text style={styles.shorcutTitle}>My profile</Text>
              <Text style={styles.text2}>Personal Info, Apartment Info...</Text>
            </View>
            <Feather name="chevron-right" style={styles.arrowRight} size={30} color="#000" />
          </View>
        </View>
      </View>
      <View>
        <Text style={[styles.title2, styles.helpSection]}>Help Articles</Text>
        <ScrollView showsHorizontalScrollIndicator={false} style={[styles.scrollView, styles.marginBottom]} horizontal={true}>
          <View>
            <Image source={require("../assets/building.png")} style={styles.helpImg} />
            <Text style={styles.articleTitle}>Can I rent with a dog?</Text>
          </View>
          <View>
            <Image source={require("../assets/garden.png")} style={styles.helpImg} />
            <Text style={styles.articleTitle}>What common areas do I have?</Text>
          </View>
          <View>
            <Image source={require("../assets/livingroom.png")} style={[styles.helpImg, styles.marginRight]} />
            <Text style={styles.articleTitle}>Community and activities.</Text>
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    paddingHorizontal: 15,
    flexGrow: 0,
  },
  rectangleBlue: {
    width: 340,
    height: 300,
    backgroundColor: "#0B1F2F",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "space-between",
    margin: 5,
    paddingVertical: 25,
  },

  rectangleGrey: {
    width: 340,
    height: 300,
    backgroundColor: "#B0C2DA",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "space-between",
    margin: 5,
    paddingVertical: 25,
  },
  marginRight: {
    marginRight: 35,
  },
  marginBottom: {
    marginBottom: 25,
  },
  textGrid: {
    width: "48%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    columnGap: 15,
  },
  title1: {
    color: "white",
    fontSize: 30,
    marginBottom: 10,
  },
  title2: {
    color: "#0B1F2F",
    fontSize: 30,
    marginBottom: 10,
  },
  shorcutTitle: {
    color: "#0B1F2F",
    fontSize: 20,
    fontWeight: "700",
  },
  text1: {
    color: "white",
    fontSize: 15,
    marginBottom: 10,
  },
  text2: {
    color: "#0B1F2F",
    fontSize: 15,
    marginBottom: 10,
  },

  button: {
    backgroundColor: "#A5ED7B",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#0B1F2F",
    fontSize: 16,
    fontWeight: "bold",
  },
  container: {
    marginTop: 50,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E0E0E0",
    borderWidth: 2,
    borderColor: "#C4C4C4",
    borderRadius: 25,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  input: {
    flex: 1,
    fontSize: 18,
    marginLeft: 10,
  },
  icon: {
    marginLeft: 10,
  },
  iconContainer: {
    backgroundColor: "#A5ED7B",
    paddingRight: 10,
    paddingVertical: 10,
    borderRadius: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  iconCard1: {
    alignSelf: "flex-start",
    width: 45,
    height: 35,
    marginHorizontal: 30,
    marginVertical: 20,
  },
  iconCard2: {
    alignSelf: "flex-start",
    width: 45,
    height: 42,
    marginHorizontal: 30,
    marginVertical: 20,
  },
  iconCard3: {
    alignSelf: "flex-start",
    width: 35,
    height: 40,
    marginHorizontal: 30,
    marginVertical: 20,
  },
  iconAdm: {
    alignSelf: "flex-start",
    width: 25,
    height: 25,
    marginRight: 15,
  },
  arrowRight: {
    marginLeft: 50,
  },
  shortcutsSection: {
    margin: 25,
  },
  shortcutFlex: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginVertical: 5,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  helpSection: {
    marginHorizontal: 25,
  },
  helpImg: {
    height: 375,
    width: 311,
    marginRight: 5,
    marginLeft: 5,
  },
  articleTitle: {
    color: "#0B1F2F",
    fontSize: 18,
    fontWeight: "700",
    marginVertical: 10,
    marginLeft: 10,
  },
});
