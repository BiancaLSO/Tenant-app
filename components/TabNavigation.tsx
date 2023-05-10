import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Main from "../screens/Main";
import React, { useState } from "react";

export type TabMain = {
  Main: undefined;
};

const Tab = createBottomTabNavigator();

// De-comment after creating the InfoEntity for the Main Screen

// type ContextValue = {
//   info: InfoEntity[];
//   setInfo: React.Dispatch<React.SetStateAction<InfoEntity[]>>;
// };
// type InfoContextType = {
//   info: InfoEntity[];
//   setInfo: React.Dispatch<React.SetStateAction<InfoEntity[]>>;
// };

// export const InfoContext = React.createContext<InfoContextType>({
//   info: [],
//   setInfo: () => {},
// });

export default function TabNavigation() {
  //    const [info, setInfo] = useState<InfoEntity[]>([]);

  return (
    //  <InfoContext.Provider value={{info, setInfo}}>
    <Tab.Navigator>
      <Tab.Screen
        name="Main"
        component={Main}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
    //  </InfoContext.Provider>
  );
}
