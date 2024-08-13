"use client";
import useSWR from "swr";
import TableListOrder from "@/components/admin-order/TableListOrder";
import PaginationAdmin from "@/components/layout-admin/PaginationAdmin";
import Statistical from "@/components/admin-order/OrderStatusCard";

const fetcher = (url) => fetch(url).then((res) => res.json());
export default function Home() {
    const {
        data: orders,
        error: ordersError,
        mutate,
    } = useSWR("http://localhost:3000/orders", fetcher);

    const { data: products, error: productsError } = useSWR(
        "http://localhost:3000/products",
        fetcher
    );

    const { data: orderDetails, error: orderDetailsError } = useSWR(
        "http://localhost:3000/orderDetails",
        fetcher
    );
    // console.log(orderDetails);

    if (ordersError || productsError || orderDetailsError)
        return <div>Lỗi khi tải dữ liệu</div>;
    if (!orders || !products || !orderDetails) return <div>Đang tải...</div>;
    const statusCounts = orders.reduce(
        (acc, order) => {
            switch (order.status) {
                case "0":
                    acc.pending++;
                    break;
                case "1":
                    acc.processing++;
                    break;
                case "2":
                    acc.shipping++;
                    break;
                case "3":
                    acc.completed++;
                    break;
                case "4":
                    acc.cancelled++;
                    break;
                default:
                    break;
            }
            return acc;
        },
        { pending: 0, processing: 0, shipping: 0, completed: 0, cancelled: 0 }
    );

    // Lọc danh sách đơn hàng mới với trạng thái "chờ xử lý" (status = "0")
    const processingOrders = orders.filter((order) => order.status === "0");

    // Tính tổng sản phẩm trong kho
    const totalProductsInStock = products.reduce(
        (total, product) => total + product.quantity,
        0
    );

    // Lọc tính toán doanh số từ các đơn hàng thành công
    const totalRevenue = orders
        .filter((order) => order.status === "3")
        .reduce((total, order) => total + order.total, 0);

    // Tính toán tổng số lượng sản phẩm bán ra từ các đơn hàng đang vận chuyển và thành công
    const totalProductsSold = orders
        .filter((order) => order.status === "2" || order.status === "3")
        .reduce((total, order) => {
            // Lọc chi tiết đơn hàng theo orderId
            const details = orderDetails.filter(
                (detail) => detail.orderId === order._id
            );
            // Tính tổng số lượng sản phẩm trong đơn hàng
            return (
                total +
                details.reduce((sum, detail) => sum + detail.od_quantity, 0)
            );
        }, 0);

    return (
        <div className="container-fluid">
            <div className="row">
                <Statistical
                    bgColor="bg-success"
                    headerText="ĐƠN HÀNG THÀNH CÔNG"
                    count={`${statusCounts.completed} ĐƠN`}
                    bodyText="Đơn hàng giao dịch thành công"
                />
                <Statistical
                    bgColor="bg-primary"
                    headerText="ĐANG XỬ LÝ"
                    count={`${statusCounts.processing} ĐƠN`}
                    bodyText="Số lượng đơn hàng đang xử lý"
                />
                <Statistical
                    bgColor="bg-info"
                    headerText="ĐANG VẬN CHUYỂN"
                    count={`${statusCounts.shipping} ĐƠN`}
                    bodyText="Doanh số hệ thống"
                />
                <Statistical
                    bgColor="bg-danger"
                    headerText="ĐƠN HÀNG HỦY"
                    count={`${statusCounts.cancelled} ĐƠN`}
                    bodyText="Số đơn bị hủy trong hệ thống"
                />
            </div>
            <div className="row">
                <Statistical
                    bgColor="bg-warning"
                    headerText="DOANH SỐ"
                    count={`${totalRevenue.toLocaleString()} VNĐ`}
                    bodyText="Doanh số hệ thống"
                />
                <Statistical
                    bgColor="bg-dark"
                    headerText="TỔNG SẢN PHẨM TRONG KHO"
                    count={`${totalProductsInStock} SẢN PHẨM`}
                    bodyText="Số lượng sản phẩm trong kho"
                />
                <Statistical
                    bgColor="bg-light text-dark"
                    headerText="TỔNG SẢN PHẨM BÁN RA"
                    count={`${totalProductsSold} SẢN PHẨM`}
                    bodyText="Số lượng sản phẩm bán ra"
                />
                <Statistical
                    bgColor="bg-secondary"
                    headerText="TỔNG ĐƠN HÀNG"
                    count={`${totalProductsSold} ĐƠN`}
                    bodyText="Tổng số đơn hàng"
                />
            </div>
            <div className="card">
                <div className="card-header font-weight-bold">ĐƠN HÀNG MỚI</div>
                <div className="card-body">
                    <TableListOrder data={processingOrders} />
                    <PaginationAdmin />
                </div>
            </div>
        </div>
    );
}
