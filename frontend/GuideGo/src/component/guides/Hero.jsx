import "./Hero.css";

export default function Hero() {
    return (
        <section className="guide-hero">
            <div className="guide-hero-content">
                <span className="hero-tag">
                    Explore • Connect • Experience
                </span>

                <h1>
                    Discover Local Guides
                    <br />
                    For Your Next Adventure
                </h1>

                <p>
                    Find experienced local guides, compare prices, check
                    ratings, and book the perfect companion for your journey.
                </p>

                {/* <div className="hero-stats">
                    <div>
                        <h3>100+</h3>
                        <span>Verified Guides</span>
                    </div>

                    <div>
                        <h3>50+</h3>
                        <span>Cities Covered</span>
                    </div>

                    <div>
                        <h3>4.8★</h3>
                        <span>Average Rating</span>
                    </div>
                </div> */}
            </div>
        </section>
    );
}