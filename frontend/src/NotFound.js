import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './NotFound.css'; // External CSS for background and styling

const NotFound = () => {
    return (
        <div className="notfound-container">
            {/* Starry background and image */}
            <div className="stars"></div>
            <div className="twinkling"></div>

            {/* 404 text with animation */}
            <motion.h1
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 2 }}
                className="notfound-title"
            >
                404
            </motion.h1>

            {/* Error message */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="notfound-message"
            >
                Oops! The page you’re looking for doesn’t exist.
            </motion.p>

            {/* Link back to Home */}
            <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
            >
                <Link to="/" className="notfound-link">
                    Go Back Home
                </Link>
            </motion.div>

            {/* Image (from Unsplash or similar source) */}
            {/* <motion.img
                src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDEwfHxkZXNvbGF0ZXxlbnwwfHx8fDE2NjUwMTk0Mjg&ixlib=rb-1.2.1&q=80&w=1080"
                alt="Lost in space"
                className="notfound-image"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
            /> */}
        </div>
    );
};

export default NotFound;
