import "../../../public/bootstrap/css/bootstrap.min.css";
import "../../../public/style.css";
import "../../../public/responsive.css";
import "../../../public/fontawesome-free-6.5.2/css/all.min.css";
import "../../../public/fontawesome-free-6.5.2/css/solid.min.css";
import HeaderAdmin from "@/components/layout-admin/HeaderAdmin";
import Sidebar from "@/components/layout-admin/Sidebar";
import Providers from "@/redux/Provider";

export const metadata = {
    title: "Admin Ismart",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <Providers>
                <body>
                    <div id="warpper" className="nav-fixed">
                        <HeaderAdmin />
                        <div id="page-body" className="d-flex">
                            <Sidebar />
                            <div id="wp-content">
                                <div id="content" className="container-fluid">
                                    {children}
                                </div>
                            </div>
                        </div>
                    </div>
                    <script src="/js/jquery-2.2.4.min.js"></script>
                    <script src="/js/elevatezoom-master/jquery.elevatezoom.js"></script>
                    <script src="/js/carousel/owl.carousel.js"></script>
                    <script src="/bootstrap/js/bootstrap.bundle.min.js"></script>
                </body>
            </Providers>
        </html>
    );
}
