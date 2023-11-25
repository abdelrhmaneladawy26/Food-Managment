import Header from "../../../SharedModule/Components/Header/Header";
import imgHader from "../../../assets/images/eating a variety of foods-amico.svg";

export default function RecipesList() {
  return (
    <div>
      <Header
        title="Recipes, "
        description="You can now add your items that any user can order it from the
        Application and you can edit "
        name="Items"
        imgHader={imgHader}
      />
    </div>
  );
}
