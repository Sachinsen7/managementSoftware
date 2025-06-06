import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Framer Motion variants
const tableVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, staggerChildren: 0.1 } },
};

function WebsiteManagement() {
  const [websites, setWebsites] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [newWebsite, setNewWebsite] = useState({
    companyName: "",
    description: "",
    productIds: [],
    categoryIds: [],
    paymentMethodIds: [],
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          websitesResponse,
          productsResponse,
          categoriesResponse,
          paymentMethodsResponse,
        ] = await Promise.all([
          fetch("http://localhost:5000/api/websites"),
          fetch("http://localhost:5000/api/products"),
          fetch("http://localhost:5000/api/categories"),
          fetch("http://localhost:5000/api/payment-methods"),
        ]);
        const websitesData = await websitesResponse.json();
        const productsData = await productsResponse.json();
        const categoriesData = await categoriesResponse.json();
        const paymentMethodsData = await paymentMethodsResponse.json();
        setWebsites(websitesData);
        setProducts(productsData);
        setCategories(categoriesData);
        setPaymentMethods(paymentMethodsData);
      } catch (err) {
        setError("Failed to fetch data");
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    if (!newWebsite.companyName || !newWebsite.description) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const websiteData = {
        companyName: newWebsite.companyName,
        description: newWebsite.description,
        productIds: newWebsite.productIds.map(Number),
        categoryIds: newWebsite.categoryIds.map(Number),
        paymentMethodIds: newWebsite.paymentMethodIds.map(Number),
      };
      if (editingId) {
        const response = await fetch(
          `http://localhost:5000/api/websites/${editingId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(websiteData),
          }
        );
        if (!response.ok) throw new Error("Failed to update website");
        const updatedWebsite = await response.json();
        setWebsites(
          websites.map((site) =>
            site.id === editingId ? updatedWebsite : site
          )
        );
        setEditingId(null);
      } else {
        const response = await fetch("http://localhost:5000/api/websites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(websiteData),
        });
        if (!response.ok) throw new Error("Failed to add website");
        const newWebsiteData = await response.json();
        setWebsites([...websites, newWebsiteData]);
      }
      setNewWebsite({
        companyName: "",
        description: "",
        productIds: [],
        categoryIds: [],
        paymentMethodIds: [],
      });
    } catch (err) {
      setError("Failed to save website");
      console.error(err);
    }
  };

  const handleEdit = (website) => {
    setEditingId(website.id);
    setNewWebsite({
      companyName: website.companyName,
      description: website.description,
      productIds: website.productIds.map(String),
      categoryIds: website.categoryIds.map(String),
      paymentMethodIds: website.paymentMethodIds.map(String),
    });
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this website?")) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/websites/${id}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) throw new Error("Failed to delete website");
        setWebsites(websites.filter((site) => site.id !== id));
      } catch (err) {
        setError("Failed to delete website");
        console.error(err);
      }
    }
  };

  const handlePreview = (website) => {
    window.open(`/website/${website.id}`, "_blank");
  };

  const getProductsForWebsite = (productIds) =>
    products.filter((product) => productIds.includes(product.id));
  const getCategoriesForWebsite = (categoryIds) =>
    categories.filter((category) => categoryIds.includes(category.id));
  const getPaymentMethodsForWebsite = (paymentMethodIds) =>
    paymentMethods.filter((method) => paymentMethodIds.includes(method.id));

  if (error) {
    console.error("Error:", error);
  }

  return (
    <motion.div
      className="space-y-6 p-4 sm:p-6 w-full max-w-full"
      variants={tableVariants}
      initial="hidden"
      animate="visible"
    >
      <h2 className="text-xl sm:text-2xl font-bold text-admin_text">
        Website Management
      </h2>

      {/* Form to Add/Edit Websites */}
      <div className="bg-admin_card rounded-lg shadow-md p-4 sm:p-6">
        <h3 className="text-lg font-semibold text-admin_text mb-4">
          {editingId ? "Edit Website" : "Add New Website"}
        </h3>
        <form onSubmit={handleAddOrUpdate} className="space-y-4">
          <div>
            <label className="block text-sm text-admin_textSecondary mb-1">
              Company Name
            </label>
            <input
              type="text"
              value={newWebsite.companyName}
              onChange={(e) =>
                setNewWebsite({ ...newWebsite, companyName: e.target.value })
              }
              placeholder="Enter company name"
              className="w-full border border-admin_secondary rounded p-2 text-sm text-admin_text bg-admin_card focus:outline-none focus:ring-2 focus:ring-admin_primary"
            />
          </div>
          <div>
            <label className="block text-sm text-admin_textSecondary mb-1">
              Description
            </label>
            <textarea
              value={newWebsite.description}
              onChange={(e) =>
                setNewWebsite({ ...newWebsite, description: e.target.value })
              }
              placeholder="Enter company description"
              className="w-full border border-admin_secondary rounded p-2 text-sm text-admin_text bg-admin_card focus:outline-none focus:ring-2 focus:ring-admin_primary"
              rows="3"
            />
          </div>
          <div>
            <label className="block text-sm text-admin_textSecondary mb-1">
              Products
            </label>
            <select
              multiple
              value={newWebsite.productIds}
              onChange={(e) =>
                setNewWebsite({
                  ...newWebsite,
                  productIds: Array.from(
                    e.target.selectedOptions,
                    (option) => option.value
                  ),
                })
              }
              className="w-full border border-admin_secondary rounded p-2 text-sm text-admin_text bg-admin_card"
            >
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-admin_textSecondary mb-1">
              Categories
            </label>
            <select
              multiple
              value={newWebsite.categoryIds}
              onChange={(e) =>
                setNewWebsite({
                  ...newWebsite,
                  categoryIds: Array.from(
                    e.target.selectedOptions,
                    (option) => option.value
                  ),
                })
              }
              className="w-full border border-admin_secondary rounded p-2 text-sm text-admin_text bg-admin_card"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-admin_textSecondary mb-1">
              Payment Methods
            </label>
            <select
              multiple
              value={newWebsite.paymentMethodIds}
              onChange={(e) =>
                setNewWebsite({
                  ...newWebsite,
                  paymentMethodIds: Array.from(
                    e.target.selectedOptions,
                    (option) => option.value
                  ),
                })
              }
              className="w-full border border-admin_secondary rounded p-2 text-sm text-admin_text bg-admin_card"
            >
              {paymentMethods.map((method) => (
                <option key={method.id} value={method.id}>
                  {method.method}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="bg-admin_primary text-admin_card px-4 py-2 rounded hover:bg-admin_primaryHover transition duration-200 text-sm"
          >
            {editingId ? "Update Website" : "Add Website"}
          </button>
        </form>
      </div>

      {/* Website List */}
      <div className="bg-admin_card rounded-lg shadow-md w-full overflow-hidden">
        <div className="relative w-full overflow-x-auto">
          <table className="w-full min-w-[800px] table-auto">
            <thead className="bg-admin_secondary">
              <tr>
                <th className="px-2 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm text-admin_textSecondary min-w-[80px]">
                  ID
                </th>
                <th className="px-2 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm text-admin_textSecondary min-w-[120px]">
                  Company Name
                </th>
                <th className="px-2 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm text-admin_textSecondary min-w-[200px]">
                  Description
                </th>
                <th className="px-2 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm text-admin_textSecondary min-w-[150px]">
                  Products
                </th>
                <th className="px-2 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm text-admin_textSecondary min-w-[150px]">
                  Categories
                </th>
                <th className="px-2 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm text-admin_textSecondary min-w-[150px]">
                  Payment Methods
                </th>
                <th className="px-2 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm text-admin_textSecondary min-w-[150px]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {websites.map((website) => (
                <motion.tr
                  key={website.id}
                  variants={tableVariants}
                  className="border-t border-admin_secondary"
                >
                  <td className="px-2 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm text-admin_text min-w-[80px]">
                    {website.id}
                  </td>
                  <td className="px-2 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm text-admin_text min-w-[120px]">
                    {website.companyName}
                  </td>
                  <td className="px-2 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm text-admin_text min-w-[200px]">
                    {website.description}
                  </td>
                  <td className="px-2 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm text-admin_text min-w-[150px]">
                    {getProductsForWebsite(website.productIds)
                      .map((p) => p.name)
                      .join(", ") || "None"}
                  </td>
                  <td className="px-2 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm text-admin_text min-w-[150px]">
                    {getCategoriesForWebsite(website.categoryIds)
                      .map((c) => c.name)
                      .join(", ") || "None"}
                  </td>
                  <td className="px-2 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm text-admin_text min-w-[150px]">
                    {getPaymentMethodsForWebsite(website.paymentMethodIds)
                      .map((m) => m.method)
                      .join(", ") || "None"}
                  </td>
                  <td className="px-2 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm min-w-[150px]">
                    <button
                      onClick={() => handleEdit(website)}
                      className="bg-admin_accent text-admin_text px-2 py-1 rounded mr-2 text-xs hover:bg-admin_accentHover"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(website.id)}
                      className="bg-admin_danger text-admin_card px-2 py-1 rounded mr-2 text-xs hover:bg-admin_dangerHover"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handlePreview(website)}
                      className="bg-admin_primary text-admin_card px-2 py-1 rounded text-xs hover:bg-admin_primaryHover"
                    >
                      Preview
                    </button>
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

export default WebsiteManagement;
