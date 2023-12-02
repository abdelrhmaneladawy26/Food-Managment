import { useEffect, useState } from "react";
import Header from "../../../SharedModule/Components/Header/Header";
import imgHader from "../../../assets/images/eating a variety of foods-amico.svg";
import axios from "axios";
import NoData from "../../../SharedModule/Components/NoData/NoData";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import deletImage from "../../../assets/images/NoData.svg";

export default function CategoriesList() {
  const [categoriesList, setCategoriesList] = useState([]);
  const [itemId, setItemId] = useState(0);
  const getCategories = () => {
    axios
      .get("https://upskilling-egypt.com/api/v1/Category/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })
      .then((res) => setCategoriesList(res.data.data))
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  const deleteCategory = () => {
    axios
      .delete(`https://upskilling-egypt.com/api/v1/Category/${itemId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })
      .then(() => {
        getCategories();
        handleShow();
        toast.success("Delete Category successfully");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  const updateCategory = (data) => {
    axios
      .put(`https://upskilling-egypt.com/api/v1/Category/${itemId}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })
      .then(() => {
        getCategories();
        handleShow();
        toast.success("Update Category successfully");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setModalState("close");
  // const [show, setShow] = useState(false);
  const [ModalState, setModalState] = useState("close");

  const showAddModal = () => {
    setModalState("show-Add-Modal");
  };
  const showDeleteModal = (id) => {
    setModalState("show-Delete-Modal");
    setItemId(id);
  };
  const showUpdateModal = (categoryItem) => {
    setModalState("show-Update-Modal");
    setItemId(categoryItem.id);
    setValue("name", categoryItem.name);
  };
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    axios
      .post("https://upskilling-egypt.com/api/v1/Category/", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })
      .then((response) => {
        toast.success("Added Category successfully ");
        getCategories();
        handleShow();
        setValue("name", null);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  useEffect(() => {
    getCategories();
  }, []);
  // Modal handler

  return (
    <div>
      <Modal show={ModalState === "show-Add-Modal"} onHide={handleShow}>
        <Modal.Body className="px-5">
          <h3>Add Category</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              className="form-control my-3 bg-light p-3"
              type="text"
              placeholder="Category Name "
              {...register("name", { required: true })}
            />
            {errors.name && errors.name.type === "required" && (
              <p className="text-danger">Category name is required.</p>
            )}
            <div className="">
              <button className="btn btn-success w-100 ">Add Category</button>
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
            <h3>Delete This Category ?</h3>
            <p>
              are you sure you want to delete this item ? if you are sure just
              click on delete it .
            </p>
          </div>
          <div className="text-end ">
            <button onClick={deleteCategory} className="btn btn-outline-danger">
              Delete this item
            </button>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={ModalState === "show-Update-Modal"} onHide={handleShow}>
        <Modal.Body className="px-5">
          <h3>Update Category</h3>
          <form onSubmit={handleSubmit(updateCategory)}>
            <input
              className="form-control my-3 bg-light p-3"
              type="text"
              placeholder="Category Name "
              {...register("name", { required: true })}
            />
            {errors.name && errors.name.type === "required" && (
              <p className="text-danger">Category name is required.</p>
            )}
            <div className="">
              <button className="btn btn-success w-100 ">
                Update Category
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      <Header
        title="Categories, "
        description="You can now add your items that "
        name="Items"
        imgHader={imgHader}
      />
      <div className="container">
        <div className="row align-items-center justify-content-between w-100 ">
          <div className="col-md-8">
            <h4>Categories Table Details</h4>
            <span>You can check all details</span>
          </div>
          <div className="col-md-4 text-end">
            <button
              className="btn btn-success"
              onClick={() => {
                showAddModal();
              }}
            >
              Add New Category
            </button>
          </div>
        </div>
      </div>
      <div className="container my-3">
        {" "}
        {categoriesList.length > 0 ? (
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col"> #</th>
                <th scope="col">Name Category</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {categoriesList.map((category) => (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.name}</td>
                  <td className="">
                    <div
                      className="fa fa-edit fa-2x mx-2 text-warning"
                      onClick={() => showUpdateModal(category)}
                    ></div>
                    <div
                      className="fa fa-trash fa-2x text-danger"
                      onClick={() => showDeleteModal(category.id)}
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
