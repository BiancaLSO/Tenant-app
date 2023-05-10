import { StyleSheet, View } from "react-native";
import { Login } from "./screens/users/login";
import { Provider } from "react-redux";
import { store } from './store'
// import { QueryClient } from "@tanstack/react-query";


// const queryClient = new QueryClient()
export default function App() {
  return (

      <View style={styles.container}>
        {/* <QueryClientProvider client={queryClient}> */}
        <Provider store={store}>
        <View style={styles.container}>
        <Login></Login>
        </View>
        </Provider>
        {/* </QueryClientProvider> */}
      </View>

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
