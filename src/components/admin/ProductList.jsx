// frontend/src/components/admin/ProductList.jsx
import { motion } from "framer-motion";
import { useState } from "react";
import { useProducts } from "../../hooks/api";
import ProductForm from "./ProductForm";

const tableVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

/**
 * List of products with edit/delete actions
 * @param {Object} props
 * @param {Array} props.products - List of products
 * @param {Array} props.categories - List of categories for reference
 */
function ProductList({ products, categories }) {
  const [editingProduct, setEditingProduct] = useState(null);
  const { deleteProduct } = useProducts();

  const getCategoryName = (categoryId) =>
    categories.find((cat) => cat.id === categoryId)?.name || "N/A";

  const handleDelete = async (id) => {
    if (window.confirm("Delete this product?")) {
      try {
        await deleteProduct(id);
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
      {editingProduct && (
        <ProductForm
          product={editingProduct}
          categories={categories}
          onCancel={() => setEditingProduct(null)}
        />
      )}
      <table className="min-w-full">
        <thead className="bg-admin_secondary">
          <tr>
            <th className="p-4 text-left text-admin_textSecondary">ID</th>
            <th className="p-4 text-left text-admin_textSecondary">Name</th>
            <th className="p-4 text-left text-admin_textSecondary">
              Price (INR)
            </th>
            <th className="p-4 text-left text-admin_textSecondary">Stock</th>
            <th className="p-4 text-left text-admin_textSecondary">Category</th>
            <th className="p-4 text-left text-admin_textSecondary">Image</th>
            <th className="p-4 text-left text-admin_textSecondary">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <motion.tr
              key={prod.id}
              variants={tableVariants}
              className="border-t border-admin_secondary"
            >
              <td className="p-4 text-admin_text">{prod.id}</td>
              <td className="p-4 text-admin_text">{prod.name}</td>
              <td className="p-4 text-admin_text">
                ₹{prod.price.toLocaleString("en-IN")}
              </td>
              <td className="p-4 text-admin_text">{prod.stock}</td>
              <td className="p-4 text-admin_text">
                {getCategoryName(prod.categoryId)}
              </td>
              <td className="p-4 text-admin_text">
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-12 h-12 object-cover rounded"
                />
              </td>
              <td className="p-4 flex space-x-2">
                <button
                  onClick={() => setEditingProduct(prod)}
                  className="text-admin_accent hover:text-admin_accentHover"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(prod.id)}
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

export default ProductList;
