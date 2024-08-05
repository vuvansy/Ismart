"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/redux/slices/accountSlice";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";

// Validation schema
const LoginSchema = Yup.object({
    username: Yup.string().required("Tên đăng nhập là bắt buộc"),
    password: Yup.string()
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
            "Mật khẩu phải có ít nhất 6 ký tự, bao gồm chữ và số"
        )
        .required("Vui lòng nhập mật khẩu"),
});
export default function FormLogin() {
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
            remember_me: false,
        },
        validationSchema: LoginSchema,
        onSubmit: (values, { setSubmitting }) => {
            const loginData = {
                username: values.username,
                password: values.password,
                rememberMe: values.remember_me,
            };
            dispatch(login(loginData))
                .unwrap()
                .then((data) => {
                    setSubmitting(false);
                    if (data.status === 300) {
                        alert(data.message);
                    } else if (data.status === 200) {
                        alert(data.message);
                        // Chuyển trang theo role
                        const token = data.access_token;
                        const payload = JSON.parse(atob(token.split(".")[1]));
                        console.log(payload.data.role);
                        if (payload.data.role === "1") {
                            window.location.href =
                                "http://localhost:3001/admin";
                        } else {
                            window.location.href = "/";
                        }
                    }
                })
                .catch((error) => {
                    setSubmitting(false);
                    alert(error.message);
                });
        },
    });

    return (
        <section className="login">
            <div className="container">
                <div className="form__account">
                    <div className="account__inner">
                        <h1 className="heading-title">ĐĂNG NHẬP</h1>

                        <form
                            action=""
                            id="form_login"
                            onSubmit={formik.handleSubmit}
                        >
                            <div className="form__group">
                                <label htmlFor="username">Tên đăng nhập</label>
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    autoComplete="username"
                                    placeholder="Tên đăng nhập..."
                                    {...formik.getFieldProps("username")}
                                />
                                {formik.touched.username &&
                                formik.errors.username ? (
                                    <div className="text-danger">
                                        {formik.errors.username}
                                    </div>
                                ) : null}
                            </div>
                            <div className="form__group">
                                <label htmlFor="password">Mật khẩu</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    autoComplete="current-password"
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
                                <input
                                    type="checkbox"
                                    name="remember_me"
                                    id="remember_me"
                                    {...formik.getFieldProps("remember_me")}
                                />
                                <label
                                    htmlFor="remember_me"
                                    className="remember"
                                >
                                    Ghi nhớ thông tin
                                </label>
                                <Link
                                    className="control__reset"
                                    href="/forgotPassword"
                                >
                                    Quên mật khẩu?
                                </Link>
                            </div>
                            <input
                                type="submit"
                                name="btn-login"
                                className="btn user__cta"
                                id="btn-login"
                                value="ĐĂNG NHẬP"
                                disabled={formik.isSubmitting}
                            />
                        </form>
                    </div>
                    <div className="sidebar__user">
                        <h2 className="sidebar__user--heading">
                            Xin chào, Bạn
                        </h2>
                        <p className="sidebar__user--desc">
                            Hãy bắt đầu với chúng tôi. Nếu bạn chưa có tài
                            khoản.
                        </p>
                        <div className="">
                            <Link href="/register">
                                <button className="btn user__cta">
                                    ĐĂNG KÝ
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
