import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h4>IRCTC</h4>
        <a href="#">Trains</a>
        <a href="#">General Information</a>
        <a href="#">Important Information</a>
        <a href="#">Agents</a>
        <a href="#">Enquiries</a>
        <a href="#">How To</a>
      </div>

      <div className="footer-section">
        <h4>Services</h4>
        <a href="#">IRCTC Official App</a>
        <a href="#">Advertise with us</a>
        <a href="#">Refund Rules</a>
        <a href="#">Person With Disability Facilities</a>
        <a href="#">E-Wallet</a>
        <a href="#">IRCTC Co-branded Card Benefits</a>
      </div>

      <div className="footer-section">
        <h4>Payment</h4>
        <a href="#">IRCTC-iPAY Payment Gateway</a>
        <a href="#">IRCTC Zone</a>
        <a href="#">DMRC Ticket Booking at IRCTC</a>
        <a href="#">For Newly Migrated Agents</a>
        <a href="#">Mobile Zone</a>
      </div>

      <div className="footer-section">
        <h4>Support</h4>
        <a href="#">Policies</a>
        <a href="#">Ask Disha ChatBot</a>
        <a href="#">About us</a>
        <a href="#">Help & Support</a>
        <a href="#">E-Pantry</a>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-left">
          <div className="copyright">
            <p>Copyright &copy; 2026 - www.irctc.co.in. All Rights Reserved</p>
            <p>Designed and Hosted by CRIS | Compatible Browsers: Chrome, Firefox, Edge, Safari</p>
          </div>
        </div>
        <div className="footer-bottom-right">
          <div className="payment-methods">
            <span>We Accept:</span>
            <img src="/src/assets/gpay.png" alt="Google Pay" />
            <img src="/src/assets/rupay.png" alt="RuPay" />
            <img src="/src/assets/paytm.png" alt="Paytm" />
          </div>
        </div>
      </div>
    </footer>
  );
}
