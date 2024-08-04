"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "@/redux/slices/accountSlice";

import { useRouter } from "next/navigation";

import Link from "next/link";

export default function FormChangePassword() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { user } = useSelector((state) => state.account);
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(changePassword(formData))
            .unwrap()
            .then((data) => {
                if (data.status === 200) {
                    alert(data.message);
                    setFormData({
                        currentPassword: "",
                        newPassword: "",
                        confirmNewPassword: "",
                    });
                    router.push("/");
                } else if (data.status === 400) {
                    alert(data.error);
                } else if (data.status === 404) {
                    alert(data.message);
                } else if (data.status === 500) {
                    alert(data.message);
                }
            })
            .catch((error) => {
                alert(error.message);
            });
    };

    return (
        <section className="editPassword">
            <div className="container">
                <div className="form__account">
                    <div className="account__inner">
                        <div className="account__inner--title">
                            <h1 className="heading-title">ĐỔI MẬT KHẨU</h1>
                        </div>
                        <form onSubmit={handleSubmit} id="form_login">
                            <div className="form__group">
                                <label htmlFor="pass_old">Mật khẩu cũ</label>
                                <input
                                    type="password"
                                    name="currentPassword"
                                    id="pass_old"
                                    placeholder="Mật khẩu cũ"
                                    value={formData.currentPassword}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="form__group">
                                <label htmlFor="pass_new">Mật khẩu mới</label>
                                <input
                                    type="password"
                                    name="newPassword"
                                    id="pass_new"
                                    placeholder="Mật khẩu mới"
                                    value={formData.newPassword}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="form__group">
                                <label htmlFor="pass_confirm">
                                    Xác nhận mật khẩu
                                </label>
                                <input
                                    type="password"
                                    name="confirmNewPassword"
                                    id="pass_confirm"
                                    placeholder="Mật khẩu mới"
                                    value={formData.confirmNewPassword}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <input
                                type="submit"
                                name="btn-editPass"
                                className="btn user__cta"
                                id="btn-login"
                                value="CẬP NHẬT"
                            />
                        </form>
                    </div>
                    <div className="sidebar__user">
                        <div className="avatar__user"></div>
                        <h2 className="subtitle__user"></h2>
                    </div>
                </div>
            </div>
        </section>
    );
}
