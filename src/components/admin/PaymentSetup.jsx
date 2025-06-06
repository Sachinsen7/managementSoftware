import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Framer Motion variants
const tableVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, staggerChildren: 0.1 } },
};

function PaymentSetup() {
  const [transactions, setTransactions] = useState([]);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    // Fetch transactions from backend
    const fetchTransactions = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/transactions");
        const data = await response.json();
        setTransactions(data);
      } catch (err) {
        setError("Failed to fetch transactions");
        console.error(err);
      }
    };
    fetchTransactions();
  }, []);

  const handlePayment = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Basic validation
    if (!cardNumber || !expiry || !cvc) {
      setError("Please fill in all fields.");
      return;
    }
    if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ""))) {
      setError("Invalid card number (must be 16 digits).");
      return;
    }
    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
      setError("Invalid expiry date (MM/YY).");
      return;
    }
    if (!/^\d{3}$/.test(cvc)) {
      setError("Invalid CVC (must be 3 digits).");
      return;
    }

    // Mock Stripe payment processing
    try {
      const newTransaction = {
        user: "Admin Test",
        amount: 1000,
        status: "Success",
        date: new Date().toISOString().split("T")[0],
        method: "Credit Card",
      };
      const response = await fetch("http://localhost:5000/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTransaction),
      });
      if (!response.ok) throw new Error("Failed to process payment");
      const savedTransaction = await response.json();
      setTransactions([...transactions, savedTransaction]);
      setSuccess("Payment processed successfully!");
      setCardNumber("");
      setExpiry("");
      setCvc("");
    } catch (err) {
      setError("Payment processing failed");
      console.error(err);
    }
  };

  return (
    <motion.div
      className="space-y-6 p-4 sm:p-6 w-full max-w-full"
      variants={tableVariants}
      initial="hidden"
      animate="visible"
    >
      <h2 className="text-xl sm:text-2xl font-bold text-admin_text">
        Payment Management
      </h2>

      {/* Payment Form */}
      <div className="bg-admin_card rounded-lg shadow-md p-4 sm:p-6">
        <h3 className="text-lg font-semibold text-admin_text mb-4">
          Add Payment Method
        </h3>
        <form onSubmit={handlePayment} className="space-y-4">
          <div>
            <label className="block text-sm text-admin_textSecondary mb-1">
              Card Number
            </label>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) =>
                setCardNumber(
                  e.target.value
                    .replace(/\D/g, "")
                    .replace(/(\d{4})/g, "$1 ")
                    .trim()
                )
              }
              placeholder="1234 5678 9012 3456"
              className="w-full border border-admin_secondary rounded p-2 text-sm text-admin_text bg-admin_card focus:outline-none focus:ring-2 focus:ring-admin_primary"
              maxLength="19"
            />
          </div>
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-sm text-admin_textSecondary mb-1">
                Expiry (MM/YY)
              </label>
              <input
                type="text"
                value={expiry}
                onChange={(e) =>
                  setExpiry(
                    e.target.value
                      .replace(/\D/g, "")
                      .replace(/(\d{2})(\d{2})/, "$1/$2")
                  )
                }
                placeholder="MM/YY"
                className="w-full border border-admin_secondary rounded p-2 text-sm text-admin_text bg-admin_card focus:outline-none focus:ring-2 focus:ring-admin_primary"
                maxLength="5"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm text-admin_textSecondary mb-1">
                CVC
              </label>
              <input
                type="text"
                value={cvc}
                onChange={(e) => setCvc(e.target.value.replace(/\D/g, ""))}
                placeholder="123"
                className="w-full border border-admin_secondary rounded p-2 text-sm text-admin_text bg-admin_card focus:outline-none focus:ring-2 focus:ring-admin_primary"
                maxLength="3"
              />
            </div>
          </div>
          {error && <p className="text-admin_danger text-sm">{error}</p>}
          {success && <p className="text-admin_accent text-sm">{success}</p>}
          <button
            type="submit"
            className="bg-admin_primary text-admin_card px-4 py-2 rounded hover:bg-admin_primaryHover transition duration-200 text-sm"
          >
            Process Payment
          </button>
        </form>
      </div>

      {/* Transaction History */}
      <div className="bg-admin_card rounded-lg shadow-md w-full overflow-hidden">
        <div className="relative w-full overflow-x-auto">
          <table className="w-full min-w-[800px] table-auto">
            <thead className="bg-admin_secondary">
              <tr>
                <th className="px-2 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm text-admin_textSecondary min-w-[80px]">
                  ID
                </th>
                <th className="px-2 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm text-admin_textSecondary min-w-[120px]">
                  User
                </th>
                <th className="px-2 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm text-admin_textSecondary min-w-[100px]">
                  Amount (INR)
                </th>
                <th className="px-2 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm text-admin_textSecondary min-w-[100px]">
                  Status
                </th>
                <th className="px-2 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm text-admin_textSecondary min-w-[100px]">
                  Date
                </th>
                <th className="px-2 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm text-admin_textSecondary min-w-[120px]">
                  Method
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <motion.tr
                  key={tx.id}
                  variants={tableVariants}
                  className="border-t border-admin_secondary"
                >
                  <td className="px-2 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm text-admin_text min-w-[80px]">
                    {tx.id}
                  </td>
                  <td className="px-2 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm text-admin_text min-w-[120px]">
                    {tx.user}
                  </td>
                  <td className="px-2 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm text-admin_text min-w-[100px]">
                    ₹{tx.amount}
                  </td>
                  <td className="px-2 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm text-admin_text min-w-[100px]">
                    {tx.status}
                  </td>
                  <td className="px-2 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm text-admin_text min-w-[100px]">
                    {tx.date}
                  </td>
                  <td className="px-2 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm text-admin_text min-w-[120px]">
                    {tx.method}
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

export default PaymentSetup;
