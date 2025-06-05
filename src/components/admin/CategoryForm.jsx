import { useState } from "react";
import { motion } from "framer-motion";
import { useCategories } from "../../hooks/api";

const formVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

/**
 * Form for adding/editing categories
 * @param {Object} props
 * @param {Object} props.category - Category to edit (optional)
 * @param {Function} props.onCancel - Cancel edit callback (optional)
 */
function CategoryForm({ category, onCancel }) {
  const [form, setForm] = useState({
    id: category?.id || null,
    name: category?.name || "",
    description: category?.description || "",
  });
  const [errors, setErrors] = useState({});
  const { addCategory, updateCategory } = useCategories();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = "Name is required";
    if (!form.description) newErrors.description = "Description is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      if (form.id) {
        await updateCategory(form.id, {
          name: form.name,
          description: form.description,
        });
      } else {
        await addCategory({ name: form.name, description: form.description });
      }
      setForm({ id: null, name: "", description: "" });
      setErrors({});
      if (onCancel) onCancel();
    } catch (err) {
      setErrors({ submit: err.message });
    }
  };

  return (
    <motion.div
      className="bg-admin_card p-6 rounded-lg shadow-md"
      variants={formVariants}
      initial="hidden"
      animate="visible"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-admin_textSecondary text-sm mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Category Name"
              className={`w-full p-2 rounded border ${
                errors.name ? "border-admin_danger" : "border-admin_secondary"
              } text-admin_text`}
            />
            {errors.name && (
              <p className="text-admin_danger text-sm mt-1">{errors.name}</p>
            )}
          </div>
          <div>
            <label className="block text-admin_textSecondary text-sm mb-1">
              Description
            </label>
            <input
              type="text"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Description"
              className={`w-full p-2 rounded border ${
                errors.description
                  ? "border-admin_danger"
                  : "border-admin_secondary"
              } text-admin_text`}
            />
            {errors.description && (
              <p className="text-admin_danger text-sm mt-1">
                {errors.description}
              </p>
            )}
          </div>
        </div>
        {errors.submit && (
          <p className="text-admin_danger text-sm">{errors.submit}</p>
        )}
        <div className="flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            type="submit"
            className="bg-admin_primary text-admin_card px-4 py-2 rounded-md font-semibold hover:bg-admin_primaryHover"
          >
            {form.id ? "Update" : "Add"} Category
          </motion.button>
          {form.id && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              type="button"
              onClick={onCancel}
              className="bg-admin_danger text-admin_card px-4 py-2 rounded-md font-semibold hover:bg-admin_dangerHover"
            >
              Cancel
            </motion.button>
          )}
        </div>
      </form>
    </motion.div>
  );
}

export default CategoryForm;
