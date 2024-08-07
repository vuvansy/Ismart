export default function PaginationAdmin({
    currentPage,
    totalPages,
    onPageChange,
}) {
    // Hàm xử lý khi nhấp vào nút trang
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                {/* Nút Previous */}
                <li
                    className={`page-item ${
                        currentPage === 1 ? "disabled" : ""
                    }`}
                >
                    <a
                        className="page-link"
                        href="#"
                        aria-label="Previous"
                        onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(currentPage - 1);
                        }}
                    >
                        <span aria-hidden="true">Trước</span>
                    </a>
                </li>

                {/* Các nút trang */}
                {Array.from({ length: totalPages }, (_, i) => (
                    <li
                        key={i + 1}
                        className={`page-item ${
                            i + 1 === currentPage ? "active" : ""
                        }`}
                    >
                        <a
                            className="page-link"
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                handlePageChange(i + 1);
                            }}
                        >
                            {i + 1}
                        </a>
                    </li>
                ))}

                {/* Nút Next */}
                <li
                    className={`page-item ${
                        currentPage === totalPages ? "disabled" : ""
                    }`}
                >
                    <a
                        className="page-link"
                        href="#"
                        aria-label="Next"
                        onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(currentPage + 1);
                        }}
                    >
                        <span aria-hidden="true">Sau</span>
                    </a>
                </li>
            </ul>
        </nav>
    );
}
