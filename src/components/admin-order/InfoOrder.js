import React from "react";

export default function InfoOrder({ infoOrders }) {
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

    const paymentMethod =
        infoOrders.paymentMethod === "0"
            ? "Thanh toán online"
            : infoOrders.paymentMethod === "1"
            ? "Thanh toán sau khi nhận hàng"
            : "Chưa xác định";
    return (
        <div className="col-3">
            <div className="text-primary">
                <i className="fa-solid fa-circle-question"></i>
                <span className="text-primary font-weight-bold size-8 ml-2">
                    Khách hàng
                </span>
            </div>
            <div className="card">
                <div className="info px-4 py-4">
                    <h5 className="card-title textUppercase">Họ và tên:</h5>
                    <p className="card-text">{infoOrders.fullname}</p>
                    <h5 className="card-title textUppercase">Số điện thoại:</h5>
                    <p className="card-text">{infoOrders.phone}</p>
                    <h5 className="card-title textUppercase">Email</h5>
                    <p className="card-text">{infoOrders.email}</p>
                    <h5 className="card-title textUppercase">Địa chỉ:</h5>
                    <p className="card-text">{infoOrders.address}</p>
                    <h5 className="card-title textUppercase">Ngày đặt hàng</h5>
                    <p className="card-text">
                        {formatDateTime(infoOrders.createdAt)}
                    </p>
                    <h5 className="card-title textUppercase">
                        Phương thức thanh toán
                    </h5>
                    <p className="card-text">{paymentMethod}</p>
                    <h5 className="card-title textUppercase">Chú thích:</h5>
                    <p className="card-text">{infoOrders.note}</p>
                </div>
            </div>
        </div>
    );
}
