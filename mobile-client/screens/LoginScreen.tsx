import React, { useEffect, useRef } from "react";
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import {
  useLoginUserMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../gql/generated/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { registerForPushNotificationsAsync } from "../utils/notifications";

interface FormData {
  email: string;
  password: string;
}

const schema = yup
  .object({
    email: yup
      .string()
      .required("L'email est requis")
      .email("L'email n'est pas valide."),
    password: yup
      .string()
      .required("Le mot de passe est requis")
      .min(8, "Doit comporter au moins 8 caractères"),
  })
  .required();

const LoginScreen = ({ navigation }: any) => {
  const emailInput = useRef<TextInput>(null);
  const passwordInput = useRef<TextInput>(null);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const [loginUser] = useLoginUserMutation();
  const [updateProfile] = useUpdateProfileMutation();
  const { data: currentUser, client } = useGetProfileQuery({
    errorPolicy: "ignore",
  });

  useEffect(() => {
    registerForPushNotificationsAsync().then((expoNotificationToken) => {
      if (expoNotificationToken) {
        updateProfile({ variables: { data: { expoNotificationToken } } });
      }
    });
  }, [currentUser?.profile.id]);

  const onSubmit = async ({ email, password }: FormData) => {
    try {
      await loginUser({ variables: { data: { email, password } } });
      client.resetStore();
      navigation.navigate("Home");
      reset();
    } catch (error) {
      alert(`Une erreur est survenue :\n ${error}`);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.root}>
        <SafeAreaView style={styles.safeAreaView}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.content}
          >
            <View style={styles.logo}>
              <Image
                source={require("../assets/logo.png")}
                style={{ width: 200, height: 100 }}
              />
            </View>
            {/* <Image source={{uri: 'asset:/logo.png'}} style={{width: 100, height: 100}} /> */}
            <Text style={styles.title}>Bienvenue!</Text>

            <Text style={styles.subtitle}>Connectez-vous:</Text>

            <Pressable onPress={() => emailInput.current?.focus()}>
              <View style={styles.form}>
                <Text style={styles.label}>Email</Text>

                <Controller
                  control={control}
                  name="email"
                  render={({ field: { onChange, onBlur, value } }: any) => (
                    <TextInput
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect={false}
                      keyboardType="email-address"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      onSubmitEditing={() => passwordInput.current?.focus()}
                      ref={emailInput}
                      returnKeyType="next"
                      style={styles.textInput}
                      textContentType="username"
                      value={value}
                    />
                  )}
                />
              </View>
              {errors.password && <Text>{errors.email?.message}</Text>}
            </Pressable>

            <Pressable onPress={() => passwordInput.current?.focus()}>
              <View style={styles.form}>
                <Text style={styles.label}>Mot de passe</Text>

                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, onBlur, value } }: any) => (
                    <TextInput
                      autoCapitalize="none"
                      autoComplete="password"
                      autoCorrect={false}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      onSubmitEditing={() => onSubmit}
                      ref={passwordInput}
                      returnKeyType="done"
                      secureTextEntry
                      style={styles.textInput}
                      textContentType="password"
                      value={value}
                    />
                  )}
                />
              </View>
              {errors.password && <Text>{errors.password?.message}</Text>}
            </Pressable>

            <TouchableOpacity onPress={() => alert("mdp oublié")}>
              <View style={styles.forgotPasswordContainer}>
                <Text style={styles.textButton}>Mot de passe oublié?</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleSubmit(onSubmit)}>
              <View style={styles.button}>
                <Text style={styles.buttonTitle}>Connexion</Text>
              </View>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#092033",
    borderRadius: 8,
    height: 48,
    justifyContent: "center",
  },
  buttonTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "600",
    lineHeight: 22,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 32,
    gap: 10,
  },
  forgotPasswordContainer: {
    alignItems: "flex-end",
  },
  form: {
    alignItems: "center",
    backgroundColor: "#EAEFF1",
    borderRadius: 8,
    flexDirection: "row",
    height: 48,
    paddingHorizontal: 16,
  },
  label: {
    color: "#0E2E49",
    fontSize: 15,
    fontWeight: "400",
    lineHeight: 20,
    width: 100,
  },
  root: {
    backgroundColor: "#009BE5",
    flex: 1,
  },
  safeAreaView: {
    flex: 1,
  },
  subtitle: {
    color: "#EAEFF1",
    fontSize: 17,
    fontWeight: "400",
    lineHeight: 22,
  },
  textButton: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "400",
    lineHeight: 20,
  },
  textInput: {
    color: "#000000",
    flex: 1,
  },
  title: {
    color: "#0E2E49",
    fontSize: 28,
    fontWeight: "700",
    lineHeight: 34,
  },
  logo: {
    alignItems: "center",
  },
});

export default LoginScreen;
