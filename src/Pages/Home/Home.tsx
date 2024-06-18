import CoverSection from "../../Components/CoverSection/CoverSection";

import Footer from "../../Components/Footer/Footer";

import DetailHomePages from "../DetailHomePages/DetailHomePages";
import RecommendHome from "../RecommendHome/RecommendHome";
import MostViewsDeatil from "../MostViewsDeatil/MostViewsDeatil";

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
