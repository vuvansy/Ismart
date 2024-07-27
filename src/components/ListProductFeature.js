import Link from "next/link";
import React from "react";
import formatNumber from "../app/utils/utils";

export default function ListProductFeature(props) {
    return (
        <>
            <div className="section" id="list-product-wp">
                <div className="section-head">
                    <h3 className="section-title pt-4">{props.children}</h3>
                </div>
                <div className="section-detail">
                    <ul className="list-item clearfix">
                        {props.data.map((product) => (
                            <li key={product._id}>
                                <Link
                                    href={`/products/${product._id}`}
                                    title=""
                                    className="thumb"
                                >
                                    <img src={product.product_image} />
                                </Link>
                                <Link
                                    href={`/products/${product._id}`}
                                    title=""
                                    className="product-name line-clamp"
                                >
                                    {product.name}
                                </Link>
                                <div className="price">
                                    <span className="new">
                                        {formatNumber(product.price_new)}đ
                                    </span>
                                    <span className="old">
                                        {formatNumber(product.price_old)}đ
                                    </span>
                                </div>
                                <div className="action clearfix">
                                    <Link
                                        href="/cart"
                                        title="Thêm giỏ hàng"
                                        className="add-cart fl-left"
                                    >
                                        Thêm giỏ hàng
                                    </Link>
                                    <Link
                                        href="/checkout"
                                        title="Mua ngay"
                                        className="buy-now fl-right"
                                    >
                                        Mua ngay
                                    </Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}
