import { createDrawerNavigator } from "@react-navigation/drawer";
import Main from "../screens/Main";
import Info from "../screens/Info";
import Profile from "../screens/Profile";
import StackNavigation from "./StackNavigation";
import { Login } from "../screens/login";
import { Signup } from "../screens/Signup";
import CreateIssue from "../screens/ChooseCategory";
import ChooseCategory from "../screens/ChooseCategory";

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={Main} />
      <Drawer.Screen name="More Information" component={Info} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Add an issue" component={ChooseCategory} />
      <Drawer.Screen name="Login" component={Login} />
      <Drawer.Screen name="Signup" component={Signup} />
    </Drawer.Navigator>
  );
}
