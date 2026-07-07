import "./HowItWorks.css";
import React from "react";
import {motion} from "motion/react";
import { FaSearch, FaCalendarAlt, FaMapMarkedAlt } from "react-icons/fa";

const steps = [
  {
    id: "01",
    icon: <FaSearch />,
    title: "Search for guides",
    description:
      "Browse local guides by location, language, and experience level.",
    button: "Explore >",
  },
  {
    id: "02",
    icon: <FaCalendarAlt />,
    title: "Check availability",
    description:
      "View their calendars and find dates that work for your trip.",
    button: "View >",
  },
  {
    id: "03",
    icon: <FaMapMarkedAlt />,
    title: "Book and enjoy your tour",
    description:
      "Confirm your booking and experience the city like a local.",
    button: "Book >",
  },
];


function HowItWorks() {
  return (
    <section className="howItWorks">
     <motion.h2
    initial={{ opacity: 0, y: -40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7 }}
    viewport={{ once: true }}
>
    How GuideGo Works
</motion.h2>
      <motion.p
    className="subtitle"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ delay: 0.3 }}
    viewport={{ once: true }}
>
    Three easy steps to your next adventure
</motion.p>

     <div className="steps">
  {steps.map((step, index) => (
    <React.Fragment key={step.id}>
      <motion.div
        className="card"
        whileHover={{
          y: -10,
          scale: 1.03,
        }}
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          delay: index * 0.2,
        }}
        viewport={{ once: true }}
      >
        <div className="icon" >{step.icon}</div>

        <span className="stepNumber">Step {step.id}</span>

        <h3>{step.title}</h3>

        <p>{step.description}</p>

        <button>{step.button}</button>
      </motion.div>

      {index !== steps.length - 1 && (
       <motion.svg
        className="arrow"
        width="80"
        height="20"
        viewBox="0 0 80 20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: index * 0.2 + 0.3 }}
        viewport={{ once: true }}
      >
        <path
          d="M0 10 H70"
          stroke="#f5650b"
          strokeWidth="3"
          fill="none"
        />
        <path
          d="M60 3 L70 10 L60 17"
          stroke="#f5650b"
          strokeWidth="3"
          fill="none"
        />
      </motion.svg>
      )}
    </React.Fragment>
  ))}
</div>
    </section>
  );
}

export default HowItWorks;