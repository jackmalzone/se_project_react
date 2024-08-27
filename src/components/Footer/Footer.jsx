import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <h3 className="footer__text">Developed by Jack Malzone</h3>
      <p className="footer__copyright">© {currentYear}</p>
    </footer>
  );
}

export default Footer;
