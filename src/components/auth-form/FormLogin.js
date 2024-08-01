"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/redux/slices/accountSlice";

import { useRouter } from "next/navigation";

import Link from "next/link";

export default function FormLogin() {
    const dispatch = useDispatch();
    const router = useRouter();

    //Dùng formData
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const loginData = {
            username: formData.get("username"),
            password: formData.get("password"),
            rememberMe: formData.has("remember_me"),
        };
        dispatch(login(loginData))
            .unwrap()
            .then((data) => {
                if (data.status === 300) {
                    alert(data.message);
                } else if (data.status === 200) {
                    alert(data.message);

                    router.push("/");
                }
            })
            .catch((error) => {
                alert(error.message);
            });
    };

    return (
        <section className="login">
            <div className="container">
                <div className="form__account">
                    <div className="account__inner">
                        <h1 className="heading-title">ĐĂNG NHẬP</h1>

                        <form action="" id="form_login" onSubmit={handleSubmit}>
                            <div className="form__group">
                                <label htmlFor="username">Tên đăng nhập</label>
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    autoComplete="username"
                                    placeholder="Tên đăng nhập..."
                                />
                            </div>
                            <div className="form__group">
                                <label htmlFor="password">Mật khẩu</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    autoComplete="current-password"
                                    placeholder="Password"
                                />
                            </div>
                            <div className="form__group">
                                <input
                                    type="checkbox"
                                    name="remember_me"
                                    id="remember_me"
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
