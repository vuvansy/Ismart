import NavCategory from "@/components/layout-user/NavCategory";
import Slide from "@/components/layout-user/Slide";
import Selling from "@/components/Selling";
import { Suspense } from "react";
import classes from "./page.module.css";
import FeatureProduct from "@/components/FeatureProduct";
import Support from "@/components/Support";
import ListProductFeature from "@/components/ListProductFeature";

async function ListCategory() {
    const res = await fetch("http://localhost:3000/categories");
    const category = await res.json();
    return <NavCategory data={category} />;
}

async function ListHotNew() {
    const res = await fetch("http://localhost:3000/products/hot");
    const data = await res.json();
    return <FeatureProduct data={data} />;
}

async function ListPhoneNew() {
    const res = await fetch(
        `http://localhost:3000/products/new/category/${"65ef17cecce6ab14801fd9b7"}`
    );
    const phoneNew = await res.json();
    return <ListProductFeature data={phoneNew}>Điện Thoại</ListProductFeature>;
}

async function ListProductLapTop() {
    const res = await fetch(
        `http://localhost:3000/products/new/category/${"65ef17fccce6ab14801fd9bb"}`
    );
    const products = await res.json();
    return <ListProductFeature data={products}>LapTop</ListProductFeature>;
}

export default function Home() {
    return (
        <>
            <div className="main-content fl-right">
                <Slide />
                <Support />
                <Suspense
                    fallback={<p className={classes.loading}>LOADING...</p>}
                >
                    <ListHotNew />
                </Suspense>

                <Suspense
                    fallback={<p className={classes.loading}>LOADING...</p>}
                >
                    <ListPhoneNew />
                </Suspense>
                <Suspense
                    fallback={<p className={classes.loading}>LOADING...</p>}
                >
                    <ListProductLapTop />
                </Suspense>
            </div>
            <div className="sidebar fl-left">
                <Suspense
                    fallback={<p className={classes.loading}>LOADING...</p>}
                >
                    <ListCategory />
                </Suspense>
                <Selling />
            </div>
        </>
    );
}
