export default function Footer() {
    return (
        <footer style={styles.footer}>
            <p style={styles.text}>
                &copy; 2025 Skoegle IoT Pvt Limited. All rights reserved.
            </p>
        </footer>
    );
}

const styles = {
    footer: {
        backgroundColor: "#333",
        color: "#fff",
        textAlign: "center",
        padding: "10px 20px",
        position: "relative",
        bottom: 0,
        width: "100%",
        height:"50px"
    },
    text: {
        margin: "20px",
        fontSize: "14px",
    },
};
