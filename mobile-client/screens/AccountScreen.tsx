import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from "react-native"

const AccountScreen = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const onPressLogin = () => {
        alert("login");
    }

  return (
    <View>
        <Text>HealthVisor</Text>
        {/* <TextInput
        placeholder="Email"
        onChangeText={e => setEmail(e)}
        >
        <TextInput
        secureTextEntry
        placeholder="Mot de passe"
        onChangeText={e => setPassword(e)}
        >
        <TouchableOpacity
        onPress={onPressLogin} >
        <Text>
            Se connecter
        </Text>
        </TouchableOpacity> */}
    </View>
  )
}

export default AccountScreen;