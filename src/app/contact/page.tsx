import ContactForm from "../components/molecules/ContactForm/ContactForm";

export default function ContactPage() {
  return (
    <section className="ch-container">
      <div className="ch-row">
        <div className="ch-col-xs-12 ch-col">
          <div className="ch-row">
            <div className="ch-col">
              <h2>Contact</h2>
            </div>
          </div>
          <div className="ch-row">
            <div className="ch-col">
              <p>Have a question or want to connect? Fill out the form, and I'll get back to you as soon as possible. Your feedback and inquiries are important to me, and I look forward to hearing from you! Whether it's about projects, potential collaborations, or just a friendly hello, I'm here to chat. Let's create something amazing together!</p>
            </div>
          </div>
        </div>
        <div className="ch-col-xs-12 ch-col">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}