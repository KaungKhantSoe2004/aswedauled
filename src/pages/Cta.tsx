// components/CTASection.js
export default function CTASection() {
  return (
    <section className="section cta-section">
      <div className="container">
        <h2 className="cta-title">JOIN ASWEDAUL ED TODAY</h2>
        <p className="cta-text">
          Take the first step towards educational excellence. Apply now and
          become part of our thriving community of learners and leaders.
        </p>
        <button className="cta-button">APPLY NOW</button>
      </div>

      <style>{`
        .cta-section {
          background-color: #3fa7a3;
          color: #fff;
          padding: 60px 0;
          text-align: center;
          border-bottom: 6px solid #000;
        }

        .cta-title {
          font-size: 2.5rem;
          font-weight: bold;
          margin-bottom: 24px;
          letter-spacing: 1px;
          font-family: "BeBas Neue", sans-serif;
        }

        .cta-text {
          font-size: 1.1rem;
          margin-bottom: 40px;
          line-height: 1.6;
          opacity: 0.95;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .cta-button {
          padding: 16px 48px;
          background-color: #fff;
          color: #3fa7a3;
          border: none;
          font-size: 1rem;
          font-weight: bold;
          cursor: pointer;
          border-radius: 4px;
          transition: all 0.3s;
          letter-spacing: 1px;
          font-family: "BeBas Neue", sans-serif;
        }

        .cta-button:hover {
          background-color: #1a1a1a;
          color: #3fa7a3;
        }

        @media (max-width: 768px) {
          .cta-title {
            font-size: 2rem;
          }

          .cta-text {
            font-size: 1rem;
          }
        }

        @media (max-width: 480px) {
          .cta-title {
            font-size: 1.8rem;
          }

          .cta-button {
            padding: 12px 24px;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </section>
  );
}
