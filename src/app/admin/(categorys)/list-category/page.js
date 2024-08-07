"use client";
import useSWR from "swr";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import PaginationAdmin from "@/components/layout-admin/PaginationAdmin";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ListCategory() {
    const [isDeleting, setIsDeleting] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const {
        data: categorys,
        error: categoryError,
        mutate,
    } = useSWR("http://localhost:3000/categories", fetcher);

    const deleteCategory = async (id) => {
        const confirmDelete = window.confirm(
            "Bạn có chắc chắn muốn xóa danh mục này không?"
        );
        if (!confirmDelete) return;

        setIsDeleting(true);
        try {
            const res = await fetch(
                `http://localhost:3000/categories/delete/${id}`,
                { method: "DELETE" }
            );
            if (res.ok) {
                setSuccessMessage("Xóa danh mục thành công!");
                mutate(); // Gọi mutate để làm mới dữ liệu
            } else {
                console.error("Lỗi khi xóa category");
            }
        } catch (error) {
            console.error("Lỗi khi xóa category:", error);
        } finally {
            setIsDeleting(false);
        }
    };

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => setSuccessMessage(""), 5000);
            return () => clearTimeout(timer);
        }
    }, [successMessage]);

    if (categoryError) return <div>Lỗi khi tải dữ liệu</div>;
    if (!categorys) return <div>Đang tải...</div>;

    // Tìm kiếm danh mục
    const filteredCategories = categorys.filter(
        (category) =>
            category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            category._id.toString().includes(searchQuery)
    );

    // Phân trang danh mục
    const indexOfLastCategory = currentPage * itemsPerPage;
    const indexOfFirstCategory = indexOfLastCategory - itemsPerPage;
    const currentCategories = filteredCategories.slice(
        indexOfFirstCategory,
        indexOfLastCategory
    );

    // Tính tổng số trang
    const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

    return (
        <div className="card">
            <div className="card-header font-weight-bold d-flex justify-content-between align-items-center">
                <h5 className="m-0">Danh mục sản phẩm</h5>
                <div className="form-search form-inline">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                        }}
                    >
                        <input
                            type="text"
                            className="form-control form-search"
                            placeholder="Tìm kiếm danh mục..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setCurrentPage(1); // Reset về trang đầu khi tìm kiếm
                            }}
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
                <table className="table table-striped table-checkall">
                    <thead>
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Mã loại</th>
                            <th scope="col">Hình ảnh</th>
                            <th scope="col">Tên loại</th>
                            <th scope="col">Tác vụ</th>
                        </tr>
                    </thead>
                    <tbody id="placeholder">
                        {currentCategories.map((category, index) => (
                            <tr key={category._id}>
                                <td>{indexOfFirstCategory + index + 1}</td>
                                <td>{category._id}</td>
                                <td>
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        className="thumb_category"
                                    />
                                </td>
                                <td>{category.name}</td>
                                <td>
                                    <Link
                                        href={`/admin/edit-category/${category._id}`}
                                        className="btn btn-success btn-sm rounded-0 text-white mr-1"
                                        type="button"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="Chỉnh sửa"
                                    >
                                        <i className="fa fa-edit"></i>
                                    </Link>
                                    <a
                                        className="btn btn-danger btn-sm rounded-0 text-white"
                                        type="button"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="Xóa"
                                        onClick={() =>
                                            deleteCategory(category._id)
                                        }
                                        disabled={isDeleting}
                                    >
                                        <i className="fa fa-trash"></i>
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
