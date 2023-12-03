import { useEffect, useState } from "react";
import Header from "../../../SharedModule/Components/Header/Header";
import NoData from "../../../SharedModule/Components/NoData/NoData";
import imgHader from "../../../assets/images/eating a variety of foods-amico.svg";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import deletImage from "../../../assets/images/NoData.svg";

export default function RecipesList() {
  const [recipesList, setrecipesList] = useState([]);
  const [ModalState, setModalState] = useState("close");
  const [itemId, setItemId] = useState(0);
  const [tagsList, setTagsList] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [recipe, setRecipe] = useState([]);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const handleShow = () => setModalState("close");

  const getAllRecipes = () => {
    axios
      .get(
        "https://upskilling-egypt.com:443/api/v1/Recipe/?pageSize=4&pageNumber=1",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      )
      .then((res) => {
        setrecipesList(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const addRecipe = (data) => {
    const addFormData = new FormData();
    addFormData.append("name", data["name"]);
    addFormData.append("description", data["description"]);
    addFormData.append("price", data["price"]);
    addFormData.append("tagId", data["tagId"]);
    addFormData.append("recipeImage", data["recipeImage"][0]);
    addFormData.append("categoriesIds", data["categoriesIds"]);
    axios
      .post("https://upskilling-egypt.com/api/v1/Recipe/", addFormData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })
      .then(() => {
        toast.success("Added Recipe successfully ");
        getAllRecipes();
        handleShow();
        setValue("name", null);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
    console.log(data);
  };
  const deleteRecipe = () => {
    axios
      .delete(`https://upskilling-egypt.com/api/v1/Recipe/${itemId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })
      .then(() => {
        toast.success("Deleted Recipe  successfully");
        handleShow();
        getAllRecipes();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  const upDateRecipe = (data) => {
    axios
      .put(`https://upskilling-egypt.com/api/v1/Recipe/${itemId}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })
      .then(() => {
        getAllRecipes();
        handleShow();
        toast.success("Update Recipe successfully");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const getAllTags = () => {
    axios
      .get("https://upskilling-egypt.com:443/api/v1/tag", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })
      .then((res) => {
        setTagsList(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getAllCategories = () => {
    axios
      .get("https://upskilling-egypt.com:443/api/v1/Category/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })
      .then((response) => {
        setAllCategories(response);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  useEffect(() => {
    getAllRecipes();
  }, []);

  const showAddModal = () => {
    setModalState("show-Add-Modal");
    getAllTags();
    getAllCategories();
  };
  const showDeleteModal = (id) => {
    setModalState("show-Delete-Modal");
    setItemId(id);
  };
  const showUpdateModal = (recipe) => {
    setModalState("show-upDate-Modal");
    getAllTags();
    getAllCategories();
    setValue("name", recipe.name);
    setValue("description", recipe.description);
    setValue("price", recipe.price);
    setValue("price", recipe.price);
    setValue("tagId", recipe.tag.id);
    setValue("categoriesIds", recipe.category[0].id);
    setItemId(recipe.id);
    setRecipe(recipe);
  };
  return (
    <div>
      <Modal show={ModalState === "show-Add-Modal"} onHide={handleShow}>
        <Modal.Body className="px-5">
          <h3>Add New Recipe</h3>
          <form onSubmit={handleSubmit(addRecipe)}>
            <div className="form-group">
              <input
                className="form-control my-3 bg-light p-3"
                type="text"
                placeholder="Category Name "
                {...register("name", { required: true })}
              />
              {errors.name && errors.name.type === "required" && (
                <p className="text-danger">Recipe name is required.</p>
              )}
            </div>
            <div className="form-group">
              <input
                className="form-control my-3 bg-light p-3"
                type="number"
                placeholder="Recipe Price "
                {...register("price", { required: true, valueAsNumber: true })}
              />
              {errors.name && errors.name.type === "required" && (
                <p className="text-danger">Recipe price is required.</p>
              )}
            </div>
            <div className="form-group">
              <textarea
                className="form-control"
                placeholder="Description"
                {...register("description", { required: true })}
              ></textarea>
              {errors.description && errors.description.type === "required" && (
                <p className="text-danger">Recipe description is required.</p>
              )}
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col">
                  <select
                    {...register("tagId", {
                      required: true,
                      valueAsNumber: true,
                    })}
                    className="form-control my-3 bg-light p-3"
                  >
                    {tagsList.data?.map((tag) => (
                      <option key={tag.id} value={tag.id}>
                        {tag.name}
                      </option>
                    ))}
                  </select>
                  {errors.tagId && errors.tagId.type === "required" && (
                    <p className="text-danger">Recipe Tag is required.</p>
                  )}
                </div>
                <div className="col">
                  <select
                    {...register("categoriesIds", {
                      valueAsNumber: true,
                    })}
                    className="form-control my-3 bg-light p-3"
                  >
                    {allCategories.data?.data.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="form-group">
              <input
                className="form-control my-3 bg-light p-3"
                type="file"
                {...register("recipeImage")}
              />
            </div>
            <div className="">
              <button className="btn btn-success w-100 ">Add New Recipe</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      <Modal show={ModalState === "show-Delete-Modal"} onHide={handleShow}>
        <Modal.Body className="px-5">
          <div className="text-center">
            <img src={deletImage} alt="delete image" />
          </div>
          <div className="text-center my-3 ">
            <h3>Delete This Recipe ?</h3>
            <p>
              are you sure you want to delete this item ? if you are sure just
              click on delete it .
            </p>
          </div>
          <div className="text-end ">
            <button
              className="btn btn-outline-danger"
              onClickCapture={deleteRecipe}
            >
              Delete this item
            </button>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={ModalState === "show-upDate-Modal"} onHide={handleShow}>
        <Modal.Body className="px-5">
          <h3>Update Recipe</h3>
          <form onSubmit={handleSubmit(upDateRecipe)}>
            <div className="form-group">
              <input
                className="form-control my-3 bg-light p-3"
                type="text"
                placeholder="Category Name "
                {...register("name", { required: true })}
              />
              {errors.name && errors.name.type === "required" && (
                <p className="text-danger">Recipe name is required.</p>
              )}
            </div>
            <div className="form-group">
              <input
                className="form-control my-3 bg-light p-3"
                type="number"
                placeholder="Recipe Price "
                {...register("price", { required: true, valueAsNumber: true })}
              />
              {errors.name && errors.name.type === "required" && (
                <p className="text-danger">Recipe price is required.</p>
              )}
            </div>
            <div className="form-group">
              <textarea
                className="form-control"
                placeholder="Description"
                {...register("description", { required: true })}
              ></textarea>
              {errors.description && errors.description.type === "required" && (
                <p className="text-danger">Recipe description is required.</p>
              )}
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col">
                  <select
                    {...register("tagId", {
                      required: true,
                      valueAsNumber: true,
                    })}
                    className="form-control my-3 bg-light p-3"
                  >
                    {tagsList.data?.map((tag) => (
                      <option key={tag.id} value={tag.id}>
                        {tag.name}
                      </option>
                    ))}
                  </select>
                  {errors.tagId && errors.tagId.type === "required" && (
                    <p className="text-danger">Recipe Tag is required.</p>
                  )}
                </div>
                <div className="col">
                  <select
                    {...register("categoriesIds", {
                      valueAsNumber: true,
                    })}
                    className="form-control my-3 bg-light p-3"
                  >
                    {allCategories.data?.data.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="form-group">
              <input
                className="form-control my-3 bg-light p-3"
                type="file"
                {...register("recipeImage")}
              />
              <img
                src={`https://upskilling-egypt.com/` + recipe?.imagePath}
                alt="imagePath"
                width="100px"
              />
            </div>
            <div className="">
              <button className="btn btn-success w-100 ">Save</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      <Header
        title="Recipes, "
        description="You can now add your items that any user can order it from the
        Application and you can edit "
        name="Items"
        imgHader={imgHader}
      />
      <div className="container">
        <div className="row align-items-center justify-content-between w-100 ">
          <div className="col-md-8">
            <h4>Recipe Table Details</h4>
            <span>You can check all details</span>
          </div>
          <div className="col-md-4 text-end">
            <button className="btn btn-success" onClick={showAddModal}>
              Add New Item
            </button>
          </div>
        </div>
      </div>
      <div className="container my-3">
        {" "}
        {recipesList.length > 0 ? (
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Item Name</th>
                <th scope="col">Image</th>
                <th scope="col">Price</th>
                <th scope="col">Description</th>
                <th scope="col">tag</th>
                <th scope="col">Category</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {recipesList.map((recipe) => (
                <tr key={recipe.id}>
                  <td>{recipe.name}</td>
                  <td>
                    {recipe.imagePath ? (
                      <img
                        src={
                          `https://upskilling-egypt.com:443/` +
                          recipe?.imagePath
                        }
                        alt=""
                        width="70px"
                      />
                    ) : (
                      <img src={deletImage} alt="" width="70px" />
                    )}
                  </td>
                  <td>{recipe.price}</td>
                  <td>{recipe.description}</td>
                  <td>{recipe.tag.name}</td>
                  <td>{recipe.category.map((item) => item.name)}</td>

                  <td className="">
                    <div
                      className="fa fa-edit fa-2x mx-2 text-warning"
                      onClick={() => {
                        showUpdateModal(recipe);
                      }}
                    ></div>
                    <div
                      className="fa fa-trash fa-2x text-danger"
                      onClick={() => {
                        showDeleteModal(recipe.id);
                      }}
                    ></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <NoData />
        )}
      </div>
    </div>
  );
}
