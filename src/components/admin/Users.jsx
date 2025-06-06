import { useState } from "react";
import { motion } from "framer-motion";

// Dummy users
const users = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Customer" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Admin" },
];

const tableVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, staggerChildren: 0.1 } },
};

function Users() {
  const [userList, setUserList] = useState(users);

  const deleteUser = (id) => {
    setUserList(userList.filter((user) => user.id !== id));
    alert("User deleted!");
  };

  return (
    <motion.div
      className="space-y-6"
      variants={tableVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-admin_text">User Management</h2>
        <button className="bg-[#1e3a8a] text-white px-4 py-2 rounded-md hover:bg-admin_primaryHover">
          Add User
        </button>
      </div>
      <div className="bg-admin_card rounded-lg shadow-md overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-admin_secondary">
            <tr>
              <th className="p-4 text-left text-admin_textSecondary">ID</th>
              <th className="p-4 text-left text-admin_textSecondary">Name</th>
              <th className="p-4 text-left text-admin_textSecondary">Email</th>
              <th className="p-4 text-left text-admin_textSecondary">Role</th>
              <th className="p-4 text-left text-admin_textSecondary">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user) => (
              <motion.tr
                key={user.id}
                variants={tableVariants}
                className="border-t border-admin_secondary"
              >
                <td className="p-4 text-admin_text">{user.id}</td>
                <td className="p-4 text-admin_text">{user.name}</td>
                <td className="p-4 text-admin_text">{user.email}</td>
                <td className="p-4 text-admin_text">{user.role}</td>
                <td className="p-4">
                  <button className="text-admin_accent hover:text-admin_accentHover mr-4">
                    Edit
                  </button>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="text-admin_danger hover:text-admin_dangerHover"
                  >
                    Delete
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

export default Users;
