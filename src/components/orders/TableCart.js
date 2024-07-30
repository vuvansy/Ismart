"use client";
import Link from "next/link";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    removeFromCart,
    clearCart,
    incrementQuantity,
    decrementQuantity,
} from "@/redux/slices/cartSlice";
import formatNumber from "../../app/utils/utils";
import { useMemo } from "react";

export default function TableCart() {
    const cartItems = useSelector((state) => state.cart?.items) || [];
    const dispatch = useDispatch();

    console.log(cartItems);

    const handleRemoveFromCart = (product) => {
        dispatch(removeFromCart(product));
    };

    const handleIncrementQuantity = (product) => {
        dispatch(incrementQuantity(product));
    };

    const handleDecrementQuantity = (product) => {
        dispatch(decrementQuantity(product));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };
    const total = useMemo(
        () =>
            cartItems.reduce(
                (total, item) => total + item.price_new * item.quantity,
                0
            ),
        [cartItems]
    );

    return (
        <>
            {cartItems.length > 0 ? (
                <div id="wrapper" className="wp-inner clearfix">
                    <div className="section" id="info-cart-wp">
                        <div className="section-detail table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <td>Mã sản phẩm</td>
                                        <td>Ảnh sản phẩm</td>
                                        <td>Tên sản phẩm</td>
                                        <td>Giá sản phẩm</td>
                                        <td>Số lượng</td>
                                        <td colSpan="2">Thành tiền</td>
                                    </tr>
                                </thead>

                                <tbody>
                                    {cartItems.map((product) => (
                                        <tr key={product._id}>
                                            <td>{product._id}</td>
                                            <td>
                                                <a
                                                    href=""
                                                    title=""
                                                    className="thumb"
                                                >
                                                    <img
                                                        src={
                                                            product.product_image
                                                        }
                                                        alt=""
                                                    />
                                                </a>
                                            </td>
                                            <td>
                                                <Link
                                                    href={`/products/${product._id}`}
                                                    title=""
                                                    className="name-product"
                                                >
                                                    {product.name}
                                                </Link>
                                            </td>
                                            <td>
                                                {formatNumber(
                                                    product.price_new
                                                )}
                                                đ
                                            </td>
                                            <td>
                                                <a
                                                    onClick={() =>
                                                        handleDecrementQuantity(
                                                            product._id
                                                        )
                                                    }
                                                    title=""
                                                    id="minus"
                                                >
                                                    <i className="fa fa-minus"></i>
                                                </a>
                                                <input
                                                    type="text"
                                                    name="num-order"
                                                    value={product.quantity}
                                                    className="num-order"
                                                    readOnly
                                                />
                                                <a
                                                    onClick={() =>
                                                        handleIncrementQuantity(
                                                            product._id
                                                        )
                                                    }
                                                    title=""
                                                    id="plus"
                                                >
                                                    <i className="fa fa-plus"></i>
                                                </a>
                                            </td>
                                            <td>
                                                {formatNumber(
                                                    product.price_new *
                                                        product.quantity
                                                )}
                                                đ
                                            </td>
                                            <td>
                                                <a
                                                    onClick={() =>
                                                        handleRemoveFromCart(
                                                            product._id
                                                        )
                                                    }
                                                    title=""
                                                    className="del-product"
                                                >
                                                    <i className="fa fa-trash-o"></i>
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan="3">
                                            <div className="clearfix">
                                                <p
                                                    id="total-price"
                                                    className="fl-left"
                                                >
                                                    <span>
                                                        <Link
                                                            href="/products/categoryProduct/65ef17cecce6ab14801fd9b7"
                                                            title=""
                                                            id="buy-more"
                                                            style={{
                                                                color: "#3f5da6",
                                                                fontWeight:
                                                                    "400",
                                                            }}
                                                        >
                                                            Mua tiếp{" "}
                                                            <i className="fa-solid fa-right-to-bracket"></i>
                                                        </Link>
                                                    </span>
                                                </p>
                                            </div>
                                        </td>
                                        <td colSpan="4">
                                            <div className="clearfix">
                                                <p
                                                    id="total-price"
                                                    className="fl-right"
                                                >
                                                    Tổng giá:{" "}
                                                    <span>
                                                        {formatNumber(total)}đ
                                                    </span>
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="3">
                                            <div className="clearfix">
                                                <p className="fl-left">
                                                    <a
                                                        onClick={
                                                            handleClearCart
                                                        }
                                                        style={{
                                                            background:
                                                                "#827b7b",
                                                            cursor: "pointer",
                                                        }}
                                                        title=""
                                                        id="checkout-cart"
                                                    >
                                                        Xóa giỏ hàng
                                                    </a>
                                                </p>
                                            </div>
                                        </td>
                                        <td colSpan="4">
                                            <div className="clearfix">
                                                <div className="fl-right">
                                                    <Link
                                                        href="checkout"
                                                        title=""
                                                        id="checkout-cart"
                                                    >
                                                        Thanh toán
                                                    </Link>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    Không có sản phẩm nào trong giỏ hàng của bạn nhấn vào{" "}
                    <Link
                        href="/products/categoryProduct/65ef17cecce6ab14801fd9b7"
                        title=""
                        id="buy-more"
                        style={{ color: "red", fontWeight: "700" }}
                    >
                        xem sản phẩm{" "}
                        <i className="fa-solid fa-right-to-bracket"></i>
                    </Link>{" "}
                    để mua hàng!
                </div>
            )}
        </>
    );
}
