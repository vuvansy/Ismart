"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "@/redux/slices/accountSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";

// Validation schema
const SignupSchema = Yup.object({
    fullname: Yup.string().required("Họ tên là bắt buộc"),
    username: Yup.string().required("Tên đăng nhập là bắt buộc"),
    email: Yup.string()
        .email("Email không hợp lệ")
        .required("Vui lòng nhập email"),
    phone: Yup.string()
        .matches(
            /^(?:\+84|84|0)(3|5|7|8|9)([0-9]{8})$/,
            "Số điện thoại không hợp lệ"
        )
        .required("Số điện thoại là bắt buộc"),
    address: Yup.string().required("Địa chỉ là bắt buộc"),
    password: Yup.string()
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
            "Mật khẩu phải có ít nhất 6 ký tự, bao gồm chữ và số"
        )
        .required("Vui lòng nhập mật khẩu"),
    confirm_password: Yup.string()
        .oneOf([Yup.ref("password"), null], "Mật khẩu không khớp")
        .required("Vui lòng nhập lại mật khẩu"),
});
export default function FormRegister() {
    const dispatch = useDispatch();
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            fullname: "",
            username: "",
            email: "",
            phone: "",
            address: "",
            password: "",
            confirm_password: "",
        },
        validationSchema: SignupSchema,
        onSubmit: (values, { setSubmitting }) => {
            dispatch(signup(values))
                .unwrap()
                .then((data) => {
                    setSubmitting(false);
                    if (data.status === 400) {
                        alert(data.error);
                    } else if (data.status === 200) {
                        alert(data.message);
                        router.push("/login");
                    } else {
                        alert(data.message);
                    }
                })
                .catch((error) => {
                    setSubmitting(false);
                    alert(error.message);
                });
        },
    });

    return (
        <section className="register">
            <div className="container">
                <div className="form__account">
                    <div className="sidebar__user">
                        <h1 className="sidebar__user--heading">
                            Xin chào, Bạn
                        </h1>
                        <p className="sidebar__user--desc">
                            Hãy bắt đầu với chúng tôi. Nếu bạn chưa có tài
                            khoản.
                        </p>
                        <div className="">
                            <Link href="/login">
                                <button className="btn user__cta">
                                    ĐĂNG NHẬP
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="account__inner">
                        <h1 className="heading-title">ĐĂNG KÝ</h1>
                        <form
                            action=""
                            id="form_reg"
                            onSubmit={formik.handleSubmit}
                        >
                            <div className="row-form__group">
                                <div className="form__group">
                                    <label htmlFor="fullname">Họ tên</label>
                                    <input
                                        type="text"
                                        name="fullname"
                                        id="fullname"
                                        placeholder="Fullname..."
                                        {...formik.getFieldProps("fullname")}
                                    />
                                    {formik.touched.fullname &&
                                    formik.errors.fullname ? (
                                        <div className="text-danger">
                                            {formik.errors.fullname}
                                        </div>
                                    ) : null}
                                </div>

                                <div className="form__group">
                                    <label htmlFor="username">
                                        Tên đăng nhập
                                    </label>
                                    <input
                                        type="text"
                                        name="username"
                                        id="username"
                                        placeholder="Username..."
                                        {...formik.getFieldProps("username")}
                                    />
                                    {formik.touched.username &&
                                    formik.errors.username ? (
                                        <div className="text-danger">
                                            {formik.errors.username}
                                        </div>
                                    ) : null}
                                </div>
                            </div>

                            <div className="row-form__group">
                                <div className="form__group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="text"
                                        name="email"
                                        id="email"
                                        placeholder="Email..."
                                        {...formik.getFieldProps("email")}
                                    />
                                    {formik.touched.email &&
                                    formik.errors.email ? (
                                        <div className="text-danger">
                                            {formik.errors.email}
                                        </div>
                                    ) : null}
                                </div>

                                <div className="form__group">
                                    <label htmlFor="phone">Số Điện thoại</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        id="phone"
                                        placeholder="Số điện thoại..."
                                        {...formik.getFieldProps("phone")}
                                    />
                                    {formik.touched.phone &&
                                    formik.errors.phone ? (
                                        <div className="text-danger">
                                            {formik.errors.phone}
                                        </div>
                                    ) : null}
                                </div>
                            </div>

                            <div className="form__group">
                                <label htmlFor="address">Địa chỉ</label>
                                <input
                                    type="text"
                                    name="address"
                                    id="address"
                                    placeholder="Địa chỉ..."
                                    {...formik.getFieldProps("address")}
                                />
                                {formik.touched.address &&
                                formik.errors.address ? (
                                    <div className="text-danger">
                                        {formik.errors.address}
                                    </div>
                                ) : null}
                            </div>

                            <div className="row-form__group">
                                <div className="form__group">
                                    <label htmlFor="password">Mật khẩu</label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="Password"
                                        {...formik.getFieldProps("password")}
                                    />
                                    {formik.touched.password &&
                                    formik.errors.password ? (
                                        <div className="text-danger">
                                            {formik.errors.password}
                                        </div>
                                    ) : null}
                                </div>

                                <div className="form__group">
                                    <label htmlFor="confirm_pass">
                                        Xác nhận mật khẩu
                                    </label>
                                    <input
                                        type="password"
                                        name="confirm_pass"
                                        id="confirm_pass"
                                        placeholder="Password"
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
                            <input
                                type="submit"
                                name="btn-reg"
                                className="btn user__cta"
                                id="btn-login"
                                value="ĐĂNG KÝ"
                                disabled={formik.isSubmitting}
                            />
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
