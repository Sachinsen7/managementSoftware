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
      className="space-y-6 p-4 sm:p-6 w-full max-w-full"
      variants={tableVariants}
      initial="hidden"
      animate="visible"
    >
      <h2 className="text-xl sm:text-2xl font-bold text-admin_text">
        Borrow Requests
      </h2>
      <div className="bg-admin_card rounded-lg shadow-md w-full overflow-hidden">
        <div className="relative w-full overflow-x-auto">
          <table className="w-full min-w-[800px] table-auto">
            <thead className="bg-admin_secondary">
              <tr>
                <th className="px-2 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm text-admin_textSecondary truncate min-w-[80px]">
                  ID
                </th>
                <th className="px-2 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm text-admin_textSecondary truncate min-w-[120px]">
                  User
                </th>
                <th className="px-2 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm text-admin_textSecondary truncate min-w-[120px]">
                  Item
                </th>
                <th className="px-2 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm text-admin_textSecondary truncate min-w-[100px]">
                  Status
                </th>
                <th className="px-2 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm text-admin_textSecondary truncate min-w-[100px]">
                  Date
                </th>
                <th className="px-2 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm text-admin_textSecondary truncate min-w-[120px]">
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
                  <td className="px-2 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm text-admin_text truncate min-w-[80px]">
                    {req.id}
                  </td>
                  <td className="px-2 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm text-admin_text truncate min-w-[120px]">
                    {req.user}
                  </td>
                  <td className="px-2 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm text-admin_text truncate min-w-[120px]">
                    {req.item}
                  </td>
                  <td className="px-2 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm text-admin_text truncate min-w-[100px]">
                    {req.status}
                  </td>
                  <td className="px-2 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm text-admin_text truncate min-w-[100px]">
                    {req.date}
                  </td>
                  <td className="px-2 py-2 sm:px-4 sm:py-3 min-w-[120px]">
                    <select
                      value={req.status}
                      onChange={(e) => updateStatus(req.id, e.target.value)}
                      className="w-full sm:w-auto border border-admin_secondary rounded p-1 text-xs sm:text-sm text-admin_text bg-admin_card focus:outline-none focus:ring-2 focus:ring-admin_primary"
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
      </div>
    </motion.div>
  );
}

export default BorrowTracker;
