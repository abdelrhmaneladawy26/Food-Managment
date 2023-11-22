import Header from "../../../SharedModule/Components/Header/Header";
import imgHader from "../../../assets/images/eating a variety of foods-amico.svg";

export default function CategoriesList() {
  return (
    <div>
      <Header
        title="Categories, "
        description="You can now add your items that "
        name="Items"
        imgHader={imgHader}
      />
    </div>
  );
}
