import Link from "next/link";

export default function HeaderUser() {
    return (
        <div id="header-wp">
            <div id="head-top" className="clearfix">
                <div className="wp-inner">
                    <Link
                        href=""
                        title=""
                        id="payment-link"
                        className="fl-left"
                    >
                        Hình thức thanh toán
                    </Link>
                    <div id="main-menu-wp" className="fl-right">
                        <ul id="main-menu" className="clearfix">
                            <li>
                                <Link href="home.html" title="">
                                    Trang chủ
                                </Link>
                            </li>
                            <li>
                                <Link href="category_product.html" title="">
                                    Sản phẩm
                                </Link>
                            </li>
                            <li>
                                <Link href="blog.html" title="">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="detail_blog.html" title="">
                                    Giới thiệu
                                </Link>
                            </li>
                            <li>
                                <Link href="login.html" title="">
                                    Đăng nhập
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div id="head-body" className="clearfix">
                <div className="wp-inner">
                    <Link href="/" title="" id="logo" className="fl-left">
                        <img src="/images/logo.png" />
                    </Link>
                    <div id="search-wp" className="fl-left">
                        <form method="POST" action="">
                            <input
                                type="text"
                                name="s"
                                id="s"
                                placeholder="Nhập từ khóa tìm kiếm tại đây!"
                            />
                            <button type="submit" id="sm-s">
                                Tìm kiếm
                            </button>
                        </form>
                    </div>
                    <div id="action-wp" className="fl-right">
                        <div id="advisory-wp" className="fl-left">
                            <span className="title">Tư vấn</span>
                            <span className="phone">0987.654.321</span>
                        </div>
                        <div id="btn-respon" className="fl-right">
                            <i className="fa fa-bars" aria-hidden="true"></i>
                        </div>
                        <Link
                            href="cart"
                            title="giỏ hàng"
                            id="cart-respon-wp"
                            className="fl-right"
                        >
                            <i
                                className="fa fa-shopping-cart"
                                aria-hidden="true"
                            ></i>
                            <span id="num">2</span>
                        </Link>
                        <div id="cart-wp" className="fl-right">
                            <div id="btn-cart">
                                <i
                                    className="fa fa-shopping-cart"
                                    aria-hidden="true"
                                ></i>
                                <span id="num">2</span>
                            </div>
                            <div id="dropdown">
                                <p className="desc">
                                    Có <span>2 sản phẩm</span> trong giỏ hàng
                                </p>
                                <ul className="list-cart">
                                    <li className="clearfix">
                                        <Link
                                            href=""
                                            title=""
                                            className="thumb fl-left"
                                        >
                                            <img
                                                src="/images/img-pro-11.png"
                                                alt=""
                                            />
                                        </Link>
                                        <div className="info fl-right">
                                            <Link
                                                href=""
                                                title=""
                                                className="product-name"
                                            >
                                                Sony Express X6
                                            </Link>
                                            <p className="price">6.250.000đ</p>
                                            <p className="qty">
                                                Số lượng: <span>1</span>
                                            </p>
                                        </div>
                                    </li>
                                    <li className="clearfix">
                                        <Link
                                            href=""
                                            title=""
                                            className="thumb fl-left"
                                        >
                                            <img
                                                src="/images/img-pro-23.png"
                                                alt=""
                                            />
                                        </Link>
                                        <div className="info fl-right">
                                            <Link
                                                href=""
                                                title=""
                                                className="product-name"
                                            >
                                                Laptop Lenovo 10
                                            </Link>
                                            <p className="price">16.250.000đ</p>
                                            <p className="qty">
                                                Số lượng: <span>1</span>
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                                <div className="total-price clearfix">
                                    <p className="title fl-left">Tổng:</p>
                                    <p className="price fl-right">
                                        18.500.000đ
                                    </p>
                                </div>
                                <dic className="action-cart clearfix">
                                    <Link
                                        href="cart.html"
                                        title="Giỏ hàng"
                                        className="view-cart fl-left"
                                    >
                                        Giỏ hàng
                                    </Link>
                                    <Link
                                        href="checkout.html"
                                        title="Thanh toán"
                                        className="checkout fl-right"
                                    >
                                        Thanh toán
                                    </Link>
                                </dic>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
