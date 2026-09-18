import React, { useState } from "react";
import POSSystem from "./POSSystem"; 
import ItemManagement from "./ItemManagement"; 
import CategoryManager from "./CategoryManager"; 
import CompanyManager from "./CompanyManager"; 
import Transactions from "./Transactions"; 
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
// 1. Professional World-Class Dashboard Component
// ==========================================
function Dashboard({ setActiveView, items, categories, companies, transactions }) {
  const totalStockValue = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalSalesRevenue = transactions.reduce((sum, tx) => sum + tx.total, 0);

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", background: "#F1F5F9", minHeight: "100vh", padding: "35px 40px", boxSizing: "border-box" }}>
      <div style={{ maxWidth: "1300px", margin: "0 auto" }}>
        
        {/* Top Header Section */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "35px", background: "#FFFFFF", padding: "24px 32px", borderRadius: "20px", border: "1px solid #E2E8F0", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
              <span style={{ fontSize: "22px" }}>⚡</span>
              <h1 style={{ fontSize: "26px", fontWeight: 900, color: "#0F172A", margin: 0, letterSpacing: "-0.025em" }}>Apex POS Terminal</h1>
              <span style={{ fontSize: "11px", fontWeight: 800, background: "#DCFCE7", color: "#15803D", padding: "4px 10px", borderRadius: "20px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Online</span>
            </div>
            <p style={{ fontSize: "14px", color: "#64748B", margin: 0, fontWeight: 500 }}>Enterprise Store Management & Point of Sale System</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "14px", fontWeight: 700, color: "#0F172A", fontFamily: "'Courier New', monospace" }}>
              {new Date().toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
            </div>
            <div style={{ fontSize: "12px", color: "#64748B", fontWeight: 600, marginTop: "2px" }}>Store Location: Main Branch #01</div>
          </div>
        </div>

        {/* Executive KPI Summary Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px", marginBottom: "40px" }}>
          
          <div style={{ background: "linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)", padding: "26px", borderRadius: "20px", border: "1px solid #E2E8F0", boxShadow: "0 10px 25px rgba(0,0,0,0.02)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: "20px", right: "20px", width: "42px", height: "42px", background: "#DCFCE7", color: "#16A34A", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>💰</div>
            <div style={{ fontSize: "13px", fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.5px" }}>Total Sales Revenue</div>
            <div style={{ fontSize: "30px", fontWeight: 900, color: "#0F172A", marginTop: "12px", fontFamily: "'Courier New', monospace" }}>
              Rs. {totalSalesRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
            <div style={{ fontSize: "12px", fontWeight: 600, color: "#16A34A", marginTop: "8px" }}>↑ Real-time tracking from POS</div>
          </div>

          <div style={{ background: "linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)", padding: "26px", borderRadius: "20px", border: "1px solid #E2E8F0", boxShadow: "0 10px 25px rgba(0,0,0,0.02)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: "20px", right: "20px", width: "42px", height: "42px", background: "#EEF2FF", color: "#4F46E5", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>🧾</div>
            <div style={{ fontSize: "13px", fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.5px" }}>Total Bills Issued</div>
            <div style={{ fontSize: "30px", fontWeight: 900, color: "#0F172A", marginTop: "12px", fontFamily: "'Courier New', monospace" }}>
              {transactions.length} <span style={{ fontSize: "16px", color: "#64748B", fontWeight: 600 }}>Bills</span>
            </div>
            <div style={{ fontSize: "12px", fontWeight: 600, color: "#4F46E5", marginTop: "8px" }}>Registered transactions</div>
          </div>

          <div style={{ background: "linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)", padding: "26px", borderRadius: "20px", border: "1px solid #E2E8F0", boxShadow: "0 10px 25px rgba(0,0,0,0.02)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: "20px", right: "20px", width: "42px", height: "42px", background: "#FEF3C7", color: "#D97706", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>📦</div>
            <div style={{ fontSize: "13px", fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.5px" }}>Inventory & Database</div>
            <div style={{ fontSize: "24px", fontWeight: 900, color: "#0F172A", marginTop: "12px" }}>
              {items.length} <span style={{ fontSize: "14px", fontWeight: 600, color: "#64748B" }}>Items</span> &middot; {categories.length} <span style={{ fontSize: "14px", fontWeight: 600, color: "#64748B" }}>Cats</span>
            </div>
            <div style={{ fontSize: "12px", fontWeight: 600, color: "#D97706", marginTop: "8px" }}>Active stock varieties</div>
          </div>

        </div>

        {/* Navigation Control Hub */}
        <div style={{ marginBottom: "20px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: 800, color: "#0F172A", margin: "0 0 4px 0", letterSpacing: "-0.01em" }}>Management & Operations Hub</h2>
          <p style={{ fontSize: "14px", color: "#64748B", margin: 0 }}>Select a module below to proceed with store activities.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "24px" }}>
          
          {/* POS Counter Card */}
          <div 
            onClick={() => setActiveView("pos")}
            style={{ 
              background: "linear-gradient(135deg, #4F46E5 0%, #3B82F6 100%)", 
              padding: "30px", borderRadius: "20px", color: "#FFFFFF", cursor: "pointer", 
              boxShadow: "0 10px 25px rgba(79,70,229,0.25)", transition: "all 0.25s ease",
              display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "140px"
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 15px 35px rgba(79,70,229,0.35)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 10px 25px rgba(79,70,229,0.25)"; }}
          >
            <div>
              <div style={{ fontSize: "32px", marginBottom: "12px" }}>🛒</div>
              <div style={{ fontSize: "22px", fontWeight: 900, marginBottom: "6px", letterSpacing: "-0.01em" }}>POS Counter & Billing</div>
              <p style={{ fontSize: "14px", opacity: 0.9, margin: 0, lineHeight: "1.5", fontWeight: 500 }}>Open the lightning-fast sales counter, scan items, apply custom discounts, and print bills instantly.</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", fontWeight: 700, marginTop: "20px", opacity: 0.95 }}>
              Launch Counter &rarr;
            </div>
          </div>

          {/* Item Management Card */}
          <div 
            onClick={() => setActiveView("items")}
            style={{ 
              background: "linear-gradient(135deg, #059669 0%, #10B981 100%)", 
              padding: "30px", borderRadius: "20px", color: "#FFFFFF", cursor: "pointer", 
              boxShadow: "0 10px 25px rgba(16,185,129,0.25)", transition: "all 0.25s ease",
              display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "140px"
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 15px 35px rgba(16,185,129,0.35)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 10px 25px rgba(16,185,129,0.25)"; }}
          >
            <div>
              <div style={{ fontSize: "32px", marginBottom: "12px" }}>📦</div>
              <div style={{ fontSize: "22px", fontWeight: 900, marginBottom: "6px", letterSpacing: "-0.01em" }}>Item & Inventory Management</div>
              <p style={{ fontSize: "14px", opacity: 0.9, margin: 0, lineHeight: "1.5", fontWeight: 500 }}>Add new items, monitor stock quantities, update retail/buying prices, and manage inventory seamlessly.</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", fontWeight: 700, marginTop: "20px", opacity: 0.95 }}>
              Manage Inventory &rarr;
            </div>
          </div>

          {/* Category Management Card */}
          <div 
            onClick={() => setActiveView("categories")}
            style={{ 
              background: "linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%)", 
              padding: "30px", borderRadius: "20px", color: "#FFFFFF", cursor: "pointer", 
              boxShadow: "0 10px 25px rgba(139,92,246,0.25)", transition: "all 0.25s ease",
              display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "140px"
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 15px 35px rgba(139,92,246,0.35)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 10px 25px rgba(139,92,246,0.25)"; }}
          >
            <div>
              <div style={{ fontSize: "32px", marginBottom: "12px" }}>📂</div>
              <div style={{ fontSize: "22px", fontWeight: 900, marginBottom: "6px", letterSpacing: "-0.01em" }}>Category Hub</div>
              <p style={{ fontSize: "14px", opacity: 0.9, margin: 0, lineHeight: "1.5", fontWeight: 500 }}>Organize store items into structured categories with custom IDs, real-time search, and editing tools.</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", fontWeight: 700, marginTop: "20px", opacity: 0.95 }}>
              Manage Categories &rarr;
            </div>
          </div>

          {/* Company / Brand Management Card */}
          <div 
            onClick={() => setActiveView("companies")}
            style={{ 
              background: "linear-gradient(135deg, #0284C7 100%, #0EA5E9 0%)", 
              padding: "30px", borderRadius: "20px", color: "#FFFFFF", cursor: "pointer", 
              boxShadow: "0 10px 25px rgba(14,165,233,0.25)", transition: "all 0.25s ease",
              display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "140px"
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 15px 35px rgba(14,165,233,0.35)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 10px 25px rgba(14,165,233,0.25)"; }}
          >
            <div>
              <div style={{ fontSize: "32px", marginBottom: "12px" }}>🏢</div>
              <div style={{ fontSize: "22px", fontWeight: 900, marginBottom: "6px", letterSpacing: "-0.01em" }}>Brand & Company Hub</div>
              <p style={{ fontSize: "14px", opacity: 0.9, margin: 0, lineHeight: "1.5", fontWeight: 500 }}>Register manufacturer brands, track supplier companies, and keep your inventory records fully updated.</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", fontWeight: 700, marginTop: "20px", opacity: 0.95 }}>
              Manage Brands &rarr;
            </div>
          </div>

          {/* Transactions & History Card (Full Width Span option or Grid item) */}
          <div 
            onClick={() => setActiveView("transactions")}
            style={{ 
              gridColumn: "span 2",
              background: "linear-gradient(135deg, #D97706 0%, #F59E0B 100%)", 
              padding: "30px", borderRadius: "20px", color: "#FFFFFF", cursor: "pointer", 
              boxShadow: "0 10px 25px rgba(245,158,11,0.25)", transition: "all 0.25s ease",
              display: "flex", justifyContent: "space-between", alignItems: "center"
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 15px 35px rgba(245,158,11,0.35)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 10px 25px rgba(245,158,11,0.25)"; }}
          >
            <div style={{ maxWidth: "70%" }}>
              <div style={{ fontSize: "28px", marginBottom: "8px" }}>📊</div>
              <div style={{ fontSize: "22px", fontWeight: 900, marginBottom: "6px", letterSpacing: "-0.01em" }}>Transactions & Sales History Auditing</div>
              <p style={{ fontSize: "14px", opacity: 0.9, margin: 0, lineHeight: "1.5", fontWeight: 500 }}>Access past bills, review revenue metrics, inspect sales item logs, and reprint receipts instantly.</p>
            </div>
            <div style={{ background: "rgba(255,255,255,0.2)", padding: "12px 20px", borderRadius: "12px", fontSize: "14px", fontWeight: 800, backdropFilter: "blur(5px)" }}>
              View Sales Logs &rarr;
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

// ==========================================
// 2. Main App Component (Router)
// ==========================================
export default function App() {
  const [activeView, setActiveView] = useState("dashboard"); 
  const [items, setItems] = useState(INITIAL_PRODUCTS); 
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [companies, setCompanies] = useState(INITIAL_COMPANIES);
  const [transactions, setTransactions] = useState([]);

  return (
    <div>
      {activeView === "dashboard" && (
        <Dashboard 
          setActiveView={setActiveView} 
          items={items} 
          categories={categories} 
          companies={companies} 
          transactions={transactions}
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
          <POSSystem 
            products={items} 
            setTransactions={setTransactions} 
            transactions={transactions} 
          />
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

      {activeView === "categories" && (
        <CategoryManager 
          setActiveView={setActiveView} 
          categories={categories} 
          setCategories={setCategories} 
        />
      )}

      {activeView === "companies" && (
        <CompanyManager 
          setActiveView={setActiveView} 
          companies={companies} 
          setCompanies={setCompanies} 
        />
      )}

      {activeView === "transactions" && (
        <Transactions 
          setActiveView={setActiveView} 
          transactions={transactions} 
        />
      )}
    </div>
  );
}