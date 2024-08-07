"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

export default function AddCategory() {
    const router = useRouter();
    const [successMessage, setSuccessMessage] = useState("");
    const [previewImage, setPreviewImage] = useState(null);

    const formik = useFormik({
        initialValues: {
            name: "",
            profile_pic: null,
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Tên sản phẩm là bắt buộc"),
            profile_pic: Yup.mixed().required("Hình ảnh sản phẩm là bắt buộc"),
        }),
        onSubmit: async (values, { resetForm }) => {
            const data = new FormData();
            data.append("name", values.name);
            data.append("profile_pic", values.profile_pic);

            try {
                const res = await fetch("http://localhost:3000/categories", {
                    method: "POST",
                    body: data,
                });

                if (res.ok) {
                    const result = await res.json();
                    console.log(result);
                    setSuccessMessage("Danh mục thêm mới thành công!");
                    resetForm();

                    // Chuyển hướng sau 2 giây
                    setTimeout(() => {
                        router.push("/admin/list-category");
                    }, 2000);
                } else {
                    console.error("Error adding category");
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
    //URL.createObjectURL để tạo URL tạm thời cho tệp được chọn.
    //Sau đó, URL này có thể được sử dụng làm src cho thẻ img để hiển thị ảnh xem trước

    return (
        <div className="card">
            <div className="card-header font-weight-bold">
                Thêm mới danh mục
            </div>
            <div className="card-body">
                {successMessage && (
                    <div className="alert alert-success">{successMessage}</div>
                )}
                <form onSubmit={formik.handleSubmit}>
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
                            {...formik.getFieldProps("name")}
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
                            Hình ảnh
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
                        Thêm mới
                    </button>
                </form>
            </div>
        </div>
    );
}
