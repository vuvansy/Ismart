"use client";

import formatNumber from "../app/utils/utils";
import Link from "next/link";

export default function ListProduct(props) {
    return (
        <div className="section" id="list-product-wp">
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
                                <a
                                    title="Thêm giỏ hàng"
                                    className="add-cart fl-left"
                                >
                                    Thêm giỏ hàng
                                </a>
                                <a
                                    title="Mua ngay"
                                    className="buy-now fl-right"
                                >
                                    Mua ngay
                                </a>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
