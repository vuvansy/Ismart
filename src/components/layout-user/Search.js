export default function Search() {
    return (
        <div id="search-wp" className="fl-left">
            <form
                action="/products/search"
                className="d-flex align-items-center"
            >
                <input
                    type="text"
                    name="keyword"
                    id="s"
                    placeholder="Nhập từ khóa tìm kiếm tại đây!"
                />
                <button type="submit" id="sm-s">
                    Tìm kiếm
                </button>
            </form>
        </div>
    );
}