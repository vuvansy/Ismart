export const metadata = {
    title: "Trang Register",
};

export default function Register() {
    return (
        <section className="register">
            <div className="container">
                <div className="form__account">
                    <div className="sidebar__user">
                        <h1 className="sidebar__user--heading">
                            Xin chào, Bạn
                        </h1>
                        <p className="sidebar__user--desc">
                            Hãy bắt đầu với chúng tôi. Nếu bạn chưa có tài
                            khoản.
                        </p>
                        <div className="">
                            <a href="login.html">
                                <button className="btn user__cta">
                                    ĐĂNG NHẬP
                                </button>
                            </a>
                        </div>
                    </div>
                    <div className="account__inner">
                        <h1 className="heading-title">ĐĂNG KÝ</h1>
                        <form action="" id="form_reg">
                            <div className="row-form__group">
                                <div className="form__group">
                                    <label htmlFor="fullname">Họ tên</label>
                                    <input
                                        type="text"
                                        name="fullname"
                                        id="fullname"
                                        value=""
                                        placeholder="Fullname..."
                                    />
                                </div>

                                <div className="form__group">
                                    <label htmlFor="username">
                                        Tên đăng nhập
                                    </label>
                                    <input
                                        type="text"
                                        name="username"
                                        id="username"
                                        value=""
                                        placeholder="Username..."
                                    />
                                </div>
                            </div>

                            <div className="row-form__group">
                                <div className="form__group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="text"
                                        name="email"
                                        id="email"
                                        value=""
                                        placeholder="Email..."
                                    />
                                </div>

                                <div className="form__group">
                                    <label htmlFor="phone">Số Điện thoại</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        id="phone"
                                        value=""
                                        placeholder="Số điện thoại..."
                                    />
                                </div>
                            </div>

                            <div className="form__group">
                                <label htmlFor="address">Địa chỉ</label>
                                <input
                                    type="text"
                                    name="address"
                                    id="address"
                                    value=""
                                    placeholder="Địa chỉ..."
                                />
                            </div>

                            <div className="row-form__group">
                                <div className="form__group">
                                    <label htmlFor="password">Mật khẩu</label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        value=""
                                        placeholder="Password"
                                    />
                                </div>

                                <div className="form__group">
                                    <label htmlFor="confirm_pass">
                                        Xác nhận mật khẩu
                                    </label>
                                    <input
                                        type="password"
                                        name="confirm_pass"
                                        id="confirm_pass"
                                        value=""
                                        placeholder="Password"
                                    />
                                </div>
                            </div>
                            <input
                                type="submit"
                                name="btn-reg"
                                className="btn user__cta"
                                id="btn-login"
                                value="ĐĂNG KÝ"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
