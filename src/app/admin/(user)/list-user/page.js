"use client";
import PaginationAdmin from "@/components/layout-admin/PaginationAdmin";
import Link from "next/link";
import { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ListUser() {
    const [filter, setFilter] = useState("all");
    const [successMessage, setSuccessMessage] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const {
        data: users,
        error: usersError,
        mutate,
    } = useSWR("http://localhost:3000/users", fetcher);

    // Xử lý dữ liệu người dùng
    const roleCounts = users?.reduce(
        (acc, user) => {
            if (user.role === "1") {
                acc.admin++;
            } else {
                acc.user++;
            }
            return acc;
        },
        { admin: 0, user: 0 }
    ) || { admin: 0, user: 0 };

    // Lọc người dùng dựa trên tìm kiếm và bộ lọc
    const filteredUsers =
        users?.filter((user) => {
            const matchesFilter =
                filter === "all" ||
                user.role === (filter === "admin" ? "1" : "0");
            const matchesSearch = user.username
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
            return matchesFilter && matchesSearch;
        }) || [];

    // Phân trang người dùng
    const indexOfLastUser = currentPage * itemsPerPage;
    const indexOfFirstUser = indexOfLastUser - itemsPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    // Tính tổng số trang
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

    const formatDateTime = (dateString) => {
        const options = {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        };
        const date = new Date(dateString);
        return date.toLocaleString("vi-VN", options);
    };

    const handleDelete = async (userId) => {
        const confirmDelete = window.confirm(
            "Bạn có chắc chắn muốn xóa người dùng này không?"
        );
        if (!confirmDelete) {
            return;
        }
        try {
            const res = await fetch(`http://localhost:3000/users/${userId}`, {
                method: "DELETE",
            });
            if (!res.ok) {
                throw new Error("Lỗi khi xóa người dùng");
            }
            setSuccessMessage("Xóa người dùng thành công!");
            mutate();
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage("");
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [successMessage]);

    if (usersError) return <div>Lỗi khi tải dữ liệu</div>;
    if (!users) return <div>Đang tải...</div>;

    return (
        <div className="card">
            <div className="card-header font-weight-bold d-flex justify-content-between align-items-center">
                <h5 className="m-0">Danh sách thành viên</h5>
                <div className="form-search form-inline">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            setCurrentPage(1); // Reset về trang đầu khi tìm kiếm
                        }}
                    >
                        <input
                            type="text"
                            className="form-control form-search"
                            placeholder="Tìm kiếm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </form>
                </div>
            </div>
            <div className="card-body">
                {successMessage && (
                    <div className="alert alert-success" role="alert">
                        {successMessage}
                    </div>
                )}
                <div className="analytic">
                    <Link
                        href="#"
                        className="text-primary"
                        onClick={() => setFilter("all")}
                    >
                        Tất cả
                        <span className="text-muted">({users.length})</span>
                    </Link>
                    <Link
                        href="#"
                        className="text-primary ml-2"
                        onClick={() => setFilter("admin")}
                    >
                        Admin
                        <span className="text-muted">({roleCounts.admin})</span>
                    </Link>
                    <Link
                        href="#"
                        className="text-primary ml-2"
                        onClick={() => setFilter("user")}
                    >
                        Người dùng
                        <span className="text-muted">({roleCounts.user})</span>
                    </Link>
                </div>
                <div className="form-action form-inline py-3">
                    <select className="form-control mr-1" id="">
                        <option>Chọn</option>
                        <option>Tác vụ 1</option>
                        <option>Tác vụ 2</option>
                    </select>
                    <input
                        type="submit"
                        name="btn-search"
                        defaultValue="Áp dụng"
                        className="btn btn-primary"
                    />
                </div>
                <table className="table table-striped table-checkall">
                    <thead>
                        <tr>
                            <th>
                                <input type="checkbox" name="checkall" />
                            </th>
                            <th scope="col">#</th>
                            <th scope="col">Họ tên</th>
                            <th scope="col">Username</th>
                            <th scope="col">Email</th>
                            <th scope="col">Quyền</th>
                            <th scope="col">Ngày tạo</th>
                            <th scope="col">Tác vụ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers.map((user, index) => (
                            <tr key={user._id}>
                                <td>
                                    <input type="checkbox" />
                                </td>
                                <th scope="row">
                                    {(currentPage - 1) * itemsPerPage +
                                        index +
                                        1}
                                </th>
                                <td>{user.fullname}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.role === "1" ? "Admin" : "Người dùng"}
                                </td>
                                <td>{formatDateTime(user.createdAt)}</td>
                                <td>
                                    <Link
                                        href={`/admin/edit-user/${user._id}`}
                                        className="btn btn-success btn-sm rounded-0 text-white"
                                        type="button"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="Edit"
                                    >
                                        <i className="fa fa-edit" />
                                    </Link>
                                    <a
                                        onClick={() => handleDelete(user._id)}
                                        className="btn btn-danger btn-sm rounded-0 text-white"
                                        type="button"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="Delete"
                                    >
                                        <i className="fa fa-trash" />
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <PaginationAdmin
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            </div>
        </div>
    );
}
