"use client";
import useSWR from "swr";
import Link from "next/link";
import PaginationAdmin from "@/components/layout-admin/PaginationAdmin";
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function warningProducts() {
    const {
        data: products,
        error: productsError,
        mutate,
    } = useSWR("http://localhost:3000/products/quantity", fetcher);

    if (productsError) return <div>Lỗi khi tải dữ liệu</div>;
    if (!products) return <div>Đang tải...</div>;
    return (
        <div className="card">
            <div className="card-header font-weight-bold d-flex justify-content-between align-items-center">
                <h5 className="m-0">Danh sách sản phẩm sắp hết</h5>
            </div>
            <div className="card-body">
                <table className="table table-striped table-checkall">
                    <thead>
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Mã loại</th>
                            <th scope="col">Hình ảnh</th>
                            <th scope="col">Tên loại</th>
                            <th scope="col">Tồn kho</th>
                            <th scope="col">Thêm</th>
                        </tr>
                    </thead>
                    <tbody id="placeholder">
                        {products.map((product, index) => (
                            <tr key={product._id}>
                                <td>{index + 1}</td>
                                <td>{product._id}</td>
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
                                <td>
                                    <span className="badge badge-danger">
                                        {product.quantity}
                                    </span>
                                </td>
                                <td>
                                    <Link
                                        href={`/admin/edit-products/${product._id}`}
                                        className="btn btn-success btn-sm rounded-0 text-white mr-1"
                                        type="button"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="Chỉnh sửa"
                                    >
                                        <i className="fa fa-edit"></i>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <PaginationAdmin />
            </div>
        </div>
    );
}
