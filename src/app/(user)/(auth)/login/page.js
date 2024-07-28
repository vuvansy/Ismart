export const metadata = {
    title: "Trang Login",
};

export default function Login() {
    return (
        <section className="login">
            <div className="container">
                <div className="form__account">
                    <div className="account__inner">
                        <h1 className="heading-title">ĐĂNG NHẬP</h1>
                        <form action="" id="form_login">
                            <div className="form__group">
                                <label htmlFor="username">Tên đăng nhập</label>
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    value=""
                                    placeholder="Tên đăng nhập..."
                                />
                            </div>
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
                                <input
                                    type="checkbox"
                                    name="remember_me"
                                    id="remember_me"
                                />
                                <label
                                    htmlFor="remember_me"
                                    className="remember"
                                >
                                    Ghi nhớ thông tin
                                </label>
                                <a className="control__reset" href="">
                                    Quên mật khẩu?
                                </a>
                            </div>
                            <input
                                type="submit"
                                name="btn-login"
                                className="btn user__cta"
                                id="btn-login"
                                value="ĐĂNG NHẬP"
                            />
                        </form>
                    </div>
                    <div className="sidebar__user">
                        <h2 className="sidebar__user--heading">
                            Xin chào, Bạn
                        </h2>
                        <p className="sidebar__user--desc">
                            Hãy bắt đầu với chúng tôi. Nếu bạn chưa có tài
                            khoản.
                        </p>
                        <div className="">
                            <a href="reg.html">
                                <button className="btn user__cta">
                                    ĐĂNG KÝ
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
