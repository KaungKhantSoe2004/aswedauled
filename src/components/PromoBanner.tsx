"use client";

import { useState } from "react";
import { FaCircleXmark } from "react-icons/fa6";

export function PromoBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="promo-banner">
      <div className="promo-container">
        <div className="promo-content">
          <div className="message-container">
            <span className="promo-message">
              Our platform is officially launching! To celebrate,
              <span className="free-text">
                {" "}
                all services are completely FREE
              </span>
              during our introductory period.
            </span>
          </div>
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="close-button"
          aria-label="Close banner"
        >
          <FaCircleXmark className="close-icon" />
        </button>
      </div>

      <style>{`
        .promo-banner {
          background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
          border-bottom: 3px solid #3fa7a3;
          padding: 1rem 0;
          position: sticky;
          top: 0;
          z-index: 1001;
        }

        .promo-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
        }

        .promo-content {
          flex: 1;
          display: flex;
          justify-content: center;
        }

        .message-container {
          background: rgba(255, 255, 255, 0.95);
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .promo-message {
          color: #2d3748;
          font-size: 0.95rem;
          font-weight: 500;
          line-height: 1.5;
          text-align: center;
        }

        .free-text {
          color: #3fa7a3;
          font-weight: 700;
          margin: 0 0.25rem;
        }

        .close-button {
          background: none;
          border: none;
          color: #ffffff;
          cursor: pointer;
          transition: all 0.3s ease;
          flex-shrink: 0;
          margin-left: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0.8;
        }

        .close-button:hover {
          color: #3fa7a3;
          opacity: 1;
          transform: scale(1.1);
        }

        .close-icon {
          font-size: 1.5rem;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .promo-container {
            padding: 0 1.5rem;
          }

          .message-container {
            padding: 0.6rem 1.25rem;
          }

          .promo-message {
            font-size: 0.9rem;
          }
        }

        @media (max-width: 768px) {
          .promo-container {
            padding: 0 1rem;
          }

          .message-container {
            padding: 0.75rem 1rem;
            width: 100%;
          }

          .promo-message {
            font-size: 0.85rem;
            text-align: center;
          }

          .close-button {
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
            margin-left: 0;
          }

          .close-icon {
            font-size: 1.3rem;
          }
        }

        @media (max-width: 480px) {
          .promo-banner {
            padding: 0.75rem 0;
          }

          .message-container {
            padding: 0.6rem 0.9rem;
          }

          .promo-message {
            font-size: 0.8rem;
            line-height: 1.4;
          }

          .close-button {
            top: 0.25rem;
            right: 0.25rem;
          }

          .close-icon {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </div>
  );
}
