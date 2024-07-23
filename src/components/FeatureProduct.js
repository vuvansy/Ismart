"use client";
import Link from "next/link";
import React, { useEffect } from "react";

export default function FeatureProduct(props) {
    useEffect(() => {
        var feature_product = $("#feature-product-wp .list-item");
        feature_product.owlCarousel({
            autoPlay: true,
            navigation: true,
            navigationText: false,
            paginationNumbers: false,
            pagination: false,
            stopOnHover: true,
            items: 4, //10 items above 1000px browser width
            itemsDesktop: [1000, 4], //5 items between 1000px and 901px
            itemsDesktopSmall: [800, 3], // betweem 900px and 601px
            itemsTablet: [600, 2], //2 items between 600 and 0
            itemsMobile: [375, 1], // itemsMobile disabled - inherit from itemsTablet option
        });
    }, []);

    return (
        <div className="section" id="feature-product-wp">
            <div className="section-head">
                <h3 className="section-title">Sản phẩm nổi bật</h3>
            </div>
            <div className="section-detail">
                <ul className="list-item">
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
                                    {product.price_new}đ
                                </span>
                                <span className="old">
                                    {product.price_old}đ
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
    );
}
