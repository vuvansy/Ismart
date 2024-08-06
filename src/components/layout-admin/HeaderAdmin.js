import Link from "next/link";

export default function HeaderAdmin() {
    return (
        <nav className="topnav shadow navbar-light bg-white d-flex">
            <div className="navbar-brand">
                <Link href="/admin"> ADMIN ISMART </Link>
            </div>
            <div className="nav-right">
                <div className="btn-group mr-auto">
                    <button
                        type="button"
                        className="btn dropdown"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        <i className="plus-icon fas fa-plus-circle"></i>
                    </button>
                    <div className="dropdown-menu">
                        <Link
                            className="dropdown-item"
                            href="/admin/add-category"
                        >
                            Thêm danh mục
                        </Link>
                        <Link
                            className="dropdown-item"
                            href="/admin/add-products"
                        >
                            Thêm sản phẩm
                        </Link>
                        <Link className="dropdown-item" href="list-order">
                            Thêm đơn hàng
                        </Link>
                    </div>
                </div>
                <div className="btn-group">
                    <button
                        type="button"
                        className="btn dropdown-toggle"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        Văn Sỹ
                    </button>
                    <div className="dropdown-menu dropdown-menu-right">
                        <Link className="dropdown-item" href="#">
                            Tài khoản
                        </Link>
                        <Link className="dropdown-item" href="#">
                            Thoát
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
