"use client";
import useSWR from "swr";
import { useState } from "react";
import TableInfoProduct from "@/components/admin-order/TableInfoProduct";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function EditOrder({ params }) {
    const [selectedStatus, setSelectedStatus] = useState("");
    const {
        data: infoOrders,
        error: ordersError,
        mutate,
    } = useSWR(`http://localhost:3000/orders/${params.id}`, fetcher);

    const { data: ordersDetail, error: ordersDetailError } = useSWR(
        `http://localhost:3000/orderDetails/order/${params.id}`,
        fetcher
    );

    if (ordersDetailError || ordersError) return <div>Lỗi khi tải dữ liệu</div>;
    if (!infoOrders || !ordersDetail) return <div>Đang tải...</div>;

    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
    };

    const handleUpdateStatus = async () => {
        if (selectedStatus === "") {
            alert("Vui lòng chọn trạng thái đơn hàng.");
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:3000/orders/${params.id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ status: selectedStatus }),
                }
            );

            if (!response.ok) {
                throw new Error(
                    "Có lỗi xảy ra khi cập nhật trạng thái đơn hàng"
                );
            }

            // Xử lý cập nhật số lượng sản phẩm
            if (infoOrders.status === "0" && selectedStatus === "1") {
                // Trừ số lượng sản phẩm khi chuyển từ "Chờ xác nhận" sang "Đang xử lý"
                await Promise.all(
                    ordersDetail.map(async (item) => {
                        const updateStockResponse = await fetch(
                            `http://localhost:3000/products/${item.productId._id}/update-stock`,
                            {
                                method: "PATCH",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    quantity: -item.od_quantity,
                                }),
                            }
                        );

                        if (!updateStockResponse.ok) {
                            throw new Error(
                                "Có lỗi xảy ra khi cập nhật số lượng sản phẩm"
                            );
                        }
                    })
                );
            } else if (selectedStatus === "4" && infoOrders.status !== "0") {
                // Cộng lại số lượng sản phẩm khi chuyển sang "Đã hủy" từ trạng thái khác "Chờ xác nhận"
                await Promise.all(
                    ordersDetail.map(async (item) => {
                        const updateStockResponse = await fetch(
                            `http://localhost:3000/products/${item.productId._id}/update-stock`,
                            {
                                method: "PATCH",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    quantity: item.od_quantity,
                                }),
                            }
                        );

                        if (!updateStockResponse.ok) {
                            throw new Error(
                                "Có lỗi xảy ra khi cập nhật số lượng sản phẩm"
                            );
                        }
                    })
                );
            }

            // Cập nhật dữ liệu sau khi thành công
            mutate();
            alert("Cập nhật trạng thái đơn hàng thành công!");
        } catch (error) {
            console.error("Error:", error);
            alert("Có lỗi xảy ra khi cập nhật trạng thái đơn hàng");
        }
    };

    let availableStatuses = [];
    switch (infoOrders.status) {
        case "0": // Chờ xác nhận
            availableStatuses = [
                { value: "1", label: "Đang xử lý" },
                { value: "4", label: "Hủy đơn" },
            ];
            break;
        case "1": // Đang xử lý
            availableStatuses = [
                { value: "2", label: "Đang vận chuyển" },
                { value: "4", label: "Hủy đơn" },
            ];
            break;
        case "2": // Đang vận chuyển
            availableStatuses = [{ value: "3", label: "Thành công" }];
            break;
        case "3": // Thành công
        case "4": // Đã hủy
            availableStatuses = []; // Không cho phép cập nhật
            break;
        default:
            availableStatuses = [];
            break;
    }

    function getStatusLabel(status) {
        switch (status) {
            case "0":
                return "Chờ xác nhận";
            case "1":
                return "Đang xử lý";
            case "2":
                return "Đang vận chuyển";
            case "3":
                return "Thành công";
            case "4":
                return "Đã hủy";
            default:
                return "Không xác định";
        }
    }

    return (
        <div className="card">
            <div className="card-header font-weight-bold">
                Chi tiết đơn hàng: {params.id}
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col-9">
                        <div className="text-primary font-weight-bold size-8">
                            <i className="fa-solid fa-signal"></i> Trạng thái
                            đơn:
                            <span className="badge badge-info ml-2 py-2 px-3">
                                {getStatusLabel(infoOrders.status)}
                            </span>
                        </div>

                        {availableStatuses.length > 0 && (
                            <div className="form-action form-inline py-3">
                                <select
                                    className="form-control mr-1"
                                    value={selectedStatus}
                                    onChange={handleStatusChange}
                                >
                                    <option value="">
                                        Cập nhật trạng thái đơn hàng
                                    </option>
                                    {availableStatuses.map((status) => (
                                        <option
                                            key={status.value}
                                            value={status.value}
                                        >
                                            {status.label}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleUpdateStatus}
                                >
                                    Áp dụng
                                </button>
                            </div>
                        )}

                        <TableInfoProduct
                            ordersDetail={ordersDetail}
                            infoOrders={infoOrders}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
