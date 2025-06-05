// frontend/src/pages/admin/BorrowSection.jsx
import { useState } from "react";
import { motion } from "framer-motion";

// Dummy borrow requests
const borrowRequests = [
  {
    id: 1,
    user: "John Doe",
    item: "Headphones",
    status: "Pending",
    date: "2025-06-01",
  },
  {
    id: 2,
    user: "Jane Smith",
    item: "Smart Watch",
    status: "Approved",
    date: "2025-06-02",
  },
];

const tableVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, staggerChildren: 0.1 } },
};

function BorrowTracker() {
  const [requests, setRequests] = useState(borrowRequests);

  const updateStatus = (id, newStatus) => {
    setRequests(
      requests.map((req) =>
        req.id === id ? { ...req, status: newStatus } : req
      )
    );
    alert(`Borrow request ${id} updated to ${newStatus}!`);
  };

  return (
    <motion.div
      className="space-y-6"
      variants={tableVariants}
      initial="hidden"
      animate="visible"
    >
      <h2 className="text-2xl font-bold text-admin_text">Borrow Requests</h2>
      <div className="bg-admin_card rounded-lg shadow-md overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-admin_secondary">
            <tr>
              <th className="p-4 text-left text-admin_textSecondary">ID</th>
              <th className="p-4 text-left text-admin_textSecondary">User</th>
              <th className="p-4 text-left text-admin_textSecondary">Item</th>
              <th className="p-4 text-left text-admin_textSecondary">Status</th>
              <th className="p-4 text-left text-admin_textSecondary">Date</th>
              <th className="p-4 text-left text-admin_textSecondary">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <motion.tr
                key={req.id}
                variants={tableVariants}
                className="border-t border-admin_secondary"
              >
                <td className="p-4 text-admin_text">{req.id}</td>
                <td className="p-4 text-admin_text">{req.user}</td>
                <td className="p-4 text-admin_text">{req.item}</td>
                <td className="p-4 text-admin_text">{req.status}</td>
                <td className="p-4 text-admin_text">{req.date}</td>
                <td className="p-4">
                  <select
                    onChange={(e) => updateStatus(req.id, e.target.value)}
                    className="border border-admin_secondary rounded p-1 text-admin_text"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Denied">Denied</option>
                  </select>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

export default BorrowTracker;
