"use client";

import { useEffect, useState, forwardRef } from "react";
import Image from "next/image";
import Navigation from "../Navigation/Navigation";
import "./header.scss";

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
  <header ref={ref} className={`header ${isShrunk ? "header--shrink" : ""}`}>
    {shouldRenderTopBar && (
      <div className={`header__topBar ${isShrunk ? "header__topBar--hidden" : ""}`}></div>
    )}
      <div className="header__bottomBar">
        <div className="header__imageWrapper">
          <a href="/">
            <Image
              src="/images/Craig-Hagemeier.jpg"
              alt="Craig Hagemeier's profile photo"
              width={160}
              height={160}
              className="header__image"
              priority
            />
          </a>
        </div>
        <h1 className="header__title">Craig Hagemeier</h1>
        <Navigation />
      </div>
    </header>
  );
});

export default Header;