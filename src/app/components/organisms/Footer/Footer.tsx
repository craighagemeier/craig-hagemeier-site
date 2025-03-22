"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faStrava, faGithub, faLinkedinIn, faInstagram, faFlickr } from "@fortawesome/free-brands-svg-icons";
import "./footer.scss";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <ul className="footer__socialList">
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
        <div className="footer__copyright">
          <small>&copy; {new Date().getFullYear()} &mdash; Craig Hagemeier</small>
          <small><Link href="/inspiration">Inspiration</Link></small>
        </div>
      </div>
    </footer>
  );
}
