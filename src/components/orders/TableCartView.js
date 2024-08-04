"use client";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
export default function TableCartView() {
    const dispatch = useDispatch();
    const { user, error, isLoading } = useSelector((state) => state.account);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            if (user !== null && user.status === 200 && user.data) {
                const userId = user.data._id;
                const res = await fetch(
                    `http://localhost:3000/orders/user/${userId}`
                );
                const data = await res.json();
                setOrders(data);
            }
        };
        fetchOrders();
    }, [user]);

    function getPaymentMethodLabel(paymentMethod) {
        if (paymentMethod === "0") {
            return "Thanh toán online";
        } else if (paymentMethod === "1") {
            return "Thanh toán khi nhận hàng";
        } else {
            return paymentMethod;
        }
    }
    function getOrderStatusLabel(status) {
        switch (status) {
            case "0":
                return "Đang xử lý";
            case "1":
                return "Đang vận chuyển";
            case "2":
                return "Hoàn thành";
            case "3":
                return "Đã hủy";
            default:
                return status;
        }
    }

    return (
        <>
            {user === null || user.status !== 200 ? (
                <div>Bạn cần đăng nhập để xem đơn hàng của mình!</div>
            ) : (
                <div id="wrapper" className="wp-inner clearfix">
                    <div className="section" id="info-cart-wp">
                        <div className="section-detail table-responsive">
                            <table className="table CartView">
                                <thead>
                                    <tr>
                                        <th>Mã đơn hàng</th>
                                        <th>Số lượng</th>
                                        <th>Tổng tiền</th>
                                        <th>Hình thức thanh toán</th>
                                        <th>Ngày đặt đơn hàng</th>
                                        <th>Trạng thái đơn hàng</th>
                                        <th>Hành động</th>
                                    </tr>
                                </thead>
                                <tbody id="showCartView">
                                    {orders.map((order) => (
                                        <tr key={order._id}>
                                            <td>{order._id}</td>
                                            <td>{order.quantity}</td>
                                            <td>
                                                {order.total.toLocaleString()}đ
                                            </td>
                                            <td>
                                                {getPaymentMethodLabel(
                                                    order.paymentMethod
                                                )}
                                            </td>
                                            <td>
                                                {new Date(
                                                    order.createdAt
                                                ).toLocaleDateString()}
                                            </td>
                                            <td>
                                                {getOrderStatusLabel(
                                                    order.status
                                                )}
                                            </td>
                                            <td>
                                                <button
                                                    class="cancel-order-button"
                                                    data-order-id="${_id}"
                                                >
                                                    {" "}
                                                    {order.status === "0"
                                                        ? "Hủy"
                                                        : "Không thể hủy"}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
