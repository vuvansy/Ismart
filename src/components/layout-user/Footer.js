export default function Footer() {
    return (
        <div id="footer-wp">
            <div id="foot-body">
                <div className="wp-inner clearfix">
                    <div className="block" id="info-company">
                        <h3 className="title">ISMART</h3>
                        <p className="desc">
                            ISMART luôn cung cấp luôn là sản phẩm chính hãng có
                            thông tin rõ ràng, chính sách ưu đãi cực lớn cho
                            khách hàng có thẻ thành viên.
                        </p>
                        <div id="payment">
                            <div className="thumb">
                                <img src="/images/img-foot.png" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="block menu-ft" id="info-shop">
                        <h3 className="title">Thông tin cửa hàng</h3>
                        <ul className="list-item">
                            <li>
                                <p>106 - Trần Bình - Cầu Giấy - Hà Nội</p>
                            </li>
                            <li>
                                <p>0987.654.321 - 0989.989.989</p>
                            </li>
                            <li>
                                <p>vshop@gmail.com</p>
                            </li>
                        </ul>
                    </div>
                    <div className="block menu-ft policy" id="info-shop">
                        <h3 className="title">Chính sách mua hàng</h3>
                        <ul className="list-item">
                            <li>
                                <a href="" title="">
                                    Quy định - chính sách
                                </a>
                            </li>
                            <li>
                                <a href="" title="">
                                    Chính sách bảo hành - đổi trả
                                </a>
                            </li>
                            <li>
                                <a href="" title="">
                                    Chính sách hội viện
                                </a>
                            </li>
                            <li>
                                <a href="" title="">
                                    Giao hàng - lắp đặt
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="block" id="newfeed">
                        <h3 className="title">Bảng tin</h3>
                        <p className="desc">
                            Đăng ký với chung tôi để nhận được thông tin ưu đãi
                            sớm nhất
                        </p>
                        <div id="form-reg">
                            <form method="POST" action="">
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Nhập email tại đây"
                                />
                                <button type="submit" id="sm-reg">
                                    Đăng ký
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div id="foot-bot">
                <div className="wp-inner">
                    <p id="copyright">© Bản quyền thuộc về ISMART</p>
                </div>
            </div>
        </div>
    );
}
