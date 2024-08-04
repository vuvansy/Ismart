"use client";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useRef } from "react";
import { setCartItems } from "@/redux/slices/cartSlice";
export default function MiniCart() {
    const dispatch = useDispatch();

    const cartItems = useSelector((state) => state.cart?.items) || [];
    // console.log(cartItems);

    useEffect(() => {
        const cartItems = localStorage.getItem("cartItems");
        if (cartItems) {
            dispatch(setCartItems(JSON.parse(cartItems)));
        }
    }, [dispatch]);

    const cartCount = cartItems.reduce(
        (count, item) => count + Number(item.quantity),
        0
    );

    const total = useMemo(
        () =>
            cartItems.reduce(
                (total, item) => total + item.price_new * item.quantity,
                0
            ),
        [cartItems]
    );

    useEffect(() => {
        const btnRespon = document.getElementById("btn-respon");
        const site = document.getElementById("site");
        const mainMenuRespon = document.getElementById("main-menu-respon");

        const handleClick = (event) => {
            if (event.target.closest("#btn-respon i")) {
                site.classList.toggle("show-respon-menu");
            } else if (!event.target.closest("#main-menu-respon")) {
                site.classList.remove("show-respon-menu");
            }
        };

        // Add arrow icons to sub-menu items
        const subMenuItems = mainMenuRespon.querySelectorAll("li .sub-menu");
        subMenuItems.forEach((item) => {
            const arrow = document.createElement("span");
            arrow.classList.add("fa", "fa-angle-right", "arrow");
            item.parentElement.appendChild(arrow);
        });

        // Handle click on arrow icons
        const arrowIcons = mainMenuRespon.querySelectorAll("li .arrow");
        arrowIcons.forEach((arrow) => {
            arrow.addEventListener("click", (event) => {
                event.stopPropagation();
                const li = arrow.parentElement;
                if (li.classList.contains("open")) {
                    li.classList.remove("open");
                } else {
                    const openLi = mainMenuRespon.querySelector("li.open");
                    if (openLi) {
                        openLi.classList.remove("open");
                    }
                    li.classList.add("open");
                }
            });
        });

        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
            arrowIcons.forEach((arrow) => {
                arrow.removeEventListener("click", (event) => {
                    event.stopPropagation();
                });
            });
        };
    }, []);

    return (
        <>
            <div id="btn-respon" className="fl-right">
                <i className="fa fa-bars" aria-hidden="true"></i>
            </div>
            <Link
                href="/cart"
                title="giỏ hàng"
                id="cart-respon-wp"
                className="fl-right"
            >
                <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                <span id="num">{cartItems.length}</span>
            </Link>
            <div id="cart-wp" className="fl-right">
                <div id="btn-cart">
                    <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                    <span id="num">{cartItems.length}</span>
                </div>

                <div id="dropdown">
                    <p className="desc">
                        Có <span>{cartCount} sản phẩm</span> trong giỏ hàng
                    </p>
                    <ul className="list-cart">
                        {cartItems.map((product) => (
                            <li className="clearfix" key={product._id}>
                                <a href="" title="" className="thumb fl-left">
                                    <img src={product.product_image} alt="" />
                                </a>
                                <div className="info fl-right">
                                    <a
                                        href=""
                                        title=""
                                        className="product-name line-clamp"
                                    >
                                        {product.name}
                                    </a>
                                    <p className="price">
                                        {(product.price_new).toLocaleString()}đ
                                    </p>
                                    <p className="qty">
                                        Số lượng:{" "}
                                        <span>{product.quantity}</span>
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="total-price clearfix">
                        <p className="title fl-left">Tổng:</p>
                        <p className="price fl-right">{total.toLocaleString()}đ</p>
                    </div>

                    <div className="action-cart clearfix">
                        <Link
                            href="/cart"
                            title="Giỏ hàng"
                            className="view-cart fl-left"
                        >
                            Giỏ hàng
                        </Link>
                        <Link
                            href="/checkout"
                            title="Thanh toán"
                            className="checkout fl-right"
                        >
                            Thanh toán
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
