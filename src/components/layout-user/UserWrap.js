"use client";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Link from "next/link";
import { logout, setUser } from "@/redux/slices/accountSlice";
export default function UserWrap() {
    const dispatch = useDispatch();
    const { user, error, isLoading } = useSelector((state) => state.account);
    // console.log("user", user);

    useEffect(() => {
        if (user) {
            sessionStorage.setItem("user", JSON.stringify(user));
        }
    }, [user]);

    useEffect(() => {
        const storedUser = sessionStorage.getItem("user");
        if (storedUser) {
            dispatch(setUser(JSON.parse(storedUser)));
        }
    }, [dispatch]);

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <>
            {user !== null && user.status === 200 && user.data ? (
                <>
                    <div className="dropdown">
                        <a
                            className="font-weight-bold btn-secondary dropdown-toggle"
                            role="button"
                            data-toggle="dropdown"
                            aria-expanded="false"
                        >
                            {user.data.fullname}
                        </a>

                        <div className="dropdown-menu">
                            {user.data.role === "1" ? (
                                <>
                                    <Link
                                        className="dropdown-item"
                                        href="/admin"
                                    >
                                        <i className="fa-solid fa-user-gear"></i>{" "}
                                        Trang quản trị
                                    </Link>
                                    <Link
                                        className="dropdown-item"
                                        href="/editUser"
                                    >
                                        <i className="fa-solid fa-bookmark"></i>{" "}
                                        Cập nhật thông tin
                                    </Link>
                                    <Link
                                        className="dropdown-item"
                                        href="/changePassword"
                                    >
                                        <i className="fa-solid fa-gear"></i> Đổi
                                        mật khẩu
                                    </Link>
                                    <a
                                        onClick={handleLogout}
                                        className="dropdown-item"
                                    >
                                        <i className="fa-solid fa-right-from-bracket"></i>{" "}
                                        Đăng xuất
                                    </a>
                                </>
                            ) : (
                                <>
                                    <Link
                                        className="dropdown-item"
                                        href="/editUser"
                                    >
                                        <i className="fa-solid fa-bookmark"></i>{" "}
                                        Cập nhật thông tin
                                    </Link>
                                    <Link
                                        className="dropdown-item"
                                        href="/changePassword"
                                    >
                                        <i className="fa-solid fa-gear"></i> Đổi
                                        mật khẩu
                                    </Link>
                                    <a
                                        onClick={handleLogout}
                                        className="dropdown-item"
                                    >
                                        <i className="fa-solid fa-right-from-bracket"></i>{" "}
                                        Đăng xuất
                                    </a>
                                </>
                            )}
                        </div>
                    </div>
                </>
            ) : (
                <Link
                    href="/login"
                    className="title text-white font-weight-bold"
                >
                    Đăng nhập
                </Link>
            )}
        </>
    );
}
