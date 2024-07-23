"use client";
import React, { useEffect } from "react";

export default function Slide() {
    useEffect(() => {
        $(document).ready(function () {
            var slider = $("#slider-wp .section-detail");
            slider.owlCarousel({
                autoPlay: 4500,
                navigation: false,
                navigationText: false,
                paginationNumbers: false,
                pagination: true,
                items: 1, //10 items above 1000px browser width
                itemsDesktop: [1000, 1], //5 items between 1000px and 901px
                itemsDesktopSmall: [900, 1], // betweem 900px and 601px
                itemsTablet: [600, 1], //2 items between 600 and 0
                itemsMobile: true, // itemsMobile disabled - inherit from itemsDesktop
            });
        });
    }, []);

    return (
        <div className="section" id="slider-wp">
            <div className="section-detail">
                <div className="item">
                    <img src="/images/slider-01.png" alt="" />
                </div>
                <div className="item">
                    <img src="/images/slider-02.png" alt="" />
                </div>
                <div className="item">
                    <img src="/images/slider-03.png" alt="" />
                </div>
            </div>
        </div>
    );
}
