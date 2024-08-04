"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAccount } from "@/redux/slices/accountSlice";

import { useRouter } from "next/navigation";

import Link from "next/link";

export default function FormEditUser() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { user } = useSelector((state) => state.account);
    // console.log(user);
    const [formData, setFormData] = useState({
        fullname: "",
        username: "",
        email: "",
        phone: "",
        address: "",
    });

    useEffect(() => {
        if (user && user.data) {
            setFormData({
                fullname: user.data.fullname,
                username: user.data.username,
                email: user.data.email,
                phone: user.data.phone,
                address: user.data.address,
            });
        }
    }, [user]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateAccount(formData))
            .unwrap()
            .then((data) => {
                if (data.status === 200) {
                    alert(data.message);
                } else if (data.status === 400) {
                    alert(data.error);
                }
            })
            .catch((error) => {
                alert(error.message);
            });
    };

    return (
        <section className="updateAccount">
            <div className="container">
                <div className="form__account">
                    <div className="account__inner">
                        <div className="account__inner--title">
                            <h1 className="heading-title">
                                CẬP NHẬT THÔNG TIN
                            </h1>
                        </div>
                        <form
                            onSubmit={handleSubmit}
                            id="form_login"
                            method="POST"
                        >
                            <div className="row-form__group">
                                <div className="form__group">
                                    <label htmlFor="fullname">Họ tên</label>
                                    <input
                                        type="text"
                                        name="fullname"
                                        id="fullname"
                                        value={formData.fullname}
                                        onChange={handleInputChange}
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
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        readOnly
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
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="Email..."
                                    />
                                </div>

                                <div className="form__group">
                                    <label htmlFor="phone">Số Điện thoại</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        id="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
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
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    placeholder="Địa chỉ..."
                                />
                            </div>

                            <input
                                type="submit"
                                name="btn-update"
                                className="btn user__cta"
                                id="btn-login"
                                value="CẬP NHẬT"
                            />
                        </form>
                    </div>
                    <div className="sidebar__user">
                        <div className="avatar__user">
                            <img src="" alt="" />
                        </div>
                        <h2 className="subtitle__user">Tên User</h2>
                    </div>
                </div>
            </div>
        </section>
    );
}
