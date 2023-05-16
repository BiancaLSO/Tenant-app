import { StyleSheet, View } from "react-native";
import { Login } from "./screens/users/login";
import { Provider } from "react-redux";
import { store } from "./store";
// import { QueryClient } from "@tanstack/react-query";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import TabNavigation from "./components/TabNavigation";
import StackNavigation from "./components/StackNavigation";
import Profile from "./screens/Profile";

// const queryClient = new QueryClient()
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackNavigation />

        {/* <TabNavigation /> */}
      </NavigationContainer>
    </Provider>
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
