"use client";
import useSWR from "swr";
import React from "react";
import { Chart as ChartJS, defaults, plugins } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
const fetcher = (url) => fetch(url).then((res) => res.json());

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

export default function Chart() {
    const {
        data: orders,
        error: ordersError,
        mutate,
    } = useSWR("http://localhost:3000/orders", fetcher);

    const { data: products, error: productsError } = useSWR(
        "http://localhost:3000/products",
        fetcher
    );

    const { data: orderDetails, error: orderDetailsError } = useSWR(
        "http://localhost:3000/orderDetails",
        fetcher
    );
    if (ordersError || productsError || orderDetailsError)
        return <div>Lỗi khi tải dữ liệu</div>;
    if (!orders || !products || !orderDetails) return <div>Đang tải...</div>;

    // Tính toán doanh thu theo tháng từ các đơn hàng thành công
    const monthlyRevenue = new Array(12).fill(0);
    orders.forEach((order) => {
        if (order.status === "3") {
            const total = parseFloat(order.total);
            if (!isNaN(total)) {
                const month = new Date(order.updatedAt).getMonth(); // 0-based month
                monthlyRevenue[month] += total;
            } else {
                console.warn(
                    `Invalid total value for order ${order._id}:`,
                    order.total
                );
            }
        }
    });
    // console.log(monthlyRevenue);

    // Tạo mảng để lưu số lượng đơn hàng cho mỗi trạng thái theo tháng
    const monthlySuccessOrders = new Array(12).fill(0);
    const monthlyShippingOrders = new Array(12).fill(0);
    const monthlyCancelledOrders = new Array(12).fill(0);

    // Duyệt qua tất cả các đơn hàng và phân loại theo trạng thái
    orders.forEach((order) => {
        const month = new Date(order.updatedAt).getMonth(); // 0-based month
        switch (order.status) {
            case "2": // Đang vận chuyển
                monthlyShippingOrders[month]++;
                break;

            case "3": // Thành công
                monthlySuccessOrders[month]++;
                break;
            case "4": // Đã hủy
                monthlyCancelledOrders[month]++;
                break;
            default:
                break;
        }
    });
    return (
        <div className="card-body">
            <div className="row">
                <div className="col-6 h-50">
                    <div className="text-primary font-weight-bold size-8">
                        <Bar
                            data={{
                                labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                                datasets: [
                                    {
                                        label: "Doanh thu theo tháng",
                                        data: monthlyRevenue,
                                        backgroundColor:
                                            "rgba( 210, 105, 30, 1 )",
                                        borderRadius: 5,
                                    },
                                ],
                            }}
                            options={{
                                plugins: {
                                    title: {
                                        display: true,
                                        text: "Doanh Thu Theo Tháng",
                                        padding: {
                                            top: 10,
                                            bottom: 30,
                                        },
                                    },
                                },
                            }}
                        />
                    </div>
                </div>
                <div className="col-6 h-50">
                    <div className="text-primary font-weight-bold size-8">
                        <Bar
                            data={{
                                labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                                datasets: [
                                    {
                                        label: "Đơn đang vận chuyển",
                                        data: monthlyShippingOrders,
                                        backgroundColor:
                                            "rgba( 30, 144, 255, 1 )",
                                    },
                                    {
                                        label: "Đơn thành công",
                                        data: monthlySuccessOrders,
                                        backgroundColor: "rgba( 0, 100, 0, 1 )",
                                    },

                                    {
                                        label: "Đơn Hủy",
                                        data: monthlyCancelledOrders,
                                        backgroundColor:
                                            "rgba( 178, 34, 34, 1 )",
                                    },
                                ],
                            }}
                            options={{
                                plugins: {
                                    title: {
                                        display: true,
                                        text: "Đơn hàng theo tháng",
                                        padding: {
                                            top: 10,
                                            bottom: 30,
                                        },
                                    },
                                },
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
