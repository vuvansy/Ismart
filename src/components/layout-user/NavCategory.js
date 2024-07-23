import Link from "next/link";

export default function NavCategory(props) {
    return (
        <div className="section" id="category-product-wp">
            <div className="section-head">
                <h3 className="section-title">Danh mục sản phẩm</h3>
            </div>
            <div className="secion-detail">
                <ul className="list-item">
                    {props.data.map((category) => (
                        <li key={category._id}>
                            <Link
                                href={`/products/categoryProduct/${category._id}`}
                                title={category.name}
                            >
                                {category.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
