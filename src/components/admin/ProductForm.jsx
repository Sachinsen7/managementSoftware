import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const formVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

function ProductForm({ product, onCancel }) {
  const [form, setForm] = useState({
    id: product?.id || null,
    name: product?.name || "",
    price: product?.price || "",
    stock: product?.stock || "",
    image: product?.image || "",
    categoryId: product?.categoryId || "",
  });
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Fetch categories and products
    const fetchData = async () => {
      try {
        const [categoriesResponse, productsResponse] = await Promise.all([
          fetch("http://localhost:5000/api/categories"),
          fetch("http://localhost:5000/api/products"),
        ]);
        const categoriesData = await categoriesResponse.json();
        const productsData = await productsResponse.json();
        setCategories(categoriesData);
        setProducts(productsData);
      } catch (err) {
        setErrors({ fetch: "Failed to fetch data" });
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = "Name is required";
    if (!form.price || form.price <= 0)
      newErrors.price = "Valid price is required";
    if (!form.stock || form.stock < 0)
      newErrors.stock = "Valid stock is required";
    if (!form.image) newErrors.image = "Image URL is required";
    if (!form.categoryId) newErrors.categoryId = "Category is required";
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
      const productData = {
        name: form.name,
        price: parseFloat(form.price),
        stock: parseInt(form.stock),
        image: form.image,
        categoryId: parseInt(form.categoryId),
      };
      if (form.id) {
        const response = await fetch(
          `http://localhost:5000/api/products/${form.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(productData),
          }
        );
        if (!response.ok) throw new Error("Failed to update product");
      } else {
        const response = await fetch("http://localhost:5000/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productData),
        });
        if (!response.ok) throw new Error("Failed to add product");
      }
      setForm({
        id: null,
        name: "",
        price: "",
        stock: "",
        image: "",
        categoryId: "",
      });
      setErrors({});
      if (onCancel) onCancel();
      // Refresh products
      const response = await fetch("http://localhost:5000/api/products");
      const data = await response.json();
      setProducts(data);
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
      <h2 className="text-xl font-bold text-admin_text mb-4">
        Manage Products
      </h2>
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
              placeholder="Product Name"
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
              Price (INR)
            </label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Price"
              className={`w-full p-2 rounded border ${
                errors.price ? "border-admin_danger" : "border-admin_secondary"
              } text-admin_text`}
              step="0.01"
            />
            {errors.price && (
              <p className="text-admin_danger text-sm mt-1">{errors.price}</p>
            )}
          </div>
          <div>
            <label className="block text-admin_textSecondary text-sm mb-1">
              Stock
            </label>
            <input
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleChange}
              placeholder="Stock"
              className={`w-full p-2 rounded border ${
                errors.stock ? "border-admin_danger" : "border-admin_secondary"
              } text-admin_text`}
            />
            {errors.stock && (
              <p className="text-admin_danger text-sm mt-1">{errors.stock}</p>
            )}
          </div>
          <div>
            <label className="block text-admin_textSecondary text-sm mb-1">
              Image URL
            </label>
            <input
              type="text"
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="Image URL"
              className={`w-full p-2 rounded border ${
                errors.image ? "border-admin_danger" : "border-admin_secondary"
              } text-admin_text`}
            />
            {errors.image && (
              <p className="text-admin_danger text-sm mt-1">{errors.image}</p>
            )}
          </div>
          <div className="md:col-span-2">
            <label className="block text-admin_textSecondary text-sm mb-1">
              Category
            </label>
            <select
              name="categoryId"
              value={form.categoryId}
              onChange={handleChange}
              className={`w-full p-2 rounded border ${
                errors.categoryId
                  ? "border-admin_danger"
                  : "border-admin_secondary"
              } text-admin_text`}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <p className="text-admin_danger text-sm mt-1">
                {errors.categoryId}
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
            {form.id ? "Update" : "Add"} Product
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

      {/* Product List */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-admin_text mb-4">
          Product List
        </h3>
        <div className="bg-admin_card rounded-lg shadow-md w-full overflow-hidden">
          <div className="relative w-full overflow-x-auto">
            <table className="w-full min-w-[800px] table-auto">
              <thead className="bg-admin_secondary">
                <tr>
                  <th className="px-4 py-3 text-left text-sm text-admin_textSecondary">
                    ID
                  </th>
                  <th className="px-4 py-3 text-left text-sm text-admin_textSecondary">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-sm text-admin_textSecondary">
                    Price
                  </th>
                  <th className="px-4 py-3 text-left text-sm text-admin_textSecondary">
                    Stock
                  </th>
                  <th className="px-4 py-3 text-left text-sm text-admin_textSecondary">
                    Category
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((prod) => (
                  <motion.tr
                    key={prod.id}
                    variants={formVariants}
                    className="border-t border-admin_secondary"
                  >
                    <td className="px-4 py-3 text-sm text-admin_text">
                      {prod.id}
                    </td>
                    <td className="px-4 py-3 text-sm text-admin_text">
                      {prod.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-admin_text">
                      ₹{prod.price}
                    </td>
                    <td className="px-4 py-3 text-sm text-admin_text">
                      {prod.stock}
                    </td>
                    <td className="px-4 py-3 text-sm text-admin_text">
                      {categories.find((cat) => cat.id === prod.categoryId)
                        ?.name || "N/A"}
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

export default ProductForm;
