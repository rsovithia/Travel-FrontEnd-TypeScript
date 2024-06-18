import {
  Box,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from "@mui/material";
import CoverSection from "../../Components/CoverSection/CoverSection";

import Footer from "../../Components/Footer/Footer";

import DetailHomePages from "../DetailHomePages/DetailHomePages";
import RecommendHome from "../RecommendHome/RecommendHome";
import MostViewsDeatil from "../MostViewsDeatil/MostViewsDeatil";
// Mock data for cover section

// Mock data for travel recommendations
const recommendationsData = [
  {
    title: "The temples of Angkor",
    imageUrl:
      "https://lp-cms-production.imgix.net/2023-11/GettyImages-1469688108.jpg?auto=format&w=1440&h=810&fit=crop&q=75",
    description:
      "The most iconic structures here are Angkor Wat, the world’s largest religious building, and with its enigmatic collection of carved stone faces.",
  },
  {
    title: "Cambodia's Southern Islands ",
    imageUrl:
      "https://lp-cms-production.imgix.net/2023-11/GettyImages-517505902.jpg?auto=format&q=75&w=1024",
    description:
      "While the sand-sprinkled Cambodian coast may not be quite as famous as the beaches of Thailand or Indonesia.",
  },
  {
    title: "Phnom Penh",
    imageUrl:
      "https://lp-cms-production.imgix.net/2022-03/Cambodia%20Phnom%20Penh%20%C2%A9%20Cristian%20Mircea%20Balate%20shutterstock_1982536544.jpg?auto=format&q=75&w=1024",
    description:
      "The Cambodian capital is a chaotic yet charming city that has stepped out of the shadows of its war-torn past to embrace a brighter future.",
  },
  {
    title: "Siem Reap",
    imageUrl:
      "https://lp-cms-production.imgix.net/2021-11/GettyImages-514556674.jpg?auto=format&q=75&w=1024",
    description:
      "Siem Reap’s only reason for existence may be as the gateway to the temples of Angkor, but this charming town has emerged as a world-class destination in its own right,.",
  },
  {
    title: "Battambang",
    imageUrl:
      "https://lp-cms-production.imgix.net/2022-03/GettyRF_828302758.jpg?auto=format&q=75&w=1024",
    description:
      "Winding along the banks of the Sangker River, Battambang is the traditional face of urban Cambodia and one of the country’s best-preserved colonial-era towns. ",
  },
];

export default function Home() {
  return (
    <>
      <CoverSection />
      <MostViewsDeatil />
      <DetailHomePages />
      <RecommendHome />
      <Footer />
    </>
  );
}
