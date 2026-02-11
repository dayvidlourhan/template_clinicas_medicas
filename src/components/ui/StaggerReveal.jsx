
import { motion } from "framer-motion";

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1, // Stagger delay for that premium feel
            delayChildren: 0.2,
        },
    },
};

const item = {
    hidden: { opacity: 0, y: 20, filter: "blur(10px)" }, // Blur adds a 2026 touch
    show: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.6, ease: "easeOut" },
    },
};

export const StaggerContainer = ({ children, className }) => (
    <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className={className}
    >
        {children}
    </motion.div>
);

export const StaggerItem = ({ children, className }) => (
    <motion.div variants={item} className={className}>
        {children}
    </motion.div>
);
