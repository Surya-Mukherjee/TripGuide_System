import "./SearchFilter.css";

export default function SearchFilter({
    filters,
    setFilters,
    setPage,
}) {
    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;

        setFilters((prev) => ({
            ...prev,
            [name]: value,
        }));

        setPage(1);
    };

    const clearFilters = () => {
        setFilters({
            city: "",
            minexpYrs: "",
            maxexpYrs: "",
            minPrice: "",
            maxPrice: "",
        });

        setPage(1);
    };

    return (
        <section className="search-filter">

            <div className="filter-grid">

                <input
                    type="text"
                    name="city"
                    placeholder="Search by city"
                    value={filters.city}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="minexpYrs"
                    placeholder="Min Experience"
                    min="0"
                    value={filters.minexpYrs}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="maxexpYrs"
                    placeholder="Max Experience"
                    min="0"
                    value={filters.maxexpYrs}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="minPrice"
                    placeholder="Min Price"
                    min="0"
                    value={filters.minPrice}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="maxPrice"
                    placeholder="Max Price"
                    min="0"
                    value={filters.maxPrice}
                    onChange={handleChange}
                />

                <button
                    className="clear-btn"
                    onClick={clearFilters}
                >
                    Clear Filters
                </button>

            </div>

        </section>
    );
}