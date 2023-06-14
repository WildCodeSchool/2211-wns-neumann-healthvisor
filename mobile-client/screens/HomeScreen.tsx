import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PageListe from "./PageListeScreen";
import AccountScreen from "./AccountScreen";
import Ionicons from "@expo/vector-icons/Ionicons";

const HomeScreen = ({ navigation }: any) => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "";

          if (route.name === "Pages") {
            iconName = focused ? "list" : "list-outline";
          } else if (route.name === "Mon compte") {
            iconName = focused ? "key" : "key-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "green",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Pages" component={PageListe} options={{ headerShown: false }}/>
      <Tab.Screen name="Mon compte" component={AccountScreen} options={{ headerShown: false }}/>
      {/* <StatusBar style="auto" /> */}
    </Tab.Navigator>
  );
};

export default HomeScreen;
