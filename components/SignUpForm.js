import { Text, TextInput, StyleSheet, View, Button } from "react-native";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
const SignUpForm = ({
  username,
  email,
  password,
  description,
  setToken,
  TouchableOpacity,
}) => {
  const [errorMessage, setErrormessage] = useState("");
  const navigation = useNavigation();
  return (
    <View
      style={styles.container}
      onSubmit={async (event) => {
        event.preventDefault();
        setErrormessage("");
        try {
          const response = await axios.post(
            "https://site--back-end-marvel--p2d7k4xwpzzq.code.run/user/signup",
            {
              email: email,
              username: username,
              firstname: firstname,
              password: password,
              newsletter: true,
            }
          );
          console.log(response.data);
          if (response.data.token) {
            handleUserData(response.data.token);
            navigate("/");
          }
          console.log(response.data);
        } catch (error) {
          console.log(error.message);
          console.log(error.response.data);

          if (error.response.status === 409) {
            setErrormessage("Cette adresse email est déjà utilisée");
          } else if (error.response.data.message === "Missing parameters") {
            setErrormessage("Veuillez remplir tous les champs");
          }
        }
      }}
    >
      <View>
        <KeyboardAwareScrollView>
          <TextInput
            placeholder="email"
            onChangeText={(text) => {
              setEmail(text);
            }}
            value={email}
          />
          <TextInput
            placeholder="username"
            onChangeText={(text) => {
              setUsername(text);
            }}
            value={username}
          />
          <TextInput
            placeholder="description"
            style={styles.input}
            onChangeText={(text) => {
              setDescription(text);
            }}
            value={description}
          />

          <TextInput placeholder="Password" secureTextEntry={true} />
          <Button
            title="Sign in"
            onPress={async () => {
              const userToken = "secret-token";
              setToken(userToken);
            }}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text>Create an account</Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};
export default SignUpForm;
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  logo: {
    height: 30,
    width: 30,
  },
});
