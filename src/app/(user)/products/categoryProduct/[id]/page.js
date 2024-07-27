"use client";
import Breadcrumb from "@/components/Breadcrumb";
import FilterProduct from "@/components/FilterProduct";
import NavCategory from "@/components/layout-user/NavCategory";
import ListProduct from "@/components/ListProduct";
import Pagination from "@/components/Pagination";
import { useState, useEffect } from "react";
export default function Products({ params }) {
    const [category, setCategory] = useState([]);
    const [categoryId, setCategoryId] = useState([]);
    const [products, setProducts] = useState([]);

    const [sortOption, setSortOption] = useState("asc");
    //State giá
    const [priceRange, setPriceRange] = useState(null);
    //State hãng
    const [brandFilter, setBrandFilter] = useState(null);
    //State loại SP
    const [productType, setProductType] = useState(null);
    //currentPage: Trang hiện tại
    const [currentPage, setCurrentPage] = useState(1);
    //productsPerPage: Số sản phẩm hiển thị trên mỗi trang
    const [productsPerPage, setProductsPerPage] = useState(8);

    useEffect(() => {
        async function fetchCategory() {
            const res = await fetch(`http://localhost:3000/categories`);
            const newCategory = await res.json();
            setCategory(newCategory);
        }
        fetchCategory();
    }, []);

    useEffect(() => {
        async function fetchCategoryId() {
            const res = await fetch(
                `http://localhost:3000/categories/${params.id}`
            );
            const newCategoryId = await res.json();
            setCategoryId(newCategoryId);
        }
        fetchCategoryId();
    }, []);

    useEffect(() => {
        async function fetchProducts() {
            const res = await fetch(
                `http://localhost:3000/products/categories/${params.id}`
            );
            const newProducts = await res.json();
            setProducts(newProducts);
        }
        fetchProducts();
    }, []);

    const handleSort = (products) => {
        const filteredProducts = [...products]
            .filter((product) => {
                if (priceRange !== null) {
                    const price = product.price_new;
                    switch (priceRange) {
                        case "under-10m":
                            return price < 10000000;
                        case "10m-15m":
                            return price >= 10000000 && price < 15000000;
                        case "15m-20m":
                            return price >= 15000000 && price < 20000000;
                        case "20m-30m":
                            return price >= 20000000 && price < 30000000;
                        case "over-30m":
                            return price >= 30000000;
                        default:
                            return true;
                    }
                }
                if (brandFilter !== null) {
                    const brand = product.brand;
                    switch (brandFilter) {
                        case "Acer":
                            return brand == "Acer";
                        case "Dell":
                            return brand == "Dell";
                        case "Apple":
                            return brand == "Apple";
                        case "Oppo":
                            return brand == "Oppo";
                        case "Hp":
                            return brand == "Hp";
                        case "Lenovo":
                            return brand == "Lenovo";
                        case "Samsung":
                            return brand == "Samsung";
                        default:
                            return true;
                    }
                }
                if (productType !== null) {
                    return product.type === productType;
                }
                return true;
            })
            .sort((a, b) => {
                if (sortOption === "asc") {
                    return a.name.localeCompare(b.name);
                } else if (sortOption === "desc") {
                    return b.name.localeCompare(a.name);
                } else if (sortOption === "price-asc") {
                    return a.price_new - b.price_new;
                } else if (sortOption === "price-desc") {
                    return b.price_new - a.price_new;
                }
            });

        return filteredProducts;
    };

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    const onPriceRangeChange = (e) => {
        setPriceRange(e.target.value);
    };

    const onProductTypeChange = (e) => {
        setProductType(e.target.value);
    };

    const onBrandChange = (e) => {
        setBrandFilter(e.target.value);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = handleSort(products).slice(
        indexOfFirstProduct,
        indexOfLastProduct
    );
    return (
        <>
            <Breadcrumb>{categoryId.name}</Breadcrumb>

            <div className="main-content fl-right">
                <div className="section" id="list-product-wp">
                    <div className="section-head clearfix">
                        <h3 className="section-title fl-left">
                            {categoryId.name}
                        </h3>
                        <div className="filter-wp fl-right">
                            <p className="desc">Hiển thị 45 trên 50 sản phẩm</p>
                            <div className="form-filter">
                                <form method="POST" action="">
                                    <select
                                        name="select"
                                        value={sortOption}
                                        onChange={handleSortChange}
                                    >
                                        <option value="0">Sắp xếp</option>
                                        <option value="asc">Từ A-Z</option>
                                        <option value="desc">Từ Z-A</option>
                                        <option value="price-asc">
                                            Giá thấp lên cao
                                        </option>
                                        <option value="price-desc">
                                            Giá cao xuống thấp
                                        </option>
                                    </select>
                                </form>
                            </div>
                        </div>
                    </div>

                    {handleSort(products).length === 0 ? (
                        <div className="no-products-message">
                            Rất tiếc, chúng tôi không tìm thấy sản phẩm nào phù
                            hợp.
                        </div>
                    ) : (
                        <ListProduct data={currentProducts} />
                    )}
                </div>
                {handleSort(products).length != 0 && (
                    <Pagination
                        totalProducts={handleSort(products).length}
                        productsPerPage={productsPerPage}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                )}
            </div>

            <div className="sidebar fl-left">
                <NavCategory data={category} />
                <FilterProduct
                    onPriceRangeChange={onPriceRangeChange}
                    onBrandChange={onBrandChange}
                />
            </div>
        </>
    );
}
