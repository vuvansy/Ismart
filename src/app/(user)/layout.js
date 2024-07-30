import "../../../public/bootstrap/css/bootstrap.min.css";

import "../../../public/css/bootstrap/bootstrap-theme.min.css";
import "../../../public/reset.css";
import "../../../public/css/carousel/owl.carousel.css";
import "../../../public/css/carousel/owl.theme.css";
import "../../../public/css/font-awesome/css/font-awesome.min.css";

import "../../../public/style.css";
import "../../../public/responsive.css";
import Footer from "@/components/layout-user/Footer";
import MenuRespon from "@/components/layout-user/MenuRespon";
import HeaderUser from "@/components/layout-user/HeaderUser";
import Providers from "@/redux/Provider";

export const metadata = {
    title: "Ismart",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <Providers>
                <body>
                    <div id="site">
                        <div id="container">
                            <HeaderUser />
                            <div
                                id="main-content-wp"
                                className="home-page clearfix category-product-page detail-product-page cart-page checkout-page"
                            >
                                <div className="wp-inner">{children}</div>
                            </div>
                            <Footer />
                        </div>
                        <MenuRespon />
                    </div>
                    <script src="/js/main.js"></script>

                    <script src="/js/jquery-2.2.4.min.js"></script>

                    <script src="/js/elevatezoom-master/jquery.elevatezoom.js"></script>
                    <script src="/js/carousel/owl.carousel.js"></script>
                    <script src="/bootstrap/js/bootstrap.bundle.min.js"></script>
                </body>
            </Providers>
        </html>
    );
}
