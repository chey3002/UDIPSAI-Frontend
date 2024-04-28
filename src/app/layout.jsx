'client-side'
import React from 'react';
import { Inter } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "UDIPSAI",
  description: "Inicio de sesión",
};

export default function RootLayout({ children }) {

  return (
    <html lang="es">
      <head>
        <script src="https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js" async crossorigin></script>

        <script
          src="https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js" async crossorigin
        ></script>

        <script
          src="https://cdn.jsdelivr.net/npm/react-bootstrap@next/dist/react-bootstrap.min.js" async crossorigin
        ></script>

      </head>
      <body className={inter.className}>
        {children}

      </body>
    </html>
  );
}
