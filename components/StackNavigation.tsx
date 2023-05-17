import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Main from "../screens/Main";
import Info from "../screens/Info";
import Profile from "../screens/Profile";
import { Login } from "../screens/Login";

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
      {/* * <Stack.Screen 
      name="Signup" 
       component={Signup} 
    /> */}
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Info" component={Info} />
    </Stack.Navigator>
  );
}
