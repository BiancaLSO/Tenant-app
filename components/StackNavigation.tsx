import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Main from "../screens/Main";
import Info from "../screens/Info";
import CreateInfo from "../screens/CreateInfo";

// After we merge, you can add here the screens which
// will contian stack navigation such as SignUp or LogIn

// export type StackMain = {
//   Bookings: undefined;
//   Edit: { booking: BookingEntity };
//   Delete: { booking: BookingEntity };
// };

const Stack = createNativeStackNavigator();

export default function StackNavigation() {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen 
      name="Signup" 
       component={Signup} 
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ title: "Log in into your account" }}
      /> */}
      <Stack.Screen name="Main" component={Main} options={{ title: "Welcome to the main screen" }} />
      <Stack.Screen name="Info" component={Info} options={{ title: "Welcome to the info screen" }} />
    </Stack.Navigator>
  );
}
