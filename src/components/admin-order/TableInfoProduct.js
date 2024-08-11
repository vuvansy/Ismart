export default function TableInfoProduct({ ordersDetail, infoOrders }) {
    return (
        <div className="card mt-4">
            <div className="card-header font-weight-bold text-primary">
                Thông tin sản phẩm
            </div>
            <div className="card-body">
                <table className="table table-striped table-checkall">
                    <thead>
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Hình ảnh</th>
                            <th scope="col">Tên sản phẩm</th>
                            <th scope="col">Giá</th>
                            <th scope="col">Số lượng</th>
                            <th scope="col">Thành tiền</th>
                        </tr>
                    </thead>
                    <tbody id="placeholder">
                        {ordersDetail.map((item, index) => (
                            <tr key={item.productId._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <img
                                        src={item.productId.product_image}
                                        alt=""
                                        className="thumb_category"
                                    />
                                </td>
                                <td className="title-product">
                                    {item.productId.name}
                                </td>
                                <td>
                                    {item.productId.price_new.toLocaleString()}đ
                                </td>
                                <td className="font-weight-bold">
                                    {item.od_quantity}
                                </td>
                                <td>{item.od_total.toLocaleString()}đ</td>
                            </tr>
                        ))}

                        <tr>
                            <td colSpan={3}></td>
                            <td>
                                <strong>Tổng</strong>
                            </td>
                            <td className="font-weight-bold">
                                {infoOrders.quantity}
                            </td>
                            <td className="font-weight-bold">
                                {infoOrders.total.toLocaleString()}đ
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
