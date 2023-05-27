import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Main from "../screens/Main";
import Info from "../screens/Info";
import Profile from "../screens/Profile";
import DrawerNavigation from "./DrawerNavigation";
import ChooseCategory from "../screens/ChooseCategory";
import CreateIssue from "../screens/CreateIssue";
import Confirmation from "../screens/Confirmation";
import { Login } from "../screens/login";
import { Signup } from "../screens/Signup";
import EditProfile from "../screens/EditProfile";

const Stack = createNativeStackNavigator();

export default function StackNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Menu"
        component={DrawerNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={Main}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Info" component={Info} />

      {/* Issue Creation Stack */}
      <Stack.Screen
        name="ChooseCategory"
        component={ChooseCategory}
        options={{ title: "Choose Category" }}
      />
      <Stack.Screen
        name="CreateIssue"
        component={CreateIssue}
        options={{ title: "Create the issue" }}
      />
      <Stack.Screen
        name="Confirmation"
        component={Confirmation}
        options={{ title: "Confirmation" }}
      />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
}
