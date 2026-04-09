'use client'

import React, { useState } from 'react'
import { MessageCircle, HelpCircle } from 'lucide-react'

export function FloatingWidgets() {
  const [showInquireModal, setShowInquireModal] = useState(false)

  const handleWhatsAppClick = () => {
    const phoneNumber = '+94XXXXXXXXX' // Replace with actual WhatsApp number
    const message = 'Hi! I would like to inquire about your travel packages.'
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const handleInquireClick = () => {
    setShowInquireModal(!showInquireModal)
  }

  return (
    <>
      <style>{`
        .floating-widgets {
          position: fixed;
          bottom: 30px;
          right: 30px;
          z-index: 40;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .floating-btn {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 14px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
          position: relative;
        }

        .floating-btn:hover {
          transform: scale(1.1);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
        }

        .floating-btn:active {
          transform: scale(0.95);
        }

        .whatsapp-btn {
          background: linear-gradient(135deg, #25d366, #20ba5a);
          color: white;
        }

        .whatsapp-btn:hover {
          background: linear-gradient(135deg, #20ba5a, #1aad4a);
        }

        .inquire-btn {
          background: linear-gradient(135deg, #ff7a45, #ff6b2c);
          color: white;
        }

        .inquire-btn:hover {
          background: linear-gradient(135deg, #ff6b2c, #ff5213);
        }

        .floating-btn svg {
          width: 28px;
          height: 28px;
        }

        /* Pulse animation */
        @keyframes pulse-ring {
          0% {
            box-shadow: 0 0 0 0 rgba(255, 122, 69, 0.7);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(255, 122, 69, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(255, 122, 69, 0);
          }
        }

        .inquire-btn.pulse {
          animation: pulse-ring 2s infinite;
        }

        /* Modal */
        .inquire-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 50;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }

        .inquire-modal-overlay.open {
          opacity: 1;
          pointer-events: auto;
        }

        .inquire-modal {
          background: white;
          border-radius: 16px;
          padding: 32px;
          max-width: 500px;
          width: 90%;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          transform: scale(0.95);
          transition: transform 0.3s ease;
        }

        .inquire-modal-overlay.open .inquire-modal {
          transform: scale(1);
        }

        .inquire-modal h2 {
          font-size: 24px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 16px;
        }

        .inquire-modal p {
          font-size: 14px;
          color: #666;
          margin-bottom: 24px;
          line-height: 1.6;
        }

        .inquire-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .inquire-form input,
        .inquire-form textarea {
          padding: 12px 16px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 14px;
          font-family: inherit;
          transition: border-color 0.2s ease;
        }

        .inquire-form input:focus,
        .inquire-form textarea:focus {
          outline: none;
          border-color: #ff7a45;
          box-shadow: 0 0 0 3px rgba(255, 122, 69, 0.1);
        }

        .inquire-form textarea {
          resize: vertical;
          min-height: 120px;
        }

        .inquire-btn-submit {
          background: linear-gradient(135deg, #ff7a45, #ff6b2c);
          color: white;
          padding: 12px 24px;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .inquire-btn-submit:hover {
          background: linear-gradient(135deg, #ff6b2c, #ff5213);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(255, 122, 69, 0.3);
        }

        .close-btn {
          position: absolute;
          top: 16px;
          right: 16px;
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #666;
          transition: color 0.2s ease;
        }

        .close-btn:hover {
          color: #1a1a1a;
        }

        @media (max-width: 768px) {
          .floating-widgets {
            bottom: 20px;
            right: 20px;
            gap: 12px;
          }

          .floating-btn {
            width: 56px;
            height: 56px;
          }

          .floating-btn svg {
            width: 24px;
            height: 24px;
          }
        }
      `}</style>

      <div className="floating-widgets">
        <button
          className="floating-btn whatsapp-btn"
          onClick={handleWhatsAppClick}
          title="Chat on WhatsApp"
          aria-label="Open WhatsApp chat"
        >
          <MessageCircle />
        </button>

        <button
          className={`floating-btn inquire-btn ${!showInquireModal ? 'pulse' : ''}`}
          onClick={handleInquireClick}
          title="Send Inquiry"
          aria-label="Open inquiry form"
        >
          <HelpCircle />
        </button>
      </div>

      {/* Inquiry Modal */}
      <div className={`inquire-modal-overlay ${showInquireModal ? 'open' : ''}`}>
        <div className="inquire-modal">
          <button
            className="close-btn"
            onClick={handleInquireClick}
            aria-label="Close modal"
          >
            ✕
          </button>

          <h2>Send Your Inquiry</h2>
          <p>
            We&apos;d love to hear from you! Fill out the form below and
            we&apos;ll get back to you shortly.
          </p>

          <form className="inquire-form">
            <input
              type="text"
              placeholder="Your Name"
              required
              aria-label="Name"
            />
            <input
              type="email"
              placeholder="Your Email"
              required
              aria-label="Email"
            />
            <input
              type="text"
              placeholder="Subject"
              required
              aria-label="Subject"
            />
            <textarea
              placeholder="Tell us about your travel plans..."
              required
              aria-label="Message"
            ></textarea>

            <button type="submit" className="inquire-btn-submit">
              Send Inquiry
            </button>
          </form>
        </div>
      </div>

      {showInquireModal && (
        <div
          className="inquire-modal-overlay open"
          onClick={handleInquireClick}
          role="presentation"
        />
      )}
    </>
  )
}
