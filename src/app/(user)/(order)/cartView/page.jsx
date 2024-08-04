import Breadcrumb from "@/components/Breadcrumb";
import TableCartView from "@/components/orders/TableCartView";

import Link from "next/link";
export default function CartView() {
    return (
        <>
            <Breadcrumb>Quản lý đơn hàng</Breadcrumb>
            <div className="ctaShopingCart">
                <Link href="/cart" className="ctaCart mr-2">
                    Giỏ hàng
                </Link>
                <Link href="/cartView" className="ctaCart">
                    Quản lý đơn hàng
                </Link>
            </div>
            <TableCartView />
        </>
    );
}
