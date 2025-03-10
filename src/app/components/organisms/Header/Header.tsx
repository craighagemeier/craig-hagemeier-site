"use client";

import { useEffect, useState, forwardRef } from "react";
import Image from "next/image";
import Navigation from "../Navigation/Navigation";
import styles from "./header.module.scss";

const Header = forwardRef<HTMLElement, { isShrunk: boolean }>(({ isShrunk }, ref) => {
  const [shouldRenderTopBar, setShouldRenderTopBar] = useState(true);

  useEffect(() => {
    if (isShrunk) {
      setTimeout(() => setShouldRenderTopBar(false), 400);
    } else {
      setShouldRenderTopBar(true);
    }
  }, [isShrunk]);

  return (
    <header ref={ref} className={`${styles.header} ${isShrunk ? styles.shrink : ""}`}>
      {shouldRenderTopBar && <div className={`${styles.header__topBar} ${isShrunk ? styles.hidden : ""}`}></div>}
      <div className={styles.header__bottomBar}>
        <div className={styles.header__imageWrapper}>
          <a href="/">
            <Image
              src="/images/Craig-Hagemeier.jpg"
              alt="Craig Hagemeier's profile photo"
              width={160}
              height={160}
              className={styles.header__image}
            />
          </a>
        </div>
        <h1 className={styles.header__title}>Craig Hagemeier</h1>
        <Navigation />
      </div>
    </header>
  );
});

export default Header;