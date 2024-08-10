"use client";
import useSWR from "swr";

import { useState } from "react";
import Analytic from "@/components/admin-order/Analytic";
import TableListOrder from "@/components/admin-order/TableListOrder";
import PaginationAdmin from "@/components/layout-admin/PaginationAdmin";
const fetcher = (url) => fetch(url).then((res) => res.json());
export default function ListOrder() {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const { data: orders, error: ordersError } = useSWR(
        "http://localhost:3000/orders",
        fetcher
    );

    if (ordersError) return <div>Lỗi khi tải dữ liệu</div>;
    if (!orders) return <div>Đang tải...</div>;

    const filteredOrders = orders.filter(
        (order) =>
            order.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order._id.toString().includes(searchQuery) ||
            order.phone.includes(searchQuery)
    );

    const indexOfLastOrder = currentPage * itemsPerPage;
    const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
    const currentOrders = filteredOrders.slice(
        indexOfFirstOrder,
        indexOfLastOrder
    );

    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

    return (
        <div className="card">
            <div className="card-header font-weight-bold d-flex justify-content-between align-items-center">
                <h5 className="m-0 ">Danh sách đơn hàng</h5>
                <div className="form-search form-inline">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                        }}
                    >
                        <input
                            type="text"
                            className="form-control form-search"
                            placeholder="Tìm kiếm đơn hàng..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setCurrentPage(1);
                            }}
                        />
                    </form>
                </div>
            </div>
            <div className="card-body">
                <div className="analytic" id="listStatus">
                    <a href="" className="text-primary font-weight-bold">
                        Đang xử lý
                        <span className="text-muted" id="muted0">
                            (10)
                        </span>
                    </a>
                    <a href="" className="text-primary font-weight-bold">
                        Đang vận chuyển
                        <span className="text-muted" id="muted1">
                            (5)
                        </span>
                    </a>
                    <a href="" className="text-success font-weight-bold">
                        Hoàn thành
                        <span className="text-muted" id="muted2">
                            (20)
                        </span>
                    </a>
                    <a href="" className="text-danger font-weight-bold">
                        Đã hủy
                        <span className="text-muted" id="muted3">
                            (20)
                        </span>
                    </a>
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
                <TableListOrder data={currentOrders} />
                <PaginationAdmin
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            </div>
        </div>
    );
}
