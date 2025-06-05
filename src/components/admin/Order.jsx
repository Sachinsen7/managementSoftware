import { useState } from "react";
import { motion } from "framer-motion";

// Dummy orders
const orders = [
  { id: 1, customer: "John Doe", total: 29.99, status: "Pending" },
  { id: 2, customer: "Jane Smith", total: 79.99, status: "Shipped" },
];

const tableVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, staggerChildren: 0.1 } },
};

function Orders() {
  const [orderList, setOrderList] = useState(orders);

  const updateStatus = (id, newStatus) => {
    setOrderList(
      orderList.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
    alert(`Order ${id} status updated to ${newStatus}!`);
  };

  return (
    <motion.div
      className="space-y-6"
      variants={tableVariants}
      initial="hidden"
      animate="visible"
    >
      <h2 className="text-2xl font-bold text-admin_text">Order Management</h2>
      <div className="bg-admin_card rounded-lg shadow-md overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-admin_secondary">
            <tr>
              <th className="p-4 text-left text-admin_textSecondary">ID</th>
              <th className="p-4 text-left text-admin_textSecondary">
                Customer
              </th>
              <th className="p-4 text-left text-admin_textSecondary">Total</th>
              <th className="p-4 text-left text-admin_textSecondary">Status</th>
              <th className="p-4 text-left text-admin_textSecondary">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {orderList.map((order) => (
              <motion.tr
                key={order.id}
                variants={tableVariants}
                className="border-t border-admin_secondary"
              >
                <td className="p-4 text-admin_text">{order.id}</td>
                <td className="p-4 text-admin_text">{order.customer}</td>
                <td className="p-4 text-admin_text">${order.total}</td>
                <td className="p-4 text-admin_text">{order.status}</td>
                <td className="p-4">
                  <select
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                    className="border border-admin_secondary rounded p-1 text-admin_text"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
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

export default Orders;
