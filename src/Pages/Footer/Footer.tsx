import { Link } from "react-router-dom";


const Footer = () => {
    return (
        <footer className="footer bg-gradient-to-tr from-[#083f53] to-[#1c9991] text-neutral-content p-10">
  <nav>
    <h6 className="footer-title">Services</h6>
    <a className="link link-hover"><Link to="/">Team Section</Link></a>
    <a className="link link-hover"><Link to="/about">Voucher</Link></a>
  </nav>
  <nav>
    <h6 className="footer-title">Company</h6>
    <a className="link link-hover"><Link to="/product">Product</Link></a>
    <a className="link link-hover"><Link to="/productManagement">Dashboard</Link></a>
  </nav>
  <nav>
    <h6 className="footer-title">Legal</h6>
    <a className="link link-hover">Terms of use</a>
    <a className="link link-hover">Privacy policy</a>
    <a className="link link-hover">Cookie policy</a>
  </nav>
</footer>
    );
};

export default Footer;