// import Detail from "@/components/Detail";
import Breadcrumb from "@/components/Breadcrumb";
import DetailProduct from "@/components/DetailProduct";
import NavCategory from "@/components/layout-user/NavCategory";


import { Suspense } from "react";

export async function generateMetadata({ params, searchParams }, parent) {
    // read route params
    const id = params.id;
    const data = await fetch(`http://localhost:3000/products/${id}`).then(
        (res) => res.json()
    );
    return {
        title: data.name,
    };
}

async function ListCategory() {
    const res = await fetch("http://localhost:3000/categories");
    const data = await res.json();
    return <NavCategory data={data} />;
}

export default async function ProductDetail({ params }) {
 
    return (
        <>
            <Breadcrumb />
            <DetailProduct id={params.id} />

            <div className="sidebar fl-left">
                <Suspense fallback="LOADING...">
                    <ListCategory />
                </Suspense>
            </div>
        </>
    );
}
