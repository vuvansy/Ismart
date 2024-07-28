import FilterProduct from "@/components/FilterProduct";
import NavCategory from "@/components/layout-user/NavCategory";
import ListProduct from "@/components/ListProduct";

import Pagination from "@/components/Pagination";

import { Suspense } from "react";

async function ListCategory() {
    const res = await fetch("http://localhost:3000/categories");
    const category = await res.json();
    return <NavCategory data={category} />;
}

export default async function search(params) {
    // Xóa khoảng trắng ở đầu và cuối chuỗi
    const searchKeyword = params.searchParams.keyword.trim();
    // Kiểm tra nếu chuỗi rỗng
    if (searchKeyword === "") {
        return (
            <>
                <h3 className="search-product section-title">
                    Vui lòng nhập từ khóa tìm kiếm
                </h3>
            </>
        );
    }

    console.log(params.searchParams.keyword);
    const res = await fetch(
        "http://localhost:3000/products/search?keyword=" + searchKeyword
    );
    const productSearch = await res.json();
    // console.log(productSearch);
    return (
        <>
            <div className="main-content fl-right">
                <div className="section" id="list-product-wp">
                    <div className="section-head clearfix">
                        <h3 className="section-title fl-left">
                            Kết quả tìm kiếm với từ khóa: {searchKeyword}
                        </h3>
                        <div className="filter-wp fl-right">
                            <p className="desc">Hiển thị 45 trên 50 sản phẩm</p>
                            <div className="form-filter">
                                <form method="POST" action="">
                                    <select name="select">
                                        <option value="0">Sắp xếp</option>
                                        <option value="1">Từ Link-Z</option>
                                        <option value="2">Từ Z-Link</option>
                                        <option value="3">
                                            Giá cao xuống thấp
                                        </option>
                                        <option value="3">
                                            Giá thấp lên cao
                                        </option>
                                    </select>
                                    <button type="submit">Lọc</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    {productSearch.length > 0 ? (
                        <ListProduct data={productSearch} />
                    ) : (
                        <>
                            <div className="section-detail">
                                Không có sản phẩm nào được tìm thấy với từ khóa
                                bạn tìm kiếm!
                            </div>
                        </>
                    )}
                </div>
                <Pagination />
            </div>
            <div className="sidebar fl-left">
                <Suspense fallback="LOADING...">
                    <ListCategory />
                </Suspense>
                <FilterProduct />
            </div>
        </>
    );
}
