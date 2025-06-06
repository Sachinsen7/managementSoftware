import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Framer Motion variants
const footerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const linkVariants = {
  hover: { scale: 1.1, y: -2, transition: { duration: 0.2 } },
};

function Footer({ companyName = "Commerce" }) {
  const links = [
    { path: "/", label: "Home" },
    { path: "/products", label: "Products" },
    { path: "/cart", label: "Cart" },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      variants={footerVariants}
      initial="hidden"
      animate="visible"
      className="bg-slate-800 text-white py-8"
    >
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo and Shop Name */}
        <div className="flex flex-col items-center md:items-start">
          <Link to="/">
            <motion.h1
              className="text-3xl font-medium text-white  transition-colors duration-200 border-b-2 border-transparent"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              {companyName}
            </motion.h1>
          </Link>
          <p className="text-lg font-medium">{companyName}</p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            {links.map((link) => (
              <motion.li
                key={link.path}
                variants={linkVariants}
                whileHover="hover"
              >
                <Link
                  to={link.path}
                  className="text-white hover:text-linkHover transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col items-center md:items-end">
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <p className="text-sm">
            {/* Email: support@{theme.shopName.toLowerCase().replace(" ", "")}.com */}
          </p>
          <p className="text-sm">Phone: (123) 456-7890</p>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 text-center text-slate-400 text-sm border-t border-slate-700 pt-4">
        &copy; {currentYear} {companyName}. All rights reserved.
      </div>
    </motion.footer>
  );
}

export default Footer;
