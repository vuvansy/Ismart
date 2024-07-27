import React from "react";

export default function Pagination({
    totalProducts,
    productsPerPage,
    currentPage,
    onPageChange,
}) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <div className="section" id="paging-wp">
            <div className="section-detail">
                <ul className="list-item clearfix">
                    {pageNumbers.map((pageNumber) => (
                        <li key={pageNumber}>
                            <a
                                href="#"
                                onClick={() => onPageChange(pageNumber)}
                                className={
                                    currentPage === pageNumber
                                        ? "activePagination"
                                        : ""
                                }
                            >
                                {pageNumber}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
