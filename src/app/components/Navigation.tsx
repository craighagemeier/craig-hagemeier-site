import Link from "next/link";

export default function Navigation() {
  return (
    <nav>
      <ul>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/photography">Photography</Link></li>
        <li><Link href="/endurance-quests">Endurance Quests</Link></li>
        <li><Link href="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
}
