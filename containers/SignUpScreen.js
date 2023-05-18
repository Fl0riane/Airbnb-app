import {
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import axios from "axios";

export default function SignUpScreen({ setToken }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [description, setDescription] = useState("");
  const navigation = useNavigation();
  const [errorMessage, setErrormessage] = useState("");

  const submit = async () => {
    if (password === confirmPassword) {
      if (email && username && description && password && confirmPassword) {
        // console.log({ email, description, password, username });
        setErrormessage("");
        try {
          const { data } = await axios.post(
            "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/sign_up",
            {
              email,
              username,
              description,
              password,
            }
          );
          alert("compte créé");
          console.log(data);
          setToken(data.token);
        } catch (error) {
          console.log(error.response);
          setErrormessage("La crétation a échouée");
        }
      } else {
        setErrormessage("Veuillez remplir tous les champs");
      }
    } else {
      setErrormessage("mots de passe différents");
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.contentContainer}
      style={styles.container}
    >
      <Image style={styles.logo} source={require("../assets/AirbnbLogo.png")} />
      <Text style={styles.h1}>Sign up</Text>
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
        placeholder="Username"
        style={styles.input}
        onChangeText={(text) => {
          setErrormessage("");
          setUsername(text);
        }}
        value={username}
      />
      <TextInput
        multiline={true}
        numberOfLines={4}
        placeholder="Describe yourself in few words..."
        style={styles.textarea}
        onChangeText={(text) => {
          setErrormessage("");
          setDescription(text);
        }}
        value={description}
      />

      <TextInput
        placeholder="Password"
        // secureTextEntry={true}
        style={styles.input}
        onChangeText={(text) => {
          setErrormessage("");
          setPassword(text);
        }}
        value={password}
      />
      <TextInput
        placeholder="Confirm Password"
        style={styles.input}
        onChangeText={(text) => {
          setErrormessage("");
          setConfirmPassword(text);
        }}
        value={confirmPassword}
      />

      <TouchableOpacity style={styles.btn} title="Sign up" onPress={submit}>
        <Text style={styles.h2}>Sign up</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("SignIn");
        }}
      >
        <Text style={styles.p}>Already have an account? Sign in</Text>
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
