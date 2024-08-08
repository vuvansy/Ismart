"use client";
import useSWR from "swr";
import Link from "next/link";
import { useState, useEffect } from "react";
import PaginationAdmin from "@/components/layout-admin/PaginationAdmin";
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ListProducts() {
    const [isDeleting, setIsDeleting] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const {
        data: products,
        error: productsError,
        mutate,
    } = useSWR("http://localhost:3000/products", fetcher);

    const { data: category, error: categoryError } = useSWR(
        "http://localhost:3000/categories",
        fetcher
    );

    // Tạo object để lưu trữ tên danh mục cho từng sản phẩm
    const categoryNames = {};
    if (category) {
        category.forEach((item) => {
            categoryNames[item._id] = item.name;
        });
    }

    const deleteProduct = async (id) => {
        const confirmDelete = window.confirm(
            "Bạn có chắc chắn muốn xóa sản phẩm này không?"
        );
        if (!confirmDelete) {
            return;
        }
        setIsDeleting(true);
        try {
            const res = await fetch(
                `http://localhost:3000/products/delete/${id}`,
                {
                    method: "DELETE",
                }
            );
            if (res.ok) {
                setSuccessMessage("Xóa sản phẩm thành công!");
                // Gọi mutate để làm mới dữ liệu
                mutate();
            } else {
                console.error("Error deleting product");
            }
        } catch (error) {
            console.error("Error deleting product:", error);
        } finally {
            setIsDeleting(false);
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

    if (productsError || categoryError) return <div>Lỗi khi tải dữ liệu</div>;
    if (!products || !category) return <div>Đang tải...</div>;

    // Tìm kiếm sản phẩm theo name, _id
    const filteredProducts = products.filter(
        (product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product._id.toString().includes(searchQuery)
    );

    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = filteredProducts.slice(
        indexOfFirstProduct,
        indexOfLastProduct
    );
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    return (
        <div className="card">
            <div className="card-header font-weight-bold d-flex justify-content-between align-items-center">
                <h5 className="m-0">Danh sách sản phẩm</h5>
                <div className="form-search form-inline">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                        }}
                    >
                        <input
                            type="text"
                            className="form-control form-search"
                            placeholder="Tìm kiếm sản phẩm..."
                            value={searchQuery}
                            // onChange={(e) => setSearchQuery(e.target.value)}
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
                            <th scope="col">ID</th>
                            <th scope="col">Ảnh</th>
                            <th scope="col">Tên sản phẩm</th>
                            <th scope="col">Giảm giá</th>
                            <th scope="col">Đơn giá</th>
                            <th scope="col">Số lượng</th>
                            <th scope="col">Loại hàng</th>
                            <th scope="col">Tác vụ</th>
                        </tr>
                    </thead>
                    <tbody id="placeholder">
                        {currentProducts.map((product, index) => (
                            <tr className="" key={product._id}>
                                <td>{indexOfFirstProduct + index + 1}</td>
                                <td className="id_product">{product._id}</td>
                                <td>
                                    <img
                                        src={product.product_image}
                                        alt=""
                                        className="thumb_category"
                                    />
                                </td>
                                <td className="title-product">
                                    <a>{product.name}</a>
                                </td>
                                <td>{product.price_new.toLocaleString()}₫</td>
                                <td>{product.price_old.toLocaleString()}₫</td>
                                <td>
                                    <span className="badge badge-success">
                                        {product.quantity}
                                    </span>
                                </td>
                                <td>{categoryNames[product.categoryId]}</td>
                                {/* <td>{product.categoryId.name}</td> tùy tuộc vào API */}
                                <td>
                                    <Link
                                        href={`/admin/edit-products/${product._id}`}
                                        className="btn btn-success btn-sm rounded-0 text-white mr-1"
                                        type="button"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="Edit"
                                    >
                                        <i className="fa fa-edit"></i>
                                    </Link>
                                    <a
                                        className="btn btn-danger btn-sm rounded-0 text-white"
                                        type="button"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="Delete"
                                        onClick={() =>
                                            deleteProduct(product._id)
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
