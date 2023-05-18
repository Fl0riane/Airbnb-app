import { FontAwesome } from "@expo/vector-icons";
export const displayStar = (number) => {
  const tab = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= number) {
      // si je suis à un tour inférieur ou égale à la note alors j'ajoute un étoile jaune
      tab.push(<FontAwesome name="star" size={24} color="#F8C535" key={i} />);
    } else {
      // sinon j'ajoute une étoile grise
      tab.push(<FontAwesome name="star" size={24} color="#A5A5A7" key={i} />);
    }
  }

  return tab;
};
