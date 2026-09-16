import React, { useState } from "react";
import POSSystem from "./POSSystem"; 
import ItemManagement from "./ItemManagement"; 
import CategoryBrandManager from "./CategoryBrandManager"; // වෙනම සෑදූ ෆයිල් එක import කර ඇත
import "./POSSystem.css"; 

const INITIAL_PRODUCTS = [
  { id: 1, name: "Basmati Rice 1kg", category: "Groceries", company: "Araliya", buyingPrice: 380, price: 420, barcode: "1001", quantity: 50 },
  { id: 2, name: "Coconut Oil 750ml", category: "Groceries", company: "Marina", buyingPrice: 620, price: 690, barcode: "1002", quantity: 30 },
  { id: 3, name: "Red Onions 1kg", category: "Vegetables", company: "Local", buyingPrice: 220, price: 260, barcode: "1003", quantity: 40 },
  { id: 4, name: "Tomatoes 1kg", category: "Vegetables", company: "Local", buyingPrice: 290, price: 340, barcode: "1004", quantity: 25 },
  { id: 5, name: "Ceylon Tea 200g", category: "Beverages", company: "Dilmah", buyingPrice: 330, price: 380, barcode: "1005", quantity: 60 },
  { id: 6, name: "Milk Powder 400g", category: "Groceries", company: "Anchor", buyingPrice: 870, price: 950, barcode: "1006", quantity: 20 },
  { id: 7, name: "Bread Loaf", category: "Bakery", company: "CBL", buyingPrice: 130, price: 150, barcode: "1007", quantity: 15 },
  { id: 8, name: "Eggs (12)", category: "Dairy", company: "Farm", buyingPrice: 650, price: 720, barcode: "1008", quantity: 35 },
  { id: 9, name: "Chicken Curry Pack", category: "Meat", company: "Crysbro", buyingPrice: 800, price: 890, barcode: "1009", quantity: 10 },
  { id: 10, name: "Dhal 500g", category: "Groceries", company: "Samaposha", buyingPrice: 200, price: 240, barcode: "1010", quantity: 45 },
];

const INITIAL_CATEGORIES = ["Groceries", "Vegetables", "Beverages", "Bakery", "Dairy", "Meat"];
const INITIAL_COMPANIES = ["Araliya", "Marina", "Local", "Dilmah", "Anchor", "CBL", "Farm", "Crysbro", "Samaposha", "General"];

// ==========================================
// 1. Dashboard Component එක
// ==========================================
function Dashboard({ setActiveView, items, categories, companies }) {
  const totalStockValue = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#F4F7FE", minHeight: "100vh", padding: "40px", boxSizing: "border-box" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        {/* Header */}
        <div style={{ marginBottom: "30px" }}>
          <h1 style={{ fontSize: "32px", fontWeight: 900, color: "#1E293B", margin: "0 0 8px 0" }}>Main Dashboard</h1>
          <p style={{ fontSize: "15px", color: "#64748B", margin: 0, fontWeight: 500 }}>Welcome back! Choose an option below to manage your store.</p>
        </div>

        {/* Quick Stats Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginBottom: "40px" }}>
          <div style={{ background: "#FFFFFF", padding: "24px", borderRadius: "16px", border: "1px solid #E2E8F0", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.02)" }}>
            <div style={{ fontSize: "14px", fontWeight: 600, color: "#64748B" }}>Total Store Items</div>
            <div style={{ fontSize: "28px", fontWeight: 800, color: "#10B981", marginTop: "8px", fontFamily: "'Courier New', monospace" }}>{items.length} Types</div>
          </div>
          <div style={{ background: "#FFFFFF", padding: "24px", borderRadius: "16px", border: "1px solid #E2E8F0", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.02)" }}>
            <div style={{ fontSize: "14px", fontWeight: 600, color: "#64748B" }}>Inventory Retail Value</div>
            <div style={{ fontSize: "28px", fontWeight: 800, color: "#4F46E5", marginTop: "8px", fontFamily: "'Courier New', monospace" }}>Rs. {totalStockValue.toLocaleString()}</div>
          </div>
          <div style={{ background: "#FFFFFF", padding: "24px", borderRadius: "16px", border: "1px solid #E2E8F0", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.02)" }}>
            <div style={{ fontSize: "14px", fontWeight: 600, color: "#64748B" }}>Categories & Brands</div>
            <div style={{ fontSize: "20px", fontWeight: 800, color: "#F59E0B", marginTop: "12px" }}>{categories.length} Cats / {companies.length} Brands</div>
          </div>
        </div>

        {/* Navigation Action Cards */}
        <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#1E293B", marginBottom: "20px" }}>Quick Navigation</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "24px" }}>
          
          <div 
            onClick={() => setActiveView("pos")}
            style={{ background: "linear-gradient(135deg, #4F46E5 0%, #3B82F6 100%)", padding: "30px", borderRadius: "16px", color: "#FFFFFF", cursor: "pointer", boxShadow: "0 10px 20px rgba(79,70,229,0.2)", transition: "transform 0.2s" }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-4px)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
          >
            <div style={{ fontSize: "24px", fontWeight: 800, marginBottom: "8px" }}>🛒 POS Counter & Billing</div>
            <p style={{ fontSize: "14px", opacity: 0.9, margin: 0 }}>Open sales counter, search items, apply discounts, and print bills.</p>
          </div>

          <div 
            onClick={() => setActiveView("items")}
            style={{ background: "linear-gradient(135deg, #10B981 0%, #059669 100%)", padding: "30px", borderRadius: "16px", color: "#FFFFFF", cursor: "pointer", boxShadow: "0 10px 20px rgba(16,185,129,0.2)", transition: "transform 0.2s" }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-4px)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
          >
            <div style={{ fontSize: "24px", fontWeight: 800, marginBottom: "8px" }}>📦 Item Management</div>
            <p style={{ fontSize: "14px", opacity: 0.9, margin: 0 }}>Add new items, update prices, manage categories and stock levels.</p>
          </div>

          <div 
            onClick={() => setActiveView("categories-brands")}
            style={{ background: "linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)", padding: "30px", borderRadius: "16px", color: "#FFFFFF", cursor: "pointer", boxShadow: "0 10px 20px rgba(139,92,246,0.2)", transition: "transform 0.2s" }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-4px)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
          >
            <div style={{ fontSize: "24px", fontWeight: 800, marginBottom: "8px" }}>🏷️ Categories & Brands</div>
            <p style={{ fontSize: "14px", opacity: 0.9, margin: 0 }}>Add new item categories and manage company/brand names.</p>
          </div>

          <div 
            onClick={() => setActiveView("transactions")}
            style={{ background: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)", padding: "30px", borderRadius: "16px", color: "#FFFFFF", cursor: "pointer", boxShadow: "0 10px 20px rgba(245,158,11,0.2)", transition: "transform 0.2s" }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-4px)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
          >
            <div style={{ fontSize: "24px", fontWeight: 800, marginBottom: "8px" }}>📊 Transactions & History</div>
            <p style={{ fontSize: "14px", opacity: 0.9, margin: 0 }}>View past bills, analyze sales reports, and track transaction logs.</p>
          </div>

        </div>

      </div>
    </div>
  );
}

// Transactions Placeholder
function Transactions({ setActiveView }) {
  return (
    <div style={{ padding: "40px", fontFamily: "'Inter', sans-serif" }}>
      <button onClick={() => setActiveView("dashboard")} style={{ padding: "10px 20px", background: "#4F46E5", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", marginBottom: "20px" }}>← Back to Dashboard</button>
      <h1>Transactions & Past Bills (Under Construction)</h1>
    </div>
  );
}

// ==========================================
// 2. ප්‍රධාන App Component (Router)
// ==========================================
export default function App() {
  const [activeView, setActiveView] = useState("dashboard"); 
  const [items, setItems] = useState(INITIAL_PRODUCTS); 
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [companies, setCompanies] = useState(INITIAL_COMPANIES);

  return (
    <div>
      {activeView === "dashboard" && (
        <Dashboard 
          setActiveView={setActiveView} 
          items={items} 
          categories={categories} 
          companies={companies} 
        />
      )}
      
      {activeView === "pos" && (
        <div>
          <div className="no-print" style={{ background: "#1E293B", padding: "10px 30px", display: "flex", alignItems: "center" }}>
            <button 
              onClick={() => setActiveView("dashboard")}
              style={{ background: "#4F46E5", color: "#FFFFFF", border: "none", padding: "8px 16px", borderRadius: "6px", fontWeight: 700, cursor: "pointer" }}
            >
              ← Back to Dashboard
            </button>
          </div>
          <POSSystem products={items} />
        </div>
      )}

      {activeView === "items" && (
        <ItemManagement 
          setActiveView={setActiveView} 
          items={items} 
          setItems={setItems} 
          categories={categories} 
          companies={companies} 
        />
      )}

      {activeView === "categories-brands" && (
        <CategoryBrandManager 
          setActiveView={setActiveView} 
          categories={categories} 
          setCategories={setCategories} 
          companies={companies} 
          setCompanies={setCompanies} 
        />
      )}

      {activeView === "transactions" && <Transactions setActiveView={setActiveView} />}
    </div>
  );
}