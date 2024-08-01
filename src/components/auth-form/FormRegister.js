"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "@/redux/slices/accountSlice";

import { useRouter } from "next/navigation";

import Link from "next/link";
export default function FormRegister() {
    const dispatch = useDispatch();
    const router = useRouter();

    //Dùng formData
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const signupData = {
            fullname: formData.get("fullname"),
            username: formData.get("username"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            address: formData.get("address"),
            password: formData.get("password"),
            confirm_password: formData.get("confirm_pass"),
        };
        dispatch(signup(signupData))
            .unwrap()
            .then((data) => {
                if (data) {
                    if (data.status === 400) {
                        alert(data.error);
                    } else if (data.status === 200) {
                        alert(data.message);
                        router.push("/");
                    }
                } else {
                    alert(data.message);
                }
            })
            .catch((error) => {
                alert(error.message);
            });
    };

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
                        <form action="" id="form_reg" onSubmit={handleSubmit}>
                            <div className="row-form__group">
                                <div className="form__group">
                                    <label htmlFor="fullname">Họ tên</label>
                                    <input
                                        type="text"
                                        name="fullname"
                                        id="fullname"
                                        placeholder="Fullname..."
                                    />
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
                                    />
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
                                    />
                                </div>

                                <div className="form__group">
                                    <label htmlFor="phone">Số Điện thoại</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        id="phone"
                                        placeholder="Số điện thoại..."
                                    />
                                </div>
                            </div>

                            <div className="form__group">
                                <label htmlFor="address">Địa chỉ</label>
                                <input
                                    type="text"
                                    name="address"
                                    id="address"
                                    placeholder="Địa chỉ..."
                                />
                            </div>

                            <div className="row-form__group">
                                <div className="form__group">
                                    <label htmlFor="password">Mật khẩu</label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="Password"
                                    />
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
                                    />
                                </div>
                            </div>
                            <input
                                type="submit"
                                name="btn-reg"
                                className="btn user__cta"
                                id="btn-login"
                                value="ĐĂNG KÝ"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
