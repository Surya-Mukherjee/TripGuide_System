import "./GuideList.css";
import { useEffect, useState, useCallback } from "react";
import Hero from "../guides/Hero.jsx";
import SearchFilter from "../guides/SearchFilter.jsx";
import GuideCard from "../guides/GuideCard.jsx";
import Pagination from "../guides/Pagination.jsx";
import { guide } from "../../service/guide.js";  

export default function GuideList() {
    const [guides, setGuides] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [filters, setFilters] = useState({
        city: "",
        minexpYrs: "",
        maxexpYrs: "",
        minPrice: "",
        maxPrice: "",
    });

    // Reset to first page whenever filters change
    useEffect(() => {
        setPage(1);
    }, [filters]);

    const fetchGuides = useCallback(async () => {
        try {
            setLoading(true);
            setError("");

            const params = {
                page,
                ...filters,
            };

            Object.keys(params).forEach((key) => {
                if (params[key] === "") {
                    delete params[key];
                }
            });

            const res = await guide(params);

            const data = res.data.data;

            setGuides(data.guideList);
            setTotalPages(data.totalPages);
        } catch (err) {
            console.error(err);

            setGuides([]);

            if (err.response?.status === 404) {
                setError("No guides found.");
            } else {
                setError("Something went wrong. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    }, [page, filters]);

    useEffect(() => {
        fetchGuides();
    }, [fetchGuides]);

    return (
        <div className="guide-page">
            <Hero />

            <SearchFilter
                filters={filters}
                setFilters={setFilters}
                setPage={setPage}
            />

            <section className="guide-list">
                {loading && <h2>Loading...</h2>}

                {!loading && error && <h2>{error}</h2>}

                {!loading &&
                    !error &&
                    guides.map((guide) => (
                        <GuideCard
                            key={guide._id}
                            guide={guide}
                        />
                    ))}
            </section>

            {!loading && !error && totalPages > 1 && (
                <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    setPage={setPage}
                />
            )}
        </div>
    );
}