import "./GuideCard.css";
import { Link } from "react-router-dom";
import { FaStar, FaMapMarkerAlt, FaBriefcase } from "react-icons/fa";

export default function GuideCard({ guide }) {
    
    return (

        <article className="guide-card">
            <img
                src={guide.userId.profilePic}
                alt={guide.userId.userName}
                className="guide-images"
            />

            <div className="guide-content">
                <div className="guide-header">
                    <h3>{guide.userId.userName}</h3>

                    <span className="rating">
                        <FaStar />
                        {guide.rating}
                    </span>
                </div>

                <p className="bio">
                    {guide.bio}
                </p>

                <div className="guide-details">

                    <span>
                        <FaMapMarkerAlt />
                        {guide.city}
                    </span>

                    <span>
                        <FaBriefcase />
                        {guide.experiencedYrs} Years
                    </span>

                </div>

                {/* <div className="language-container">
                    {Array.isArray(guide.language)
                        ? guide.language.map((lang) => (
                              <span
                                  key={lang}
                                  className="language-tag"
                              >
                                  {lang}
                              </span>
                          ))
                        : (
                            <span className="language-tag">
                                {guide.language}
                            </span>
                        )}
                </div> */}

                <div className="guide-footer">
                    <div>
                        <h3>₹{guide.pricePerHour}</h3>
                        <span>per hour</span>
                    </div>

                    <Link
                        to={`/guides/${guide._id}`}
                        className="view-btn"
                    >
                        View Profile
                    </Link>
                </div>
            </div>
        </article>
    );
}