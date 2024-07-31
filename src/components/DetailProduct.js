"use client";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "@/redux/slices/cartSlice";
import { useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/navigation";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function DetailProduct({ params, id }) {
    const router = useRouter();
    const [quantity, setQuantity] = useState(1);
    //useDispatch() là một React hook cung cấp bởi thư viện Redux.
    //Nó cho phép component truy cập vào dispatch function của Redux store,
    //qua đó component có thể gửi action để thay đổi state của ứng dụng.
    const dispatch = useDispatch();
    //Các component có thể truy cập vào state thông qua useSelector() hook.
    const cart = useSelector((state) => state.cart);
    console.log(cart);

    const {
        data: product,
        error,
        isLoading,
    } = useSWR(`http://localhost:3000/products/${id}`, fetcher, {
        dedupingInterval: 1000,
        //Loại bỏ các yêu cầu trùng lặp lạp có cùng khóa trong khoảng thời gian tính bằng mili giây
        revalidateOnFocus: false,
        revalidateIfStale: false,
    });

    if (error) return <div>Lỗi load dữ liệu.</div>;
    if (isLoading) return <div>Đang tải</div>;

    const handleAddToCart = (product, quantity) => {
        dispatch(addToCart({ item: product, quantity: quantity }));
        console.log("Thêm thành công!");
    };

    const handleBuyNow = (product) => {
        const itemInCart = cart.items.find((item) => item._id === product._id);
        if (itemInCart) {
            dispatch(addToCart({ item: product, quantity: 1 }));
        } else {
            dispatch(addToCart({ item: product, quantity: 1 }));
        }

        router.push("/cart");
    };

    const handleIncrease = () => {
        if (quantity < product.quantity) {
            setQuantity(quantity + 1);
        }
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <div className="main-content fl-right">
            <div className="section" id="detail-product-wp">
                <div className="section-detail clearfix">
                    <div className="thumb-wp fl-left d-flex justify-content-center pt-5">
                        <a href="" title="" id="main-thumb">
                            <img id="zoom" src={product.product_image} />
                        </a>
                    </div>

                    <div className="info fl-right">
                        <h3 className="product-name">{product.name}</h3>
                        <div className="desc">
                            <p>
                                Bộ vi xử lý :Intel Core i505200U 2.2 GHz (3MB
                                L3)
                            </p>
                            <p>Cache upto 2.7 GHz</p>
                            <p>Bộ nhớ RAM :4 GB (DDR3 Bus 1600 MHz)</p>
                            <p>Đồ họa :Intel HD Graphics</p>
                            <p>Ổ đĩa cứng :500 GB (HDD)</p>
                        </div>
                        <div className="num-product">
                            <span className="title">Số lượng: </span>
                            <span className="status">
                                <strong>{product.quantity}</strong>
                            </span>
                        </div>
                        <div className="price">
                            <p className="price-new" id="priceNewDetail">
                                {product.price_new.toLocaleString()}đ
                            </p>
                            <p className="price-old m-0" id="priceOldDetail">
                                {product.price_old.toLocaleString()}đ
                            </p>
                        </div>
                        <div id="num-order-wp">
                            <a
                                onClick={() => handleDecrease()}
                                title=""
                                id="minus"
                            >
                                <i className="fa fa-minus"></i>
                            </a>

                            <input
                                type="text"
                                name="num-order"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                id="num-order"
                            />

                            <a
                                onClick={() => handleIncrease()}
                                title=""
                                id="plus"
                            >
                                <i className="fa fa-plus"></i>
                            </a>
                        </div>
                        <a
                            style={{ background: "#8d8787" }}
                            title="Thêm giỏ hàng"
                            className="add-cart"
                            onClick={() => handleAddToCart(product, quantity)}
                        >
                            <i className="fa-solid fa-cart-plus"></i>
                        </a>
                        <a
                            title="Mua ngay"
                            className="add-cart ml-2"
                            onClick={() => handleBuyNow(product)}
                        >
                            Mua ngay
                        </a>
                    </div>
                </div>
            </div>
            <div className="section" id="post-product-wp">
                <div className="section-head">
                    <h3 className="section-title">Mô tả sản phẩm</h3>
                </div>
                <div className="section-detail">
                    <p>{product.description}</p>
                </div>
            </div>
        </div>
    );
}
