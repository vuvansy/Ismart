import Link from "next/link";
import Search from "./Search";
import MiniCart from "../orders/MiniCart";

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
                                <Link href="/" title="">
                                    Trang chủ
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={`/products/categoryProduct/${"65ef17cecce6ab14801fd9b7"}`}
                                    title=""
                                >
                                    Sản phẩm
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" title="">
                                    Giới thiệu
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" title="">
                                    Liên hệ
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
                    <Search />
                    <div id="action-wp" className="fl-right">
                        <div id="advisory-wp" className="fl-left">
                            <span className="title">Tư vấn</span>
                            <span className="phone">0987.654.321</span>
                        </div>
                        <MiniCart />
                    </div>
                </div>
            </div>
        </div>
    );
}
