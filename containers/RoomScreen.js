import { useRoute } from "@react-navigation/native";
import { Text, View, StyleSheet, ImageBackground, Image } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { displayStar } from "../utils/displayStar";
import { MapView, Marker } from "react-native-maps";

export default function RoomScreen() {
  const [isLoading, setIsloading] = useState(true);
  const { params } = useRoute();
  const [data, setData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/${params.id}`
        );

        setData(response.data);
        setIsloading(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, []);

  return isLoading ? (
    <Text>is Loading</Text>
  ) : (
    <View>
      <ImageBackground
        source={{ uri: data.photos[0].url }}
        style={styles.blocImg}
      >
        <Text style={styles.price}>{data.price}€</Text>
      </ImageBackground>
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.col}>
            <Text numberOfLines={1} style={styles.h2}>
              {data.title}
            </Text>
            <View style={styles.star}>
              {displayStar(data.ratingValue)}
              <Text style={styles.h3}>{data.reviews} reviews</Text>
            </View>
          </View>
          <View>
            <Image
              source={{ uri: data.user.account.photo.url }}
              style={styles.avatar}
            ></Image>
          </View>
        </View>
        <Text numberOfLines={3} style={styles.description}>
          {data.description}
        </Text>
      </View>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 48.856614,
          longitude: 2.3522219,
          latitudeDelta: 0.2,
          longitudeDelta: 0.2,
        }}
        showsUserLocation
      >
        <Marker
          key={data._id}
          coordinate={{
            latitude: data.location[1],
            longitude: data.location[0],
          }}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",

    paddingHorizontal: 10,
  },

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
    paddingBottom: 10,
    fontSize: 18,
    fontWeight: "bold",
    width: "100%",
  },
  col: {
    width: "70%",
  },
  row: {
    width: "100%",
    paddingTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },

  star: { flexDirection: "row", gap: 10, alignItems: "center" },
  avatar: {
    borderRadius: 50,
    width: 60,
    height: 60,
    resizeMode: "cover",
  },

  h3: {
    color: "#A5A5A7",
  },

  description: {
    padding: 15,
  },
  map: {
    flex: 1,
  },
});
