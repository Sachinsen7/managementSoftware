/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Website Colors
        primary: "#2563eb",
        primaryHover: "#1d4ed8",
        secondary: "#6b7280",
        secondaryHover: "#4b5563",
        accent: "#f59e0b",
        accentHover: "#d97706",
        text: "#111827",
        textSecondary: "#4b5563",
        background: "#f9fafb",
        card: "#ffffff",
        link: "#3b82f6",
        linkHover: "#1d4ed8",
        success: "#22c55e",
        successHover: "#16a34a",
        error: "#ef4444",
        errorHover: "#dc2626",
        login: "#22c55e",
        loginHover: "#16a34a",
        logout: "#ef4444",
        logoutHover: "#dc2626",
        
        // Admin Panel Colors
        admin_primary: "#1e3a8a", // Deep navy for admin headers and primary buttons
        admin_primaryHover: "#1e40af", // Slightly lighter navy for hover
        admin_secondary: "#e5e7eb", // Light gray for admin backgrounds
        admin_accent: "#f59e0b", // Amber for highlights (e.g., charts, alerts)
        admin_accentHover: "#d97706", // Darker amber for hover
        admin_danger: "#dc2626", // Red for destructive actions (e.g., delete product)
        admin_dangerHover: "#b91c1c", // Darker red for hover
        admin_text: "#111827", // Dark text for readability
        admin_textSecondary: "#6b7280", // Muted gray for secondary text
        admin_background: "#f3f4f6", // Slightly darker gray for admin panel background
        admin_card: "#ffffff", // White for cards and tables
      },
    },
  },
  plugins: [],
};
