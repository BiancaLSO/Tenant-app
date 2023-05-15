import { StyleSheet, View } from "react-native";
import { Login } from "./screens/users/login";
import { Provider } from "react-redux";
import { store } from "./store";
// import { QueryClient } from "@tanstack/react-query";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import TabNavigation from "./components/TabNavigation";

// const queryClient = new QueryClient()
export default function App() {
  return (
    // <View style={styles.container}>
    //   {/* <QueryClientProvider client={queryClient}> */}
    //   <Provider store={store}>
    //   <View style={styles.container}>
    //   <Login></Login>
    //   </View>
    //   </Provider>
    //   {/* </QueryClientProvider> */}
    // </View>
    // <View style={styles.container}>
    <Provider store={store}>
      <NavigationContainer>
        <TabNavigation></TabNavigation>
        {/* <View style={styles.container}>
        <Text>Hello</Text>
      </View> */}
      </NavigationContainer>
    </Provider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
