import { useMemo } from "react";
import Link from "../components/atoms/Link/Link";

export default function Inspiration() {
  const links = [
    { href: "https://geoapa.com/", label: "George Apazidis" },
    { href: "https://www.joshmbell.com/", label: "Josh Bell" },
    { href: "https://metatronstudios.com/", label: "Metatron Studios" },
    { href: "https://www.carlos-otero.com/press#/world-of-interiors/", label: "Carlos Otero" },
    { href: "https://www.fitzcreative.com/", label: "FITZ CREATIVE" },
    { href: "https://you-are-beautiful.com/", label: "You Are Beautiful" },
    { href: "https://en.wikipedia.org/wiki/Barbara_Kruger", label: "Barbara Kruger" },
    { href: "https://www.thrivehaircollective.com/", label: "Thrive Hair Collective" },
    { href: "https://bradfrost.com/", label: "Brad Frost" },
    { href: "illapiano.com", label: "Illapiano" },
    { href: "https://colornamer.robertcooper.me/", label: " Color Namer" },
  ];

  const shuffledLinks = useMemo(() => {
    return [...links].sort(() => Math.random() - 0.5);
  }, []);

  return (
    <section className="ch-container">
      <article className="ch-container">
        <div className="ch-row">
          <div className="ch-col">
            <h2>Inspiration</h2>
          </div>
        </div>
        <div className="ch-row">
          <div className="ch-col">
            <p>Inspiration is everywhere. This is a small slice of the people and things that are sparking new ideas for me. No rankings, no favorites. Just pure inspiration, shuffled fresh every time you load the page. If that's not enough, go ahead &mdash; hit refresh.</p>
          </div>
        </div>
        <div className="ch-row">
          <div className="ch-col">
            <ul>
              {shuffledLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} target="_blank" aria-label={label}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </article>
    </section>
  );
}
