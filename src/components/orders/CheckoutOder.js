"use client";
import React, { useMemo, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { clearCart } from "@/redux/slices/cartSlice";

export default function CheckoutOder() {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    const cartItems = useSelector((state) => state.cart?.items) || [];
    const dispatch = useDispatch();
    console.log(cartItems);
    const { user } = useSelector((state) => state.account);
    const router = useRouter();
    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        phone: "",
        address: "",
        note: "",
    });

    useEffect(() => {
        if (user && user.data) {
            setFormData({
                fullname: user.data.fullname,
                email: user.data.email,
                phone: user.data.phone,
                address: user.data.address,
                note: "",
            });
        } else {
            // Nếu user là null, reset lại formData
            setFormData({
                fullname: "",
                email: "",
                phone: "",
                address: "",
                note: "",
            });
        }
    }, [user]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const total = useMemo(
        () =>
            cartItems.reduce(
                (total, item) => total + item.price_new * item.quantity,
                0
            ),
        [cartItems]
    );

    const handlePaymentMethodChange = (event) => {
        setSelectedPaymentMethod(event.target.value);
    };

    const handlePlaceOrder = async () => {
        if (cartItems.length === 0) {
            alert(
                "Giỏ hàng của bạn hiện đang trống. Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán."
            );
            return;
        }

        if (!user) {
            alert("Vui lòng đăng nhập để đặt hàng!");
            router.push("/login");
            return;
        }

        if (!selectedPaymentMethod) {
            alert("Vui lòng chọn phương thức thanh toán!");
            return;
        }

        // Xử lý đặt hàng
        const order = {
            userId: user.data._id,
            fullname: formData.fullname,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            note: formData.note,
            status: "0",
            total: total,
            quantity: cartItems.length,
            paymentMethod: selectedPaymentMethod,
        };

        try {
            // Tạo đơn hàng
            const orderId = await insertCart(order);
            console.log(orderId);

            // Tạo các chi tiết đơn hàng
            const orderDetails = cartItems.map((item) => ({
                orderId: orderId,
                productId: item._id,
                od_quantity: item.quantity,
                od_price: item.price_new,
                od_total: item.price_new * item.quantity,
            }));
            console.log(orderDetails);
            await insertOrderDetail(orderDetails);

            alert("Đặt hàng thành công!");

            // Xóa giỏ hàng và chuyển hướng
            handleClearCart();

            router.push("/");
        } catch (error) {
            console.error(error);
            alert("Đã có lỗi xảy ra. Vui lòng thử lại sau.");
        }
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    // Insert order
    async function insertCart(order) {
        const response = await fetch("http://localhost:3000/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(order),
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Data", data);
            return data.data._id;
        } else {
            console.error("Error :", response.status);
        }
    }

    // Insert order details
    async function insertOrderDetail(orderDetails) {
        const response = await fetch("http://localhost:3000/orderDetails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(orderDetails),
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Data:", data);
        } else {
            console.error("Lỗi order details:", response.status);
        }
    }

    return (
        <>
            <div className="section" id="customer-info-wp">
                <div className="section-head">
                    <h1 className="section-title">Thông tin khách hàng</h1>
                </div>
                <div className="section-detail">
                    <form method="POST" action="" name="form-checkout">
                        <div className="form-row clearfix">
                            <div className="form-col fl-left">
                                <label htmlFor="fullname">Họ tên</label>
                                <input
                                    type="text"
                                    name="fullname"
                                    id="fullname"
                                    value={formData.fullname}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-col fl-right">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="form-row clearfix">
                            <div className="form-col fl-left">
                                <label htmlFor="address">Địa chỉ</label>
                                <input
                                    type="text"
                                    name="address"
                                    id="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-col fl-right">
                                <label htmlFor="phone">Số điện thoại</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    id="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-col">
                                <label htmlFor="notes">Ghi chú</label>
                                <textarea
                                    name="note"
                                    value={formData.note}
                                    onChange={handleInputChange}
                                ></textarea>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="section" id="order-review-wp">
                <div className="section-head">
                    <h1 className="section-title">Thông tin đơn hàng</h1>
                </div>
                <div className="section-detail">
                    <table className="shop-table">
                        <thead>
                            <tr>
                                <td>Sản phẩm</td>
                                <td>Tổng</td>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((product) => (
                                <tr key={product._id} className="cart-item">
                                    <td className="product-name">
                                        {product.name}
                                        <strong className="product-quantity">
                                            x {product.quantity}
                                        </strong>
                                    </td>
                                    <td className="product-total">
                                        {(
                                            product.price_new * product.quantity
                                        ).toLocaleString()}
                                        đ
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr className="order-total">
                                <td>Tổng đơn hàng:</td>
                                <td>
                                    <strong className="total-price">
                                        {total.toLocaleString()}đ
                                    </strong>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                    <div id="payment-checkout-wp">
                        <div className="font-weight-bold text-danger mb-3 text-uppercase">
                            Hình thức thanh toán
                        </div>
                        <ul id="payment_methods">
                            <li>
                                <input
                                    type="radio"
                                    id="direct-payment"
                                    name="payment-method"
                                    value="0"
                                    checked={selectedPaymentMethod === "0"}
                                    onChange={handlePaymentMethodChange}
                                />
                                <label htmlFor="direct-payment">
                                    Thanh toán Online
                                </label>
                            </li>
                            <li>
                                <input
                                    type="radio"
                                    id="payment-home"
                                    name="payment-method"
                                    value="1"
                                    checked={selectedPaymentMethod === "1"}
                                    onChange={handlePaymentMethodChange}
                                />
                                <label htmlFor="payment-home">
                                    Thanh toán tại nhà
                                </label>
                            </li>
                        </ul>
                    </div>
                    <div className="place-order-wp clearfix">
                        <input
                            type="submit"
                            id="order-now"
                            value="Đặt hàng"
                            onClick={handlePlaceOrder}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
