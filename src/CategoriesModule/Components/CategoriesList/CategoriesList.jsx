import { useEffect, useState } from "react";
import Header from "../../../SharedModule/Components/Header/Header";
import imgHader from "../../../assets/images/eating a variety of foods-amico.svg";
import axios from "axios";
import NoData from "../../../SharedModule/Components/NoData/NoData";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function CategoriesList() {
  const [categoriesList, setCategoriesList] = useState([]);
  const getCategories = () => {
    axios
      .get("http://upskilling-egypt.com:3002/api/v1/Category/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })
      .then((res) => setCategoriesList(res.data.data))
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    axios
      .post("http://upskilling-egypt.com:3002/api/v1/Category/", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })
      .then((response) => {
        toast.success("Add Category success");
        getCategories();
        handleClose();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  useEffect(() => {
    getCategories();
  }, []);
  // Modal handler
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
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
                handleShow();
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
                  <td></td>
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
