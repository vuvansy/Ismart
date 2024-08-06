"use client";
import Link from "next/link";
import React, { useEffect } from "react";

export default function Sidebar() {
    useEffect(() => {
        const handleSidebarToggle = () => {
            $("#sidebar-menu .arrow").click(function () {
                $(this).toggleClass("fa-angle-right fa-angle-down");
                $(this).closest("li").children(".sub-menu").slideToggle();
            });
        };

        const handleCheckAll = () => {
            $("input[name='checkall']").click(function () {
                var checked = $(this).is(":checked");
                $(".table-checkall tbody tr td input:checkbox").prop(
                    "checked",
                    checked
                );
            });
        };

        const handleActiveSubMenu = () => {
            $(".nav-link.active .sub-menu").slideDown();
            $(".nav-link.active .arrow")
                .removeClass("fa-angle-right")
                .addClass("fa-angle-down");
        };

        const setupEventListeners = () => {
            handleSidebarToggle();
            handleCheckAll();
            handleActiveSubMenu();
        };

        const cleanupEventListeners = () => {
            $("#sidebar-menu .arrow").off("click");
            $("input[name='checkall']").off("click");
        };

        $(document).ready(function () {
            setupEventListeners();
        });

        return cleanupEventListeners;
    }, []);
    return (
        <div id="sidebar" className="bg-white">
            <ul id="sidebar-menu">
                <li className="nav-link active">
                    <Link href="">
                        <div className="nav-link-icon d-inline-flex pr-2">
                            <i className="far fa-folder"></i>
                        </div>
                        Danh mục
                    </Link>
                    <i className="arrow fas fa-angle-right"></i>

                    <ul className="sub-menu">
                        <li>
                            <Link href="/admin/add-category">Thêm mới</Link>
                        </li>
                        <li>
                            <Link href="/admin/list-category">Danh sách</Link>
                        </li>
                    </ul>
                </li>
                <li className="nav-link">
                    <Link href="">
                        <div className="nav-link-icon d-inline-flex pr-2">
                            <i className="far fa-folder"></i>
                        </div>
                        Sản phẩm
                    </Link>
                    <i className="arrow fas fa-angle-right"></i>
                    <ul className="sub-menu">
                        <li>
                            <Link href="/admin/add-products">Thêm mới</Link>
                        </li>
                        <li>
                            <Link href="/admin/list-products">Danh sách</Link>
                        </li>
                    </ul>
                </li>
                <li className="nav-link">
                    <Link href="">
                        <div className="nav-link-icon d-inline-flex pr-2">
                            <i className="far fa-folder"></i>
                        </div>
                        Users
                    </Link>
                    <i className="arrow fas fa-angle-right"></i>

                    <ul className="sub-menu">
                        <li>
                            <Link href="/admin/add-user">Thêm mới</Link>
                        </li>
                        <li>
                            <Link href="/admin/list-user">Danh sách</Link>
                        </li>
                    </ul>
                </li>
                <li className="nav-link">
                    <a>
                        <div className="nav-link-icon d-inline-flex pr-2">
                            <i className="far fa-folder"></i>
                        </div>
                        Bán hàng
                    </a>
                    <i className="arrow fas fa-angle-right"></i>
                    <ul className="sub-menu">
                        <li>
                            <Link href="/admin/list-order">Đơn hàng</Link>
                        </li>
                    </ul>
                </li>
                <li className="nav-link">
                    <Link href="">
                        <div className="nav-link-icon d-inline-flex pr-2">
                            <i className="far fa-folder"></i>
                        </div>
                        Thống kê
                    </Link>
                    <i className="arrow fas fa-angle-right"></i>

                    <ul className="sub-menu">
                        <li>
                            <Link href="/admin/statistical">Danh sách</Link>
                        </li>
                        <li>
                            <Link href="/admin/warning-products">
                                Sản phẩm sắp hêt
                            </Link>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    );
}
