import { createDrawerNavigator } from "@react-navigation/drawer";
import Main from "../screens/Main";
import Info from "../screens/Info";
import Profile from "../screens/Profile";
import StackNavigation from "./StackNavigation";
import { Login } from "../screens/Login";
import { Signup } from "../screens/Signup";

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={Main} />
      <Drawer.Screen name="More Information" component={Info} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Log out" component={Login} />
      <Drawer.Screen name="Sign up" component={Signup} />
    </Drawer.Navigator>
  );
}
