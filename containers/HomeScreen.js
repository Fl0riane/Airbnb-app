// import { useNavigation } from "@react-navigation/core";
import { Text, View, FlatList, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { ActivityIndicator } from "react-native-paper";
import Room from "../components/Room";

export default function HomeScreen() {
  const [isLoading, setIsloading] = useState(true);
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms"
        );

        setRooms(response.data);
        const data = response.data;
        setIsloading(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, []);
  return isLoading ? (
    <ActivityIndicator size="large" />
  ) : (
    <View style={styles.container}>
      <FlatList
        data={rooms}
        keyExtractor={(room) => room._id}
        renderItem={({ item }) => {
          return <Room item={item} />;
        }}
        ItemSeparatorComponent={() => <Text style={styles.line}></Text>}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    marginTop: 10,
    paddingHorizontal: 10,
  },
  line: {
    backgroundColor: "#A5A5A7",
    height: 1,
    marginVertical: 10,
  },
});
