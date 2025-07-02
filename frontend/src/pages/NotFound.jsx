import React from "react";

const NotFound = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        margin: 0,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f9fa",
        color: "#343a40",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "6rem", margin: "0" }}>404</h1>
      <h2 style={{ fontSize: "2rem", margin: "10px 0" }}>Page Not Found</h2>
      <p style={{ fontSize: "1.2rem", maxWidth: "400px" }}>
        Sorry, the page you are looking for does not exist or has been removed.
      </p>
    </div>
  );
};

export default NotFound;
