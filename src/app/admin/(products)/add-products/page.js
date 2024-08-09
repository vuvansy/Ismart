"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
export default function AddProducts() {
    const [categories, setCategories] = useState([]);
    const router = useRouter();
    const [successMessage, setSuccessMessage] = useState("");
    const [previewImage, setPreviewImage] = useState(null);

    useEffect(() => {
        const getCategories = async () => {
            const res = await fetch("http://localhost:3000/categories");
            const data = await res.json();
            setCategories(data);
        };
        getCategories();
    }, []);

    const formik = useFormik({
        initialValues: {
            name: "",
            profile_pic: null,
            categoryId: "",
            price_new: "",
            price_old: "",
            quantity: "",
            description: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Tên sản phẩm là bắt buộc"),
            profile_pic: Yup.mixed().required("Hình ảnh sản phẩm là bắt buộc"),
            categoryId: Yup.string().required("Danh mục là bắt buộc"),
            price_new: Yup.number()
                .required("Giá mới sản phẩm là bắt buộc")
                .positive("Giá mới phải là số dương"),
            price_old: Yup.number()
                .required("Giá mới sản phẩm là bắt buộc")
                .positive("Giá mới phải là số dương"),
            quantity: Yup.number().required("Số lượng là bắt buộc"),
            description: Yup.string().required("Chi tiết sản phẩm là bắt buộc"),
        }),
        onSubmit: async (values, { resetForm }) => {
            const data = new FormData();
            data.append("name", values.name);
            data.append("price_new", values.price_new);
            data.append("price_old", values.price_old);
            data.append("quantity", values.quantity);
            data.append("description", values.description);
            data.append("categoryId", values.categoryId);
            data.append("profile_pic", values.profile_pic);

            try {
                const res = await fetch("http://localhost:3000/products", {
                    method: "POST",
                    body: data,
                });

                if (res.ok) {
                    const result = await res.json();
                    console.log(result);
                    setSuccessMessage("Sản phẩm đã được thêm mới thành công!");
                    resetForm();

                    setTimeout(() => {
                        router.push("/admin/list-products");
                    }, 2000);
                } else {
                    console.error("Error adding product");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        },
    });

    const handleFileChange = (event) => {
        const file = event.currentTarget.files[0];
        if (file) {
            formik.setFieldValue("profile_pic", file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    return (
        <div className="card">
            <div className="card-header">Thêm mới sản phẩm</div>
            <div className="card-body">
                {successMessage && (
                    <div className="alert alert-success">{successMessage}</div>
                )}
                <form onSubmit={formik.handleSubmit}>
                    <div className="row">
                        <div className="col-6">
                            <div className="form-group">
                                <label
                                    htmlFor="name"
                                    className="font-weight-bold"
                                >
                                    Tên sản phẩm
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="name"
                                    id="name"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.name}
                                />
                                {formik.touched.name && formik.errors.name ? (
                                    <div className="text-danger">
                                        {formik.errors.name}
                                    </div>
                                ) : null}
                            </div>
                            <div className="form-group">
                                <label
                                    htmlFor="categoryId"
                                    className="font-weight-bold"
                                >
                                    Danh mục
                                </label>
                                <select
                                    className="form-control"
                                    id="categoryId"
                                    name="categoryId"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.categoryId}
                                >
                                    <option value="">Chọn danh mục</option>
                                    {categories.map((category) => (
                                        <option
                                            key={category._id}
                                            value={category._id}
                                        >
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                                {formik.touched.categoryId &&
                                formik.errors.categoryId ? (
                                    <div className="text-danger">
                                        {formik.errors.categoryId}
                                    </div>
                                ) : null}
                            </div>
                            <div className="form-group">
                                <label
                                    htmlFor="profile_pic"
                                    className="font-weight-bold"
                                >
                                    Hình ảnh
                                </label>
                                <br />
                                <input
                                    className=""
                                    type="file"
                                    name="profile_pic"
                                    id="profile_pic"
                                    // onChange={(event) => {
                                    //     formik.setFieldValue(
                                    //         "profile_pic",
                                    //         event.currentTarget.files[0]
                                    //     );
                                    // }}
                                    onChange={handleFileChange}
                                />
                                {formik.touched.profile_pic &&
                                formik.errors.profile_pic ? (
                                    <div className="text-danger">
                                        {formik.errors.profile_pic}
                                    </div>
                                ) : null}

                                {previewImage && (
                                    <div>
                                        <img
                                            src={previewImage}
                                            alt="Preview"
                                            className="img-preview"
                                            style={{
                                                maxWidth: "200px",
                                                marginTop: "10px",
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="col-6">
                            <div className="form-group">
                                <label
                                    htmlFor="price_new"
                                    className="font-weight-bold"
                                >
                                    Giá mới
                                </label>
                                <input
                                    className="form-control"
                                    type="number"
                                    name="price_new"
                                    id="price_new"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.price_new}
                                />
                                {formik.touched.price_new &&
                                formik.errors.price_new ? (
                                    <div className="text-danger">
                                        {formik.errors.price_new}
                                    </div>
                                ) : null}
                            </div>

                            <div className="form-group">
                                <label
                                    htmlFor="price_old"
                                    className="font-weight-bold"
                                >
                                    Giá cũ
                                </label>
                                <input
                                    className="form-control"
                                    type="number"
                                    name="price_old"
                                    id="price_old"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.price_old}
                                />
                                {formik.touched.price_old &&
                                formik.errors.price_old ? (
                                    <div className="text-danger">
                                        {formik.errors.price_old}
                                    </div>
                                ) : null}
                            </div>

                            <div className="form-group">
                                <label
                                    htmlFor="quantity"
                                    className="font-weight-bold"
                                >
                                    Số lượng
                                </label>
                                <input
                                    className="form-control"
                                    type="number"
                                    name="quantity"
                                    id="quantity"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.quantity}
                                />
                                {formik.touched.quantity &&
                                formik.errors.quantity ? (
                                    <div className="text-danger">
                                        {formik.errors.quantity}
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </div>

                    <div className="form-group pt-2">
                        <label
                            htmlFor="description"
                            className="font-weight-bold"
                        >
                            Chi tiết sản phẩm
                        </label>
                        <textarea
                            name="description"
                            className="form-control"
                            id="description"
                            cols="30"
                            rows="5"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.description}
                        ></textarea>
                        {formik.touched.description &&
                        formik.errors.description ? (
                            <div className="text-danger">
                                {formik.errors.description}
                            </div>
                        ) : null}
                    </div>

                    <button type="submit" className="btn btn-primary" id="save">
                        Thêm mới
                    </button>
                </form>
            </div>
        </div>
    );
}
