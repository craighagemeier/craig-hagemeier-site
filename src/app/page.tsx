import AnimatedText from '../app/components/molecules/AnimatedText/AnimatedText';

export default function HomePage() {
  return (
    <section className="ch-container">
      <div className="ch-row">
        <div className="ch-col">
          <h2>Explore, Create, Experiment</h2>
        </div>
      </div>
      <div className="ch-row">
        <div className="ch-col">
          <AnimatedText />
        </div>
      </div>
    </section>
  );
}
