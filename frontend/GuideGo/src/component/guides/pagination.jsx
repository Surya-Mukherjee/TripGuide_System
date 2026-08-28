import "./Pagination.css";

export default function Pagination({
    currentPage,
    totalPages,
    setPage,
}) {
    if (totalPages <= 1) return null;

    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    return (
        <div className="pagination">
            <button
                className="page-btn"
                onClick={() => setPage((prev) => prev - 1)}
                disabled={currentPage === 1}
            >
                Previous
            </button>

            {pages.map((page) => (
                <button
                    key={page}
                    className={`page-number ${
                        currentPage === page ? "active" : ""
                    }`}
                    onClick={() => setPage(page)}
                >
                    {page}
                </button>
            ))}

            <button
                className="page-btn"
                onClick={() => setPage((prev) => prev + 1)}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
}