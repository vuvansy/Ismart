import React from "react";

export default function ResetPassword() {
    return (
        <section className="newPassword">
            <div className="container">
                <div className="form__account">
                    <div className="account__inner">
                        <div className="account__inner--title">
                            <h1 className="heading-title">NHẬP MẬT KHẨU MỚI</h1>
                        </div>
                        <form action="" id="form_login" method="POST">
                            <div className="form__group">
                                <label htmlFor="password">Mật khẩu</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                />
                            </div>
                            <div className="form__group">
                                <label htmlFor="pass_confirm">
                                    Xác nhận mật khẩu
                                </label>
                                <input
                                    type="password"
                                    name="pass_confirm"
                                    id="pass_confirm"
                                    placeholder="Mật khẩu mới"
                                />
                            </div>

                            <input
                                type="submit"
                                name="btn-new-pass"
                                className="btn user__cta"
                                id="btn-login"
                                value="GỬI YÊU CẦU"
                            />
                        </form>
                    </div>
                    <div className="sidebar__user">
                        <div className="avatar__user">
                            <img src="public/images/user/user2.jpg" alt="" />
                        </div>
                        <h2 className="subtitle__user">Vũ Văn Sỹ</h2>
                    </div>
                </div>
            </div>
        </section>
    );
}
