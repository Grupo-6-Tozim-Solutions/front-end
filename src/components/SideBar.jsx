import { useState } from "react";

const SideBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <div
        style={{
          ...styles.sidebar,
          width: isExpanded ? "10vw" : "3vw",
        }}
      >
        <div style={styles.container}>
          {/* A logo agora é o botão de expandir/recolher */}
          <div onClick={toggleExpand} style={styles.logoButton}>
            <img
              src="public/assets/logo.png"
              alt="Logo"
              style={{ width: "100%", height: "auto", cursor: "pointer" }}
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
    </div>
  );
};

const styles = {
  sidebar: {
    position: "fixed",
    top: 0,
    left: 0,
    height: "100vh",
    backgroundColor: "#0740DA",
    color: "#fff",
    overflowX: "hidden",
    transition: "width 0.3s ease-in-out",
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
    height: "100vh",
  },

  logoButton: {
    width: "2.8vw",
    cursor: "pointer", // Adiciona o cursor de ponteiro para indicar que é clicável
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