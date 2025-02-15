import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", textAlign: "center" }}>
      <h1>Craig Hagemeier</h1>
      <p>Welcome to my personal site. More coming soon!</p>
    </main>
  );
}
