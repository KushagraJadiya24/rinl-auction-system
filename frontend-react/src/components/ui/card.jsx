// src/components/ui/card.jsx
import React from "react";

export default function Card({ children, className = "", onClick }) {
  return (
    <div className={`card shadow-sm ${className}`} onClick={onClick} style={{ cursor: onClick ? "pointer" : "default" }}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = "" }) {
  return <div className={`card-body ${className}`}>{children}</div>;
}
