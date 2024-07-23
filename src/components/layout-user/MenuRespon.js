import Link from "next/link";

export default function MenuRespon() {
    return (
        <div id="menu-respon">
            <Link href="home" title="" className="logo">
                VSHOP
            </Link>
            <div id="menu-respon-wp">
                <ul className="" id="main-menu-respon">
                    <li>
                        <Link href="home" title="">
                            Trang chủ
                        </Link>
                    </li>
                    <li>
                        <Link href="category_product" title="">
                            Điện thoại
                        </Link>
                        <ul className="sub-menu">
                            <li>
                                <Link href="category_product" title="">
                                    Iphone
                                </Link>
                            </li>
                            <li>
                                <Link href="category_product" title="">
                                    Samsung
                                </Link>
                                <ul className="sub-menu">
                                    <li>
                                        <Link href="category_product" title="">
                                            Iphone X
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="category_product" title="">
                                            Iphone 8
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <Link href="category_product" title="">
                                    Nokia
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Link href="category_product" title="">
                            Máy tính bảng
                        </Link>
                    </li>
                    <li>
                        <Link href="category_product" title="">
                            Laptop
                        </Link>
                    </li>
                    <li>
                        <Link href="category_product" title="">
                            Đồ dùng sinh hoạt
                        </Link>
                    </li>
                    <li>
                        <Link href="blog" title="">
                            Blog
                        </Link>
                    </li>
                    <li>
                        <Link href="#" title="">
                            Liên hệ
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}
