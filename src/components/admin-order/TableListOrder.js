import Link from "next/link";
export default function TableListOrder(props) {
    const formatDateTime = (dateString) => {
        const options = {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        };
        const date = new Date(dateString);
        return date.toLocaleString("vi-VN", options);
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case "0":
                return "Chờ xử lý";
            case "1":
                return "Đang xử lý";
            case "2":
                return "Đang vận chuyển";
            case "3":
                return "Thành công";
            case "4":
                return "Đã hủy";
            default:
                return "Không xác định";
        }
    };

    const getTimeLabel = (order) => {
        return order.status === "0"
            ? formatDateTime(order.createdAt)
            : formatDateTime(order.updatedAt);
    };
    return (
        <table className="table table-striped table-checkall">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Mã</th>
                    <th scope="col">Khách hàng</th>
                    <th scope="col">Số lượng</th>
                    <th scope="col">Tổng tiền</th>
                    <th scope="col">Trạng thái đơn hàng</th>
                    <th scope="col">Thời gian</th>
                    <th scope="col">Tác vụ</th>
                </tr>
            </thead>
            <tbody>
                {props.data.map((order, index) => (
                    <tr key={order._id}>
                        <td>{index + 1}</td>
                        <td>{order._id}</td>
                        <td>
                            {order.fullname} <br />
                            {order.phone}
                        </td>
                        <td className="font-weight-bold">{order.quantity}</td>
                        <td>{order.total.toLocaleString()}₫</td>
                        <td className="text-center">
                            <span
                                className={`badge ${
                                    order.status === "0"
                                        ? "badge-warning"
                                        : order.status === "1"
                                        ? "badge-primary"
                                        : order.status === "2"
                                        ? "badge-info"
                                        : order.status === "3"
                                        ? "badge-success"
                                        : "badge-danger"
                                }`}
                            >
                                {getStatusLabel(order.status)}
                            </span>
                        </td>
                        <td>{getTimeLabel(order)}</td>
                        <td>
                            <Link
                                href={`/admin/edit-order/${order._id}`}
                                className="btn btn-success btn-sm rounded-0 text-white"
                                type="button"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Edit"
                            >
                                <i className="fa fa-edit" />
                            </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
