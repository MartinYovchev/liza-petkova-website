// components/admin/AdminLayout.tsx
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MdDashboard,
  MdArticle,
  MdSettings,
  MdAdd,
  MdBusinessCenter,
} from "react-icons/md";
import styles from "./AdminLayout.module.scss";

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
  headerActions?: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  title = "Admin Dashboard",
  headerActions,
}) => {
  const pathname = usePathname();

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: MdDashboard },
    { href: "/admin/posts", label: "Blog Posts", icon: MdArticle },
    { href: "/admin/services", label: "Services", icon: MdBusinessCenter },
    { href: "/admin/settings", label: "Settings", icon: MdSettings },
  ];

  const isActiveLink = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(href);
  };

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <h1 className={styles.logoText}>Admin Panel</h1>
        </div>
        <nav>
          <ul className={styles.nav}>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.href} className={styles.navItem}>
                  <Link
                    href={item.href}
                    className={`${styles.navLink} ${
                      isActiveLink(item.href) ? styles.navLinkActive : ""
                    }`}
                  >
                    <Icon className={styles.navIcon} />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      <main className={styles.main}>
        <header className={styles.header}>
          <h1 className={styles.headerTitle}>{title}</h1>
          <div className={styles.headerActions}>{headerActions}</div>
        </header>

        <div className={styles.content}>{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
