export const metadata = {
    title: "Trang ChangePassword",
};
export default function ChangePassword() {
    return (
        <section className="editPassword">
            <div className="container">
                <div className="form__account">
                    <div className="account__inner">
                        <div className="account__inner--title">
                            <h1 className="heading-title">ĐỔI MẬT KHẨU</h1>
                        </div>
                        <form id="form_login">
                            <div className="form__group">
                                <label htmlFor="pass_old">Mật khẩu cũ</label>
                                <input
                                    type="password"
                                    name="currentPassword"
                                    id="pass_old"
                                    placeholder="Mật khẩu cũ"
                                />
                            </div>

                            <div className="form__group">
                                <label htmlFor="pass_new">Mật khẩu mới</label>
                                <input
                                    type="password"
                                    name="newPassword"
                                    id="pass_new"
                                    placeholder="Mật khẩu mới"
                                />
                            </div>

                            <div className="form__group">
                                <label htmlFor="pass_confirm">
                                    Xác nhận mật khẩu
                                </label>
                                <input
                                    type="password"
                                    name="confirmNewPassword"
                                    id="pass_confirm"
                                    placeholder="Mật khẩu mới"
                                />
                            </div>

                            <input
                                type="submit"
                                name="btn-editPass"
                                className="btn user__cta"
                                id="btn-login"
                                value="CẬP NHẬT"
                            />
                        </form>
                    </div>
                    <div className="sidebar__user">
                        <div className="avatar__user"></div>
                        <h2 className="subtitle__user"></h2>
                    </div>
                </div>
            </div>
        </section>
    );
}
