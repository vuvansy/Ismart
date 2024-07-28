export const metadata = {
    title: "Trang EditUser",
};
export default function EditUser() {
    return (
        <section className="updateAccount">
            <div className="container">
                <div className="form__account">
                    <div className="account__inner">
                        <div className="account__inner--title">
                            <h1 className="heading-title">
                                CẬP NHẬT THÔNG TIN
                            </h1>
                        </div>
                        <form id="form_login" method="POST">
                            <div className="row-form__group">
                                <div className="form__group">
                                    <label htmlFor="fullname">Họ tên</label>
                                    <input
                                        type="text"
                                        name="fullname"
                                        id="fullname"
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
                                        readOnly
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
                                        placeholder="Email..."
                                    />
                                </div>

                                <div className="form__group">
                                    <label htmlFor="phone">Số Điện thoại</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        id="phone"
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
                                    placeholder="Địa chỉ..."
                                />
                            </div>

                            <input
                                type="submit"
                                name="btn-update"
                                className="btn user__cta"
                                id="btn-login"
                                value="CẬP NHẬT"
                            />
                        </form>
                    </div>
                    <div className="sidebar__user">
                        <div className="avatar__user">
                            <img src="" alt="" />
                        </div>
                        <h2 className="subtitle__user">Tên User</h2>
                    </div>
                </div>
            </div>
        </section>
    );
}
