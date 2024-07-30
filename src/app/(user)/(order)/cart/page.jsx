import Breadcrumb from "@/components/Breadcrumb";
import TableCart from "@/components/orders/TableCart";
import Link from "next/link";
import React from "react";

export default function Cart() {
    return (
        <>
            <Breadcrumb>Giỏ hàng</Breadcrumb>
            <div className="ctaShopingCart">
                <Link href="/cart" className="ctaCart mr-2">
                    Giỏ hàng
                </Link>
                <Link href="/cartView" className="ctaCart">
                    Quản lý đơn hàng
                </Link>
            </div>
            <TableCart />
        </>
    );
}
