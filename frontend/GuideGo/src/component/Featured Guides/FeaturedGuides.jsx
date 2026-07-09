import { useEffect, useRef, useState } from "react";
import "./FeaturedGuide.css";

export default function FeaturedGuides() {

    const [isVisible, setIsVisible] = useState(false);
    const [points, setPoints] = useState([]);

    const sectionRef = useRef(null);

    const desktopPathRef = useRef(null);
    const mobilePathRef = useRef(null);

    const guides = [
        {
            _id: "1",
            avgRating: 4.9,
            userId: {
                userName: "Arjun Sharma",
                "profile-pic": "https://i.pravatar.cc/200?img=11",
            },
        },
        {
            _id: "2",
            avgRating: 4.8,
            userId: {
                userName: "Priya Das",
                "profile-pic": "https://i.pravatar.cc/200?img=32",
            },
        },
        {
            _id: "3",
            avgRating: 5.0,
            userId: {
                userName: "Rahul Verma",
                "profile-pic": "https://i.pravatar.cc/200?img=14",
            },
        },
        {
            _id: "4",
            avgRating: 4.7,
            userId: {
                userName: "Ananya Roy",
                "profile-pic": "https://i.pravatar.cc/200?img=47",
            },
        },
    ];

    useEffect(() => {

        const observer = new IntersectionObserver(

            ([entry]) => {

                if (entry.isIntersecting) {

                    setIsVisible(true);
                    observer.disconnect();

                }

            },

            {
                threshold: 0.4,
            }

        );

        if (sectionRef.current) {

            observer.observe(sectionRef.current);

        }

        return () => observer.disconnect();

    }, []);

    useEffect(() => {

        const calculatePoints = () => {

            const isMobile = window.innerWidth <= 768;

            const path = isMobile
                ? mobilePathRef.current
                : desktopPathRef.current;

            if (!path) return;

            const totalLength = path.getTotalLength();

            const newPoints = [];

            guides.forEach((_, index) => {

                const distance =
                    (totalLength / (guides.length - 1)) * index;

                const point = path.getPointAtLength(distance);

                newPoints.push({

                    x: (point.x / (isMobile ? 250 : 1200)) * 100,

                    y: (point.y / (isMobile ? 900 : 250)) * 100,

                });

            });

            setPoints(newPoints);

        };

        calculatePoints();

        window.addEventListener("resize", calculatePoints);

        return () =>
            window.removeEventListener("resize", calculatePoints);

    }, []);

    return (

        <section
            ref={sectionRef}
            className={`featured-guides ${isVisible ? "active" : ""}`}
        >

            <div className="featured-heading">

                <h2>Featured Guides</h2>

                <p>
                    Meet our highest-rated local experts
                </p>

            </div>

            <div className="route-wrapper">

                {/* Desktop Route */}

                <svg
                    className="travel-route desktop-route"
                    viewBox="0 0 1200 250"
                    preserveAspectRatio="none"
                >

                    <path
                        ref={desktopPathRef}
                        className="route-path"
                        d="
                        M50 130
                        C220 70
                        350 70
                        500 130

                        S800 190
                        950 120

                        S1080 70
                        1150 130
                        "
                    />

                </svg>

                {/* Mobile Route */}

                <svg
                    className="travel-route mobile-route"
                    viewBox="0 0 250 900"
                    preserveAspectRatio="none"
                >

                    <path
                        ref={mobilePathRef}
                        className="route-path"
                        d="
                        M125 40

                        C180 120
                        70 220
                        125 320

                        S180 520
                        125 620

                        S70 820
                        125 860
                        "
                    />

                </svg>

                {

                    points.map((point, index) => (

                        <div

                            key={guides[index]._id}

                            className="featured-guide"

                            style={{

                                left: `${point.x}%`,
                                top: `${point.y}%`,
                                animationDelay: `${index * .55 + .4}s`

                            }}

                        >

                            <div className="guide-image">

                                <img

                                    src={guides[index].userId["profile-pic"]}

                                    alt={guides[index].userId.userName}

                                />

                            </div>

                            <h4>

                                {guides[index].userId.userName}

                            </h4>

                            <span>

                                ⭐ {guides[index].avgRating.toFixed(1)}

                            </span>

                        </div>

                    ))

                }

            </div>

        </section>

    );

}