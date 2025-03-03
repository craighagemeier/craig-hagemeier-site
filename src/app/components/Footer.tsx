"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faStrava, faGithub, faLinkedinIn, faInstagram, faFlickr } from "@fortawesome/free-brands-svg-icons";
import styles from "../styles/footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <ul className={styles.footer__socialList}>
          <li>
            <Link href="/contact" aria-label="Contact">
              <FontAwesomeIcon icon={faEnvelope} size="2xl" />
            </Link>
          </li>
          <li>
            <Link href="https://www.linkedin.com/in/craighagemeier/" target="_blank" aria-label="LinkedIn">
              <FontAwesomeIcon icon={faLinkedinIn} size="2xl" />
            </Link>
          </li>
          <li>
            <Link href="https://www.facebook.com/craig.hagemeier" target="_blank" aria-label="Facebook">
              <FontAwesomeIcon icon={faFacebookF} size="2xl" />
            </Link>
          </li>
          <li>
            <Link href="https://www.instagram.com/craighagemeier/" target="_blank" aria-label="Instagram">
              <FontAwesomeIcon icon={faInstagram} size="2xl" />
            </Link>
          </li>
          <li>
            <Link href="https://www.flickr.com/photos/craighagemeier/" target="_blank" aria-label="Flickr">
              <FontAwesomeIcon icon={faFlickr} size="2xl" />
            </Link>
          </li>
          <li>
            <Link href="https://github.com/craighagemeier" target="_blank" aria-label="GitHub">
              <FontAwesomeIcon icon={faGithub} size="2xl" />
            </Link>
          </li>
          <li>
            <Link href="https://www.strava.com/athletes/1921081" target="_blank" aria-label="Strava">
              <FontAwesomeIcon icon={faStrava} size="2xl" />
            </Link>
          </li>
        </ul>
        <small>&copy; {new Date().getFullYear()} &mdash; Craig Hagemeier</small>
      </div>
    </footer>
  );
}
