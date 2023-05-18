import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { displayStar } from "../utils/displayStar";
const Room = ({ item }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Room", { id: item._id });
      }}
    >
      <ImageBackground
        source={{ uri: item.photos[0].url }}
        style={styles.blocImg}
      >
        <Text style={styles.price}>{item.price}€</Text>
      </ImageBackground>
      <Text numberOfLines={1} style={styles.h2}>
        {item.title}
      </Text>
      <View>
        <View style={styles.star}>
          {displayStar(item.ratingValue)}
          <Text style={styles.h3}>{item.reviews} reviews</Text>
        </View>
        <View>
          <Image source={{ uri: item.user.account.photo.url }}></Image>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default Room;

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
