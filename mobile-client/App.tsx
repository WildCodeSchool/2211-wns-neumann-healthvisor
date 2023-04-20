import { ApolloProvider } from '@apollo/client';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import PageListe from "./screens/PageListeScreen";
import AccountScreen from "./screens/AccountScreen";
import client from './gql/client';

const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Historique") {
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
        <Tab.Screen name="Historique" component={PageListe} />
        <Tab.Screen name="Mon compte" component={AccountScreen} />
      </Tab.Navigator>
    </NavigationContainer>
        <StatusBar style="auto" />
    </ApolloProvider>
  );
}
