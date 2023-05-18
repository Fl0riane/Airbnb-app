import { useRoute } from "@react-navigation/native";
import { Text, View, StyleSheet, ImageBackground } from "react-native";
import { useEffect } from "react";
import axios from "axios";
import { response } from "express";

export default function RoomScreen() {
  const { params } = useRoute();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/${params.id}`
        );

        // console.log(data);
        const data = response.data;
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {/* <ImageBackground
        // source={{ uri: data.photos[0].url }}
        style={styles.blocImg}
      ></ImageBackground> */}
      <Text>user id : {params.id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  blocImg: {
    width: "100%",
    height: 200,
    justifyContent: "flex-end",
    paddingBottom: 30,
  },
  price: {
    color: "white",
    backgroundColor: "black",
    width: 80,
    paddingVertical: 10,
    paddingLeft: 10,
  },
  h2: {
    paddingVertical: 10,
    fontSize: 18,
    fontWeight: "bold",
    width: "80%",
  },

  star: { flexDirection: "row", gap: 10, alignItems: "center" },

  h3: {
    color: "grey",
  },
});
