import { motion } from "framer-motion";

// Mock sales data
const salesData = {
  totalSales: 125000, // INR
  recentTransactions: [
    { id: 1, amount: 1500, date: "2025-06-05" },
    { id: 2, amount: 3200, date: "2025-06-04" },
  ],
};

// Framer Motion variants
const widgetVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

function SalesWidget() {
  return (
    <motion.div
      className="p-3 sm:p-4 bg-[#2a3b4e] rounded-lg mx-3 sm:mx-4 mb-4"
      variants={widgetVariants}
      initial="hidden"
      animate="visible"
    >
      <h3 className="text-sm sm:text-base font-semibold text-[#e3e6e6] mb-3">
        Sales Overview
      </h3>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-xs sm:text-sm text-[#e3e6e6]">Total Sales</span>
          <span className="text-xs sm:text-sm font-bold text-admin_accent">
            ₹{salesData.totalSales.toLocaleString()}
          </span>
        </div>
        <div className="border-t border-admin_secondary pt-2">
          <h4 className="text-xs sm:text-sm text-[#e3e6e6] mb-2">
            Recent Transactions
          </h4>
          {salesData.recentTransactions.map((tx) => (
            <div
              key={tx.id}
              className="flex justify-between text-xs text-[#e3e6e6]"
            >
              <span>
                #{tx.id} - {tx.date}
              </span>
              <span className="text-admin_accent">₹{tx.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default SalesWidget;
