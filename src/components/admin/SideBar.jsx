import { motion } from "framer-motion";

// Framer Motion variants
const sidebarVariants = {
  hidden: { x: -250 },
  visible: { x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const itemVariants = {
  hover: { x: 5, backgroundColor: "#d1d5db", transition: { duration: 0.2 } },
};

function Sidebar({ setActivePage, activePage }) {
  const menuItems = [
    {
      name: "Dashboard",
    },
    { name: "Products" },
    {
      name: "Orders",
    },
    { name: "Users" },
    { name: "Borrows" },
    { name: "Categories" },
    { name: "Payment" },
    { name: "AdminManagement" },
  ];

  return (
    <motion.aside
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
      className="w-64 bg-[#222f3e] flex flex-col shadow-xl rounded-l-xl"
    >
      <div className="p-6">
        <h1 className="text-2xl font-bold text-[#e3e6e6]">Admin Panel</h1>
      </div>
      <nav className="flex-1">
        <ul className="space-y-1 p-4">
          {menuItems.map((item) => (
            <motion.li
              key={item.name}
              variants={itemVariants}
              whileHover="hover"
              className={`flex items-center p-3 rounded-lg font-bold text-3xl cursor-pointer ${
                activePage === item.name
                  ? "bg-none text-[#e3e6e6]"
                  : "text-[#e3e6e6] hover:text-admin_text"
              }`}
              onClick={() => setActivePage(item.name)}
            >
              <svg
                className="w-5 h-5 mr-3"
                fill={activePage === item.name ? "#ffffff" : "#f59e0b"}
                viewBox="0 0 24 24"
              >
                <path d={item.icon} />
              </svg>
              <span className="text-sm font-semibold">{item.name}</span>
            </motion.li>
          ))}
        </ul>
      </nav>
    </motion.aside>
  );
}

export default Sidebar;
