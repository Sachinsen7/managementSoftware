// frontend/src/pages/admin/Payment.jsx
import { motion } from "framer-motion";

// Dummy payments
const payments = [
  {
    id: 1,
    user: "John Doe",
    amount: 29.99,
    status: "Completed",
    date: "2025-06-01",
  },
  {
    id: 2,
    user: "Jane Smith",
    amount: 79.99,
    status: "Pending",
    date: "2025-06-02",
  },
];

const tableVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, staggerChildren: 0.1 } },
};

function Payment() {
  return (
    <motion.div
      className="space-y-6"
      variants={tableVariants}
      initial="hidden"
      animate="visible"
    >
      <h2 className="text-2xl font-bold text-admin_text">Payment Management</h2>
      <div className="bg-admin_card rounded-lg shadow-md overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-admin_secondary">
            <tr>
              <th className="p-4 text-left text-admin_textSecondary">ID</th>
              <th className="p-4 text-left text-admin_textSecondary">User</th>
              <th className="p-4 text-left text-admin_textSecondary">Amount</th>
              <th className="p-4 text-left text-admin_textSecondary">Status</th>
              <th className="p-4 text-left text-admin_textSecondary">Date</th>
              <th className="p-4 text-left text-admin_textSecondary">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <motion.tr
                key={payment.id}
                variants={tableVariants}
                className="border-t border-admin_secondary"
              >
                <td className="p-4 text-admin_text">{payment.id}</td>
                <td className="p-4 text-admin_text">{payment.user}</td>
                <td className="p-4 text-admin_text">${payment.amount}</td>
                <td className="p-4">
                  <span
                    className={`text-sm px-2 py-1 rounded-full ${
                      payment.status === "Completed"
                        ? "bg-admin_accent text-admin_card"
                        : "bg-admin_danger text-admin_card"
                    }`}
                  >
                    {payment.status}
                  </span>
                </td>
                <td className="p-4 text-admin_text">{payment.date}</td>
                <td className="p-4">
                  <button className="text-admin_accent hover:text-admin_accentHover">
                    View Details
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

export default Payment;
