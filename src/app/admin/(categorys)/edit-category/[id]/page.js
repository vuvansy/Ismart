"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

export default function EditCategory({ params }) {
    const router = useRouter();
    const [successMessage, setSuccessMessage] = useState("");
    const [previewImage, setPreviewImage] = useState(null);
    const [initialValues, setInitialValues] = useState({
        id: "",
        name: "",
        profile_pic: null,
    });

    useEffect(() => {
        async function fetchCategory() {
            try {
                const res = await fetch(
                    `http://localhost:3000/categories/${params.id}`
                );
                if (res.ok) {
                    const category = await res.json();
                    setInitialValues({
                        id: category._id,
                        name: category.name,
                        profile_pic: null, // Không tải hình ảnh hiện tại
                    });
                } else {
                    console.error("Lỗi khi tải dữ liệu danh mục");
                }
            } catch (error) {
                console.error("Lỗi:", error);
            }
        }

        if (params.id) {
            fetchCategory();
        }
    }, [params.id]);

    const formik = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,
        validationSchema: Yup.object({
            name: Yup.string().required("Tên danh mục là bắt buộc"),
            // profile_pic: Yup.mixed().required("Hình ảnh danh mục là bắt buộc"),
        }),
        onSubmit: async (values, { resetForm }) => {
            const data = new FormData();
            data.append("name", values.name);
            if (values.profile_pic) {
                data.append("profile_pic", values.profile_pic);
            }

            try {
                const res = await fetch(
                    `http://localhost:3000/categories/${params.id}`,
                    {
                        method: "PUT",
                        body: data,
                    }
                );

                if (res.ok) {
                    setSuccessMessage("Cập nhật danh mục thành công!");
                    resetForm();
                    setPreviewImage(null);

                    setTimeout(() => {
                        router.push("/admin/list-category");
                    }, 2000);
                } else {
                    console.error("Error updating category");
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
            <div className="card-header font-weight-bold">
                Cập nhật danh mục
            </div>
            <div className="card-body">
                {successMessage && (
                    <div className="alert alert-success">{successMessage}</div>
                )}
                <form onSubmit={formik.handleSubmit}>
                    <div className="form-group">
                        <label
                            htmlFor="categoryId"
                            className="font-weight-bold"
                        >
                            Mã danh mục
                        </label>
                        <input
                            className="form-control"
                            type="text"
                            name="id"
                            id="id"
                            value={formik.values.id}
                            readOnly
                        />
                    </div>
                    <div className="form-group">
                        <label
                            htmlFor="categoryName"
                            className="font-weight-bold"
                        >
                            Tên danh mục
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
                            htmlFor="categoryImage"
                            className="font-weight-bold"
                        >
                            Hình ảnh mới
                        </label>
                        <br />
                        <input
                            className=""
                            type="file"
                            name="profile_pic"
                            id="profile_pic"
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
                    <button type="submit" className="btn btn-primary" id="save">
                        Cập nhật
                    </button>
                </form>
            </div>
        </div>
    );
}
