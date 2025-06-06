import { motion } from "framer-motion";

// Framer Motion variants
const sidebarVariants = {
  hidden: { x: -250 },
  visible: { x: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

const itemVariants = {
  hover: { x: 5, backgroundColor: "white", transition: { duration: 0.2 } }, // Changed to admin_accent
};

function Sidebar({ setActivePage, activePage, closeSidebar }) {
  const menuItems = [
    {
      name: "Dashboard",
      icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3",
    },
    {
      name: "Products",
      icon: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z",
    },
    {
      name: "Orders",
      icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    },
    {
      name: "Users",
      icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197",
    },
    {
      name: "Borrows",
      icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
    },
    {
      name: "Categories",
      icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z",
    },
    {
      name: "Payment",
      icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
    },
    {
      name: "AdminManagement",
      icon: "M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z",
    },
    {
      name: "Sales",
      icon: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z",
    },
    {
      name: "WebsiteManagement",
      icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    },
  ];

  return (
    <motion.aside
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
      className="w-56 sm:w-64 bg-[#222f3e] flex flex-col shadow-xl rounded-l-xl h-screen z-50"
    >
      <div className="p-4 sm:p-6 flex justify-between items-center">
        <h1 className="text-lg sm:text-xl font-bold text-[#e3e6e6]">
          Admin Panel
        </h1>
        <button
          className="md:hidden text-[#e3e6e6] focus:outline-none"
          onClick={closeSidebar}
          aria-label="Close Sidebar"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-1 p-3 sm:p-4">
          {menuItems.map((item) => (
            <motion.li
              key={item.name}
              variants={itemVariants}
              whileHover="hover"
              className={`flex items-center p-2 sm:p-3 rounded-lg cursor-pointer ${
                activePage === item.name
                  ? "bg-admin_primary text-admin_card hover:text-admin_text"
                  : "text-[#e3e6e6] hover:text-admin_text"
              }`}
              onClick={() => {
                setActivePage(item.name);
                closeSidebar();
              }}
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3"
                fill={activePage === item.name ? "#ffffff" : "#f59e0b"}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={item.icon}
                />
              </svg>
              <span className="text-xs sm:text-sm font-semibold">
                {item.name}
              </span>
            </motion.li>
          ))}
        </ul>
      </nav>
    </motion.aside>
  );
}

export default Sidebar;
