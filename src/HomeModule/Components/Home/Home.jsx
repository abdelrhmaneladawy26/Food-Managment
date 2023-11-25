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
        <div className=" container-fluid">
          <div className=" row home align-items-center  rounded-3 py-2 m-2 align-content-center">
            <div className="col-sm-8">
              <h4>Fill the Recipes !</h4>
              <p>
                you can now fill the meals easily using the table and form ,
                click here and sill it with the table !
              </p>
            </div>
            <div className="col-sm-4 text-end">
              <button className="btn px-3 btn-success">
                Fill Recipes <i className=" fa-solid fa-arrow-right"></i>{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
