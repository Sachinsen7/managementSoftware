import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Animation variants for the form
const formVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

function CategoryForm({ category, onCancel }) {
  // State for form fields
  const [form, setForm] = useState({
    id: category?.id || null,
    name: category?.name || "",
    description: category?.description || "",
  });
  // State for list of categories
  const [categories, setCategories] = useState([]);
  // State for validation and fetch errors
  const [errors, setErrors] = useState({});

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/categories");
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setErrors({ fetch: "Failed to fetch categories" });
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Validate form fields
  const validate = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = "Name is required";
    if (!form.description) newErrors.description = "Description is required";
    return newErrors;
  };

  // Handle form submission for add/update
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      // Update category if id exists, else add new
      if (form.id) {
        const response = await fetch(
          `http://localhost:5000/api/categories/${form.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: form.name,
              description: form.description,
            }),
          }
        );
        if (!response.ok) throw new Error("Failed to update category");
      } else {
        const response = await fetch("http://localhost:5000/api/categories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name,
            description: form.description,
          }),
        });
        if (!response.ok) throw new Error("Failed to add category");
      }
      // Reset form and errors
      setForm({ id: null, name: "", description: "" });
      setErrors({});
      if (onCancel) onCancel();
      // Refresh categories list
      const response = await fetch("http://localhost:5000/api/categories");
      const data = await response.json();
      setCategories(data);
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
      {/* Form Title */}
      <h2 className="text-xl font-bold text-admin_text mb-4">
        Manage Categories
      </h2>
      {/* Category Add/Edit Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name Field */}
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
          {/* Description Field */}
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
        {/* Submission Error */}
        {errors.submit && (
          <p className="text-admin_danger text-sm">{errors.submit}</p>
        )}
        {/* Form Buttons */}
        <div className="flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            type="submit"
            className="bg-admin_primary text-admin_card px-4 py-2 rounded-md font-semibold hover:bg-admin_primaryHover"
          >
            {form.id ? "Update" : "Add"} Category
          </motion.button>
          {/* Cancel Button for Edit Mode */}
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

      {/* Category List Table */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-admin_text mb-4">
          Category List
        </h3>
        <div className="bg-admin_card rounded-lg shadow-md w-full overflow-hidden">
          <div className="relative w-full overflow-x-auto">
            <table className="w-full min-w-[600px] table-auto">
              <thead className="bg-admin_secondary">
                <tr>
                  <th className="px-4 py-3 text-left text-sm text-admin_textSecondary">
                    ID
                  </th>
                  <th className="px-4 py-3 text-left text-sm text-admin_textSecondary">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-sm text-admin_textSecondary">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Render all categories */}
                {categories.map((cat) => (
                  <motion.tr
                    key={cat.id}
                    variants={formVariants}
                    className="border-t border-admin_secondary"
                  >
                    <td className="px-4 py-3 text-sm text-admin_text">
                      {cat.id}
                    </td>
                    <td className="px-4 py-3 text-sm text-admin_text">
                      {cat.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-admin_text">
                      {cat.description}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default CategoryForm;
