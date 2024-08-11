"use client";
import Analytic from "@/components/admin-order/Analytic";
import TableListOrder from "@/components/admin-order/TableListOrder";
import PaginationAdmin from "@/components/layout-admin/PaginationAdmin";
import { useState } from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function OrderStatus({ params }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const { data: orders, error: ordersError } = useSWR(
        `http://localhost:3000/orders/status/${params.id}`,
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
                <Analytic />
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
