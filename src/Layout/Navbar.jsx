import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav style={styles.navbar}>
            {/* Left Side: Logo */}
            <h1 style={styles.logo}>
                <Link to="/" style={styles.logoLink}>
                    Skoegle
                </Link>
            </h1>

            {/* Right Side: Links */}
            <div
                style={{
                    ...styles.navLinks,
                    ...(isMenuOpen ? styles.navLinksOpen : {}),
                }}
            >
                 <Link to="/preview" style={styles.link}>
                    Preview
                </Link>
                <Link to="/Live" style={styles.link}>
                    Live
                </Link>
                <Link to="/downloads" style={styles.link}>
                Downloads
                </Link>
                <Link to="https://v-marg2-0.onrender.com/login" style={styles.link}>
               Track
                </Link>
               
                {/* <Link to="/login" style={styles.link}>
                    Login
                </Link>
                <Link to="/signup" style={styles.link}>
                    Signup
                </Link>
                <Link to="/login" style={styles.link}>
                    Home
                </Link> */}
            </div>

            {/* Mobile Menu Icon */}
            <div style={styles.menuIcon} onClick={toggleMenu}>
                {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </div>
        </nav>
    );
}

const styles = {
    navbar: {
        overflow: "hidden",
        backgroundColor: "rgb(3, 3, 48)",
        display: "flex",
        gap: "15px",
        alignItems: "center",
        padding: "15px 21px",
        width:"100%",
        color: "white",
        height:"40px",
    },
    logo: {
        margin: 1,
        fontSize: "24px",
        fontWeight: "bold",
        color: "white"
    },
    logoLink: {
        textDecoration: "none",
        color: "white",
    },
    navLinks: {
        display: "flex",
        color: "white",
        alignItems: "center",
        gap: "20px",
        transition: "transform 0.3s ease",
    },
    navLinksOpen: {
        transform: "translateX(0)",
        position: "absolute",
        top: "70px",
        right: "10px",
        backgroundColor: "#333",
        flexDirection: "column",
        gap: "10px",
        padding: "10px",
        borderRadius: "5px",
    },
    link: {
        textDecoration: "none",
        color: "white",
        fontSize: "20px",
        transition: "color 0.3s",
    },
    menuIcon: {
        display: "none",
        cursor: "pointer",
    },
    "@media (max-width: 768px)": {
        navLinks: {
            display: "none",
        },
        menuIcon: {
            display: "block",
        },
    },
};
