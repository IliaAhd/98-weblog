"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Breadcrumbs.module.css";
import React from "react";

const Breadcrumbs = () => {
  const pathname = usePathname();

  const pathSegments = pathname.split("/").filter(Boolean);

  const crumbs = pathSegments.map((segment, index) => {
    const href = "/" + pathSegments.slice(0, index + 1).join("/");
    const label = decodeURIComponent(segment.replace(/-/g, " "));
    return {
      href,
      label: label.charAt(0).toUpperCase() + label.slice(1),
    };
  });

  if (pathname === "/") return null;

  return (
    <div className={`window ${styles.breadcrumb}`}>
      <div className="title-bar">
        <div className="title-bar-text">Navigation</div>
      </div>
      <div className="window-body">
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <Link href="/" className="link">
            Home
          </Link>
          {crumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              <span style={{ margin: "0 4px" }}>&gt;</span>
              {index === crumbs.length - 1 ? (
                <span>{crumb.label}</span>
              ) : (
                <Link href={crumb.href} className="link">
                  {crumb.label}
                </Link>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Breadcrumbs;
