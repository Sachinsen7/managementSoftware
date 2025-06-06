// frontend/src/pages/admin/Dashboard.jsx
import { motion } from "framer-motion";

// Dummy stats
const stats = [
  {
    label: "Total Sales",
    value: "$12,345",
    icon: "M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 2c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm0-8C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z",
  },
  {
    label: "Orders",
    value: "123",
    icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  },
  { label: "Products", value: "45", icon: "M3 3h18v18H3V3z" },
  { label: "Users", value: "789", icon: "M12 4.5v15m7.5-7.5h-15" },
];

const statVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, staggerChildren: 0.1 },
  },
};

function Dashboard() {
  return (
    <motion.div
      className="space-y-6 "
      variants={statVariants}
      initial="hidden"
      animate="visible"
    >
      <h2 className="text-2xl font-bold text-admin_text">Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            variants={statVariants}
            className="bg-admin_card p-6 rounded-lg shadow-md flex items-center space-x-4"
          >
            <svg
              className="w-8 h-8 text-admin_accent"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d={stat.icon} />
            </svg>
            <div>
              <p className="text-admin_textSecondary text-sm">{stat.label}</p>
              <p className="text-2xl font-bold text-admin_text">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default Dashboard;
