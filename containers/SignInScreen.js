import { useNavigation } from "@react-navigation/core";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState } from "react";
import Constants from "expo-constants";
import axios from "axios";
import {
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  View,
} from "react-native";

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrormessage] = useState("");

  const submit = async () => {
    if (email && password) {
      // console.log({ email, description, password, username });
      setErrormessage("");
      try {
        const { data } = await axios.post(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/log_in",
          {
            email,
            password,
          }
        );

        console.log(data);
      } catch (error) {
        console.log(error.response);
        setErrormessage("La connection a échouée");
      }
    } else {
      setErrormessage("Veuillez remplir tous les champs");
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.contentContainer}
      style={styles.container}
    >
      <Image style={styles.logo} source={require("../assets/AirbnbLogo.png")} />
      <Text style={styles.h1}>Sign in</Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        onChangeText={(text) => {
          setErrormessage("");
          setEmail(text);
        }}
        value={email}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        style={styles.input}
        onChangeText={(text) => {
          setErrormessage("");
          setPassword(text);
        }}
        value={password}
      />

      <TouchableOpacity
        style={styles.btn}
        title="Sign in"
        onPress={async () => {
          const userToken = "secret-token";
          setToken(userToken);
        }}
      >
        <Text style={styles.h2}>Sign in</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("SignUp");
        }}
      >
        <Text style={styles.p}>No account? register</Text>
      </TouchableOpacity>
      {errorMessage && <Text>{errorMessage}</Text>}
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-arround",
  },

  logo: {
    height: 150,
    width: 150,
    resizeMode: "contain",
    marginTop: 20,
  },
  h1: {
    fontSize: 24,
    color: "grey",
    marginBottom: 30,
    fontWeight: "bold",
  },
  h2: {
    fontSize: 21,
    color: "grey",
    fontWeight: "bold",
  },

  p: { marginBottom: 20, color: "grey" },
  textarea: {
    width: "80%",
    paddingLeft: 8,
    height: 100,
    borderWidth: 1,
    borderColor: "#EA5860",
    marginBottom: 30,
  },
  input: {
    width: "80%",
    borderBottomWidth: 1,
    borderColor: "#EA5860",
    marginBottom: 30,
  },
  btn: {
    marginTop: 30,
    borderRadius: 30,
    paddingHorizontal: 80,
    paddingVertical: 15,
    color: "red",
    borderWidth: 3,
    borderColor: "#EA5860",
    marginBottom: 20,
  },
});
