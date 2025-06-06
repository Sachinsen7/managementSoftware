import { motion } from "framer-motion";
import { useState } from "react";
import { useCategories } from "../../hooks/api";
import CategoryForm from "./CategoryForm";

const tableVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

/**
 * List of categories with edit/delete actions
 * @param {Object} props
 * @param {Array} props.categories - List of categories
 */
function CategoryList({ categories }) {
  const [editingCategory, setEditingCategory] = useState(null);
  const { deleteCategory } = useCategories();

  const handleDelete = async (id) => {
    if (window.confirm("Delete this category?")) {
      try {
        await deleteCategory(id);
      } catch (err) {
        alert(err.message);
      }
    }
  };

  return (
    <motion.div
      className="bg-admin_card rounded-lg shadow-md overflow-x-auto"
      variants={tableVariants}
      initial="hidden"
      animate="visible"
    >
      {editingCategory && (
        <CategoryForm
          category={editingCategory}
          onCancel={() => setEditingCategory(null)}
        />
      )}
      <table className="min-w-full">
        <thead className="bg-admin_secondary">
          <tr>
            <th className="p-4 text-left text-admin_textSecondary">ID</th>
            <th className="p-4 text-left text-admin_textSecondary">Name</th>
            <th className="p-4 text-left text-admin_textSecondary">
              Description
            </th>
            <th className="p-4 text-left text-admin_textSecondary">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <motion.tr
              key={cat.id}
              variants={tableVariants}
              className="border-t border-admin_secondary"
            >
              <td className="p-4 text-admin_text">{cat.id}</td>
              <td className="p-4 text-admin_text">{cat.name}</td>
              <td className="p-4 text-admin_text">{cat.description}</td>
              <td className="p-4 flex space-x-2">
                <button
                  onClick={() => setEditingCategory(cat)}
                  className="text-admin_accent hover:text-admin_accentHover"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(cat.id)}
                  className="text-admin_danger hover:text-admin_dangerHover"
                >
                  Delete
                </button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}

export default CategoryList;
