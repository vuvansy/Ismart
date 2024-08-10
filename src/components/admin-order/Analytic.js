"use client";
import useSWR from "swr";
import Link from "next/link";

const fetcher = (url) => fetch(url).then((res) => res.json());
export default function Analytic() {
    const {
        data: orders,
        error: ordersError,
        mutate,
    } = useSWR("http://localhost:3000/orders", fetcher);

    if (ordersError) return <div>Lỗi khi tải dữ liệu</div>;
    if (!orders) return <div>Đang tải...</div>;

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

    return (
        <div>
            <div className="analytic">
                <Link href="/admin/list-order" className="text-primary">
                    Tất cả
                    <span className="text-muted">({orders.length})</span>
                </Link>
                <Link href="/admin/list-order/0" className="text-primary ml-2">
                    Chờ xác nhận
                    <span className="text-muted">({statusCounts.pending})</span>
                </Link>
                <Link href="/admin/list-order/1" className="text-primary ml-2">
                    Đang xử lý
                    <span className="text-muted">
                        ({statusCounts.processing})
                    </span>
                </Link>
                <Link href="/admin/list-order/2" className="text-info ml-2">
                    Đang vận chuyển
                    <span className="text-muted">
                        ({statusCounts.shipping})
                    </span>
                </Link>
                <Link href="/admin/list-order/3" className="text-success ml-2">
                    Thành công
                    <span className="text-muted">
                        ({statusCounts.completed})
                    </span>
                </Link>
                <Link href="/admin/list-order/4" className="text-danger ml-2">
                    Đã hủy
                    <span className="text-muted">
                        ({statusCounts.cancelled})
                    </span>
                </Link>
            </div>
        </div>
    );
}
