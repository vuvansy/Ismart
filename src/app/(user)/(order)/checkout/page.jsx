import Breadcrumb from "@/components/Breadcrumb";
import CheckoutOder from "@/components/orders/CheckoutOder";

export default function Checkout() {
    return (
        <>
            <Breadcrumb>Thanh toán</Breadcrumb>
            <div id="wrapper" className="wp-inner clearfix">
                <CheckoutOder />
            </div>
        </>
    );
}
