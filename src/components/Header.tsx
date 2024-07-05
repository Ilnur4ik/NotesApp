"use client";

import Link from "next/link";
import styles from "./Header.module.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Header: React.FC = () => {
  return (
    <header className={styles.header + " bg-light"}>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <Link href="/" className="navbar-brand">
            <h1>Заметки</h1>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="bi bi-list"></i>{" "}
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link href="/" className="nav-link">
                  Все
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/new" className="nav-link">
                  Создать заметку
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
