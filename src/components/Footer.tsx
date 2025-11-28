import {
  FaFacebook,
  // FaTwitter,
  // FaInstagram,
  // FaLinkedin,
  FaTiktok,
  FaTelegram,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="bg-[#0F0F0F] border-t border-[#333333]">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-[#FFEA00] font-bold mb-4 flex items-center gap-2">
              <div className="w-8 h-8 bg-[#FFEA00] rounded-lg flex items-center justify-center text-[#1A1A1A] text-sm font-bold">
                AS
              </div>
              ASWEDAUL
            </h3>
            <p className="text-[#999999] text-sm leading-relaxed">
              Your trusted marketplace for quality second-hand phones and
              cycles. Affordable, reliable, and sustainable shopping.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#FFFFFF] font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-[#999999]">
              <li>
                <a href="/" className="hover:text-[#FFEA00] transition-colors">
                  Browse Products
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-[#FFFFFF] font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-[#999999]">
              <li>
                <div
                  onClick={() => {
                    navigate("/about");
                  }}
                  className="hover:text-[#FFEA00] transition-colors"
                >
                  Contact Us
                </div>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-[#FFFFFF] font-bold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/profile.php?id=61583617965921"
                className="w-10 h-10 bg-[#2A2A2A] rounded-lg flex items-center justify-center hover:bg-[#FFEA00] hover:text-[#1A1A1A] transition-colors"
              >
                <FaFacebook size={18} />
              </a>
              <a
                href="https://www.tiktok.com/@aswedaul.rego?_r=1&_t=ZS-91bNePWu1A0"
                className="w-10 h-10 bg-[#2A2A2A] rounded-lg flex items-center justify-center hover:bg-[#FFEA00] hover:text-[#1A1A1A] transition-colors"
              >
                <FaTiktok size={18} />
              </a>
              <a
                href="https://t.me/aswedaul_bot"
                className="w-10 h-10 bg-[#2A2A2A] rounded-lg flex items-center justify-center hover:bg-[#FFEA00] hover:text-[#1A1A1A] transition-colors"
              >
                <FaTelegram size={18} />
              </a>
              {/* <a
                href="#"
                className="w-10 h-10 bg-[#2A2A2A] rounded-lg flex items-center justify-center hover:bg-[#FFEA00] hover:text-[#1A1A1A] transition-colors"
              >
                <FaLinkedin size={18} />
              </a> */}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[#333333] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#666666] text-sm">
            &copy; 2025 Aswedaul. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-[#666666]">
            <a href="#" className="hover:text-[#FFEA00]">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[#FFEA00]">
              Terms of Service
            </a>
            <a href="#" className="hover:text-[#FFEA00]">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
