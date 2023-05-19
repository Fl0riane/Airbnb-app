import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import axios from "axios";

const AroundMe = ({ navigation }) => {
  const [coordinates, setCoordinates] = useState({
    latitude: 48.856614,
    longitude: 2.3522219,
  });
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    const getPermissionAndGetInfos = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      let query = "";
      if (status === "granted") {
        const { coords } = await Location.getCurrentPositionAsync();
        setCoordinates({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });
        query = `?latitude=${coords.latitude}&longitude=${coords.longitude}`;
      } else {
        alert(
          "Pour acceder à cette fonctionnalité vous devez accepter la géolocalisation, rendez-vous dans vos réglages"
        );
      }
      try {
        const { data } = await axios.get(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/around${query}`
        );

        setRooms(data);
      } catch (error) {
        console.log(error);
        alert("une erreur est survenue");
      }
    };
    getPermissionAndGetInfos();
  }, []);
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        latitudeDelta: 0.2,
        longitudeDelta: 0.2,
      }}
      showsUserLocation
    >
      {rooms.map((room) => {
        return (
          <Marker
            key={room._id}
            coordinate={{
              latitude: room.location[1],
              longitude: room.location[0],
            }}
            onPress={() => {
              navigation.navigate("RoomMap", { id: room._id });
            }}
          />
        );
      })}
    </MapView>
  );
};

export default AroundMe;
const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
