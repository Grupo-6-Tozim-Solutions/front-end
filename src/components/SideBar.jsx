import React from "react";

const SideBar = () => {
  return (
    <div style={styles.sidebar}>
      <div style={styles.container}>
        <div style={styles.logo}>
          <img
            src="public/assets/logo.png"
            alt="Logo"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
        <ul style={styles.navLinks}>
          <li style={styles.navItem}>
            <a href="#home" style={styles.navLink}>
              Home
            </a>
          </li>
          <li style={styles.navItem}>
            <a href="#about" style={styles.navLink}>
              Peças
            </a>
          </li>
          <li style={styles.navItem}>
            <a href="#services" style={styles.navLink}>
              Sofás
            </a>
          </li>
          <li style={styles.navItem}>
            <a href="#contact" style={styles.navLink}>
              Dashboard
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

const styles = {
  sidebar: {
    position: "fixed",
    top: 0,
    left: 0,
    height: "100vh",
    width: "250px",
    backgroundColor: "#0740DA",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "10px",
    zIndex: 999,
  },

  container: {
    marginTop: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },

  logo: {
    width: "100%",
    marginBottom: "20px",
  },

  navLinks: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    width: "100%",
  },
  navItem: {
    marginBottom: "15px",
  },
  navLink: {
    textDecoration: "none",
    color: "#fff",
    fontSize: "1rem",
    transition: "color 0.3s",
  },
};

export default SideBar;