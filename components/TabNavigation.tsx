import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Main from "../screens/Main";
import React, { useState } from "react";
import Info from "../screens/Info";
import { infoEntity } from "./info/infoEntity";

export type TabMain = {
  Main: undefined;
};

const Tab = createBottomTabNavigator();

// De-comment after creating the InfoEntity for the Main Screen

type ContextValue = {
  info: infoEntity[];
  setInfo: React.Dispatch<React.SetStateAction<infoEntity[]>>;
};
type InfoContextType = {
  info: infoEntity[];
  setInfo: React.Dispatch<React.SetStateAction<infoEntity[]>>;
};

export const InfoContext = React.createContext<InfoContextType>({
  info: [],
  setInfo: () => {},
});

export default function TabNavigation() {
  const [info, setInfo] = useState<infoEntity[]>([]);

  return (
    <InfoContext.Provider value={{ info, setInfo }}>
      <Tab.Navigator>
        <Tab.Screen name="Main" component={Main} options={{ headerShown: false }} />
        <Tab.Screen name="Info" component={Info} options={{ headerShown: false }} />
      </Tab.Navigator>
    </InfoContext.Provider>
  );
}
