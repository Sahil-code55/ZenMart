import logo from "../assets/ZenLogo2.png"
import { Link } from "react-router-dom";

function Logo({ className = "w-36" }) {
  return (
    <Link to="/products" className="inline-flex items-center">
      <img
        src={logo}
        alt="ZenMart"
        className={`${className} h-auto object-contain`}
      />
    </Link>
  );
}

export default Logo;