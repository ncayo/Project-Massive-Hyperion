import React from "react";
import white_front from "../../../public/assets/tshirt/white/front.png";
import white_back from "../../../public/assets/tshirt/white/back.png";
import black_front from "../../../public/assets/tshirt/black/front.png";
import black_back from "../../../public/assets/tshirt/black/back.png";
import yellow_front from "../../../public/assets/tshirt/yellow/front.png";
import yellow_back from "../../../public/assets/tshirt/yellow/back.png";
import red_front from "../../../public/assets/tshirt/red/front.png";
import red_back from "../../../public/assets/tshirt/red/back.png";

export const tshirts = [
  white_front,
  white_back,
  black_front,
  black_back,
  yellow_front,
  yellow_back,
  red_front,
  red_back,
];

export default function TshirtView({ color, direction }) {
  switch (color) {
    case "black":
      if (direction === "front") {
        return <img src={black_front} alt="tshirt" />;
      }
      return <img src={black_back} alt="tshirt" />;
      break;
    case "yellow":
      if (direction === "front") {
        return <img src={yellow_front} alt="tshirt" />;
      }
      return <img src={yellow_back} alt="tshirt" />;
      break;
    case "red":
      if (direction === "front") {
        return <img src={red_front} alt="tshirt" />;
      }
      return <img src={red_back} alt="tshirt" />;
      break;
    case "whites":
      if (direction === "front") {
        return <img src={white_front} alt="tshirt" />;
      }
      return <img src={white_back} alt="tshirt" />;
    default:
      if (direction === "front") {
        return <img src={black_front} alt="tshirt" />;
      }
      return <img src={black_back} alt="tshirt" />;
  }
}
