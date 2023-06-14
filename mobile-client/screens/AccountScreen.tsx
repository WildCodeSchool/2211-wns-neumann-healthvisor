import React from "react";
import { Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  useGetProfileQuery,
  useLogoutUserMutation,
} from "../gql/generated/schema";

const AccountScreen = ({ navigation }: any) => {
  const [logoutUser] = useLogoutUserMutation();
  const { data: currentUser, client } = useGetProfileQuery({
    errorPolicy: "ignore",
  });

  const logout = async () => {
    await logoutUser();
    client.resetStore();
    navigation.navigate("Login");
  };
  return (
    <SafeAreaView>
      <View>
        <Text>AccountScreen</Text>
        <Text>
            { currentUser && 
            `
            Role: ${currentUser.profile.role}
            Email: ${currentUser.profile.email}            
            `
            }
        </Text>
        <Button title="Deconnexion" onPress={() => logout()} />
      </View>
    </SafeAreaView>
  );
};

export default AccountScreen;
