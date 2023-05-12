import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import TabNavigation from "./components/TabNavigation";
import Profile from "./screens/Profile";

export default function App() {
  return (
    <NavigationContainer>
      {/* <TabNavigation></TabNavigation> */}
      <View style={styles.container}>
        <Profile />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
