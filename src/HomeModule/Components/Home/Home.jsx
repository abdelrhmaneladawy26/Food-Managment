import Header from "../../../SharedModule/Components/Header/Header";
import imgHader from "../../../assets/images/eating vegan food-rafiki.png";

export default function Home({ name }) {
  return (
    <>
      <div>
        <Header
          title="Welcome, "
          description="You can now add your items that "
          imgHader={imgHader}
          name="Abdelrhman"
        />
      </div>
    </>
  );
}
