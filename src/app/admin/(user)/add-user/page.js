"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

export default function AddUser() {
    const [successMessage, setSuccessMessage] = useState("");
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            fullname: "",
            email: "",
            phone: "",
            address: "",
            username: "",
            role: "",
            password: "",
            confirm_password: "",
        },
        validationSchema: Yup.object({
            fullname: Yup.string().required("Họ tên là bắt buộc"),
            username: Yup.string().required("Tên đăng nhập là bắt buộc"),
            email: Yup.string()
                .email("Không đúng định dạng Email")
                .required("Email là bắt buộc"),
            phone: Yup.string()
                .matches(
                    /^(?:\+84|84|0)(3|5|7|8|9)([0-9]{8})$/,
                    "Số điện thoại không hợp lệ"
                )
                .required("Số điện thoại là bắt buộc"),
            address: Yup.string().required("Địa chỉ là bắt buộc"),
            role: Yup.string().required("Quyền người dùng là bắt buộc"),
            password: Yup.string()
                .matches(
                    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                    "Mật khẩu phải có ít nhất 6 ký tự, bao gồm chữ và số"
                )
                .required("Vui lòng nhập mật khẩu"),
            confirm_password: Yup.string()
                .oneOf([Yup.ref("password"), null], "Mật khẩu không khớp")
                .required("Vui lòng nhập lại mật khẩu"),
        }),
        onSubmit: async (values, { setSubmitting, setFieldError }) => {
            setSubmitting(true);
            try {
                const response = await fetch(
                    "http://localhost:3000/users/register",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(values),
                    }
                );

                if (!response.ok) {
                    const errorData = await response.json();
                    if (errorData.errors) {
                        for (const [field, errorMessage] of Object.entries(
                            errorData.errors
                        )) {
                            setFieldError(field, errorMessage);
                        }
                    } else {
                        throw new Error("Network response was not ok");
                    }
                } else {
                    const result = await response.json();
                    setSuccessMessage("Đang ký tài khoản thành công!");
                    setTimeout(() => {
                        router.push("/admin/list-user");
                    }, 2000);
                }
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <div className="card">
            <div className="card-header font-weight-bold">
                Thêm người dùng mới
            </div>
            <div className="card-body">
                {successMessage && (
                    <div className="alert alert-success">{successMessage}</div>
                )}
                <form onSubmit={formik.handleSubmit}>
                    <div className="row">
                        <div className="col-6">
                            <div className="form-group">
                                <label htmlFor="fullname">Họ và tên</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="fullname"
                                    {...formik.getFieldProps("fullname")}
                                />
                                {formik.touched.fullname &&
                                formik.errors.fullname ? (
                                    <div className="text-danger">
                                        {formik.errors.fullname}
                                    </div>
                                ) : null}
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="email"
                                    {...formik.getFieldProps("email")}
                                />
                                {formik.touched.email && formik.errors.email ? (
                                    <div className="text-danger">
                                        {formik.errors.email}
                                    </div>
                                ) : null}
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Phone</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="phone"
                                    {...formik.getFieldProps("phone")}
                                />
                                {formik.touched.phone && formik.errors.phone ? (
                                    <div className="text-danger">
                                        {formik.errors.phone}
                                    </div>
                                ) : null}
                            </div>
                            <div className="form-group">
                                <label htmlFor="address">Địa chỉ</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="address"
                                    {...formik.getFieldProps("address")}
                                />
                                {formik.touched.address &&
                                formik.errors.address ? (
                                    <div className="text-danger">
                                        {formik.errors.address}
                                    </div>
                                ) : null}
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label htmlFor="username">Tên đăng nhập</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="username"
                                    {...formik.getFieldProps("username")}
                                />
                                {formik.touched.username &&
                                formik.errors.username ? (
                                    <div className="text-danger">
                                        {formik.errors.username}
                                    </div>
                                ) : null}
                            </div>
                            <div className="form-group">
                                <label htmlFor="role">Nhóm quyền</label>
                                <select
                                    className="form-control"
                                    id="role"
                                    {...formik.getFieldProps("role")}
                                >
                                    <option value="">Chọn quyền</option>
                                    <option value="0">Người dùng</option>
                                    <option value="1">Admin</option>
                                </select>
                                {formik.touched.role && formik.errors.role ? (
                                    <div className="text-danger">
                                        {formik.errors.role}
                                    </div>
                                ) : null}
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Mật khẩu</label>
                                <input
                                    className="form-control"
                                    type="password"
                                    id="password"
                                    {...formik.getFieldProps("password")}
                                />
                                {formik.touched.password &&
                                formik.errors.password ? (
                                    <div className="text-danger">
                                        {formik.errors.password}
                                    </div>
                                ) : null}
                            </div>
                            <div className="form-group">
                                <label htmlFor="confirm_password">
                                    Xác nhận mật khẩu
                                </label>
                                <input
                                    className="form-control"
                                    type="password"
                                    id="confirm_password"
                                    {...formik.getFieldProps(
                                        "confirm_password"
                                    )}
                                />
                                {formik.touched.confirm_password &&
                                formik.errors.confirm_password ? (
                                    <div className="text-danger">
                                        {formik.errors.confirm_password}
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={formik.isSubmitting}
                    >
                        Thêm mới
                    </button>
                </form>
            </div>
        </div>
    );
}
