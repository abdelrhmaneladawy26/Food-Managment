import Header from "../../../SharedModule/Components/Header/Header";
import imgHader from "../../../assets/images/eating a variety of foods-amico.svg";

export default function UsersList() {
  return (
    <div>
      <Header
        title="Users, "
        description="This is a welcoming screen for the entry of the application ,
        you can now see the options "
        name="List"
        imgHader={imgHader}
      />
    </div>
  );
}
