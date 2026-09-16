import React, { useState } from "react";

export default function ItemManagement({ setActiveView, items, setItems }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "Groceries",
    company: "",
    buyingPrice: "",
    retailPrice: "",
    barcode: "",
    quantity: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.retailPrice) {
      alert("Please fill in the item name and retail price!");
      return;
    }

    const newItem = {
      id: Date.now(),
      name: formData.name,
      category: formData.category,
      company: formData.company || "General",
      buyingPrice: parseFloat(formData.buyingPrice) || 0,
      price: parseFloat(formData.retailPrice) || 0,
      barcode: formData.barcode || "-",
      quantity: parseFloat(formData.quantity) || 0
    };

    setItems([newItem, ...items]);

    setFormData({
      name: "",
      category: "Groceries",
      company: "",
      buyingPrice: "",
      retailPrice: "",
      barcode: "",
      quantity: ""
    });
  };

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", background: "#F4F7FE", minHeight: "100vh", padding: "30px", boxSizing: "border-box" }}>
      <div style={{ maxWidth: "1350px", margin: "0 auto" }}>
        
        {/* Header Section */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px", background: "#FFFFFF", padding: "20px 28px", borderRadius: "16px", border: "1px solid #E2E8F0", boxShadow: "0 4px 20px rgba(0,0,0,0.02)" }}>
          <div>
            <h1 style={{ fontSize: "26px", fontWeight: 900, color: "#1E293B", margin: "0 0 4px 0" }}>📦 Item Management Hub</h1>
            <p style={{ fontSize: "14px", color: "#64748B", margin: 0, fontWeight: 500 }}>Add new inventory items, manage retail pricing, and monitor stock levels.</p>
          </div>
          <button 
            onClick={() => setActiveView("dashboard")}
            style={{ background: "linear-gradient(135deg, #4F46E5 0%, #3B82F6 100%)", color: "#FFFFFF", border: "none", padding: "12px 22px", borderRadius: "10px", fontWeight: 700, fontSize: "14px", cursor: "pointer", boxShadow: "0 4px 12px rgba(79,70,229,0.25)", transition: "all 0.2s" }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
          >
            ← Back to Dashboard
          </button>
        </div>

        {/* Main Grid: Form vs Table */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "30px", alignItems: "start" }}>
          
          {/* 1. Left Side: Add New Item Form */}
          <div style={{ background: "#FFFFFF", padding: "28px", borderRadius: "16px", border: "1px solid #E2E8F0", boxShadow: "0 10px 30px rgba(0,0,0,0.03)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px", borderBottom: "2px dashed #E2E8F0", paddingBottom: "14px" }}>
              <div style={{ width: "36px", height: "36px", background: "#EEF2FF", color: "#4F46E5", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", fontWeight: 800 }}>➕</div>
              <h2 style={{ fontSize: "18px", fontWeight: 800, color: "#1E293B", margin: 0 }}>Add New Inventory Item</h2>
            </div>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              
              <div>
                <label style={{ fontSize: "13px", fontWeight: 700, color: "#334155", display: "block", marginBottom: "6px" }}>Item Name *</label>
                <input 
                  type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Anchor Milk Powder 400g" required 
                  style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", border: "2px solid #CBD5E1", fontSize: "14px", fontWeight: 600, color: "#1E293B", background: "#F8FAFC", outline: "none", boxSizing: "border-box", transition: "all 0.3s" }} 
                  onFocus={(e) => { e.target.style.borderColor = "#4F46E5"; e.target.style.backgroundColor = "#FFFFFF"; }}
                  onBlur={(e) => { e.target.style.borderColor = "#CBD5E1"; e.target.style.backgroundColor = "#F8FAFC"; }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <div>
                  <label style={{ fontSize: "13px", fontWeight: 700, color: "#334155", display: "block", marginBottom: "6px" }}>Category</label>
                  <select 
                    name="category" value={formData.category} onChange={handleChange} 
                    style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", border: "2px solid #CBD5E1", fontSize: "14px", fontWeight: 600, color: "#1E293B", background: "#F8FAFC", outline: "none", boxSizing: "border-box" }}
                  >
                    <option value="Groceries">Groceries</option>
                    <option value="Vegetables">Vegetables</option>
                    <option value="Beverages">Beverages</option>
                    <option value="Bakery">Bakery</option>
                    <option value="Dairy">Dairy</option>
                    <option value="Meat">Meat</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: "13px", fontWeight: 700, color: "#334155", display: "block", marginBottom: "6px" }}>Company / Brand</label>
                  <input 
                    type="text" name="company" value={formData.company} onChange={handleChange} placeholder="e.g. Dilmah" 
                    style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", border: "2px solid #CBD5E1", fontSize: "14px", fontWeight: 600, color: "#1E293B", background: "#F8FAFC", outline: "none", boxSizing: "border-box" }}
                    onFocus={(e) => { e.target.style.borderColor = "#4F46E5"; e.target.style.backgroundColor = "#FFFFFF"; }}
                    onBlur={(e) => { e.target.style.borderColor = "#CBD5E1"; e.target.style.backgroundColor = "#F8FAFC"; }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <div>
                  <label style={{ fontSize: "13px", fontWeight: 700, color: "#334155", display: "block", marginBottom: "6px" }}>Buying Price (Rs.)</label>
                  <input 
                    type="number" step="0.01" name="buyingPrice" value={formData.buyingPrice} onChange={handleChange} placeholder="0.00" 
                    style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", border: "2px solid #CBD5E1", fontSize: "15px", fontWeight: 700, fontFamily: "'Courier New', monospace", color: "#0F172A", background: "#F8FAFC", outline: "none", boxSizing: "border-box" }}
                    onFocus={(e) => { e.target.style.borderColor = "#4F46E5"; e.target.style.backgroundColor = "#FFFFFF"; }}
                    onBlur={(e) => { e.target.style.borderColor = "#CBD5E1"; e.target.style.backgroundColor = "#F8FAFC"; }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "13px", fontWeight: 700, color: "#10B981", display: "block", marginBottom: "6px" }}>Retail Price (Rs.) *</label>
                  <input 
                    type="number" step="0.01" name="retailPrice" value={formData.retailPrice} onChange={handleChange} placeholder="0.00" required 
                    style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", border: "2px solid #10B981", fontSize: "15px", fontWeight: 800, fontFamily: "'Courier New', monospace", color: "#047857", background: "#ECFDF5", outline: "none", boxSizing: "border-box" }}
                    onFocus={(e) => e.target.style.boxShadow = "0 0 0 4px rgba(16,185,129,0.15)"}
                    onBlur={(e) => e.target.style.boxShadow = "none"}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <div>
                  <label style={{ fontSize: "13px", fontWeight: 700, color: "#334155", display: "block", marginBottom: "6px" }}>Barcode</label>
                  <input 
                    type="text" name="barcode" value={formData.barcode} onChange={handleChange} placeholder="Scan / Code" 
                    style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", border: "2px solid #CBD5E1", fontSize: "14px", fontWeight: 600, fontFamily: "'Courier New', monospace", color: "#1E293B", background: "#F8FAFC", outline: "none", boxSizing: "border-box" }}
                    onFocus={(e) => { e.target.style.borderColor = "#4F46E5"; e.target.style.backgroundColor = "#FFFFFF"; }}
                    onBlur={(e) => { e.target.style.borderColor = "#CBD5E1"; e.target.style.backgroundColor = "#F8FAFC"; }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "13px", fontWeight: 700, color: "#334155", display: "block", marginBottom: "6px" }}>Initial Quantity</label>
                  <input 
                    type="number" step="0.01" name="quantity" value={formData.quantity} onChange={handleChange} placeholder="0" 
                    style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", border: "2px solid #CBD5E1", fontSize: "15px", fontWeight: 700, fontFamily: "'Courier New', monospace", color: "#1E293B", background: "#F8FAFC", outline: "none", boxSizing: "border-box" }}
                    onFocus={(e) => { e.target.style.borderColor = "#4F46E5"; e.target.style.backgroundColor = "#FFFFFF"; }}
                    onBlur={(e) => { e.target.style.borderColor = "#CBD5E1"; e.target.style.backgroundColor = "#F8FAFC"; }}
                  />
                </div>
              </div>

              <button 
                type="submit" 
                style={{ marginTop: "10px", width: "100%", padding: "16px", background: "linear-gradient(135deg, #10B981 0%, #059669 100%)", color: "#FFFFFF", border: "none", borderRadius: "10px", fontWeight: 800, fontSize: "15px", cursor: "pointer", boxShadow: "0 6px 15px rgba(16,185,129,0.3)", transition: "all 0.2s" }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
              >
                + SAVE ITEM TO INVENTORY
              </button>

            </form>
          </div>

          {/* 2. Right Side: Inventory Table List */}
          <div style={{ background: "#FFFFFF", padding: "28px", borderRadius: "16px", border: "1px solid #E2E8F0", boxShadow: "0 10px 30px rgba(0,0,0,0.03)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", borderBottom: "2px dashed #E2E8F0", paddingBottom: "14px" }}>
              <h2 style={{ fontSize: "18px", fontWeight: 800, color: "#1E293B", margin: 0 }}>
                📋 Inventory Stock List
              </h2>
              <span style={{ fontSize: "13px", fontWeight: 700, background: "#EEF2FF", color: "#4F46E5", padding: "6px 12px", borderRadius: "20px", fontFamily: "'Courier New', monospace" }}>
                Total: {items.length} Types
              </span>
            </div>

            <div style={{ maxHeight: "580px", overflowY: "auto", paddingRight: "4px" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "14px" }}>
                <thead>
                  <tr style={{ background: "#F8FAFC", borderBottom: "2px solid #E2E8F0", color: "#475569", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    <th style={{ padding: "12px 10px", borderTopLeftRadius: "8px", borderBottomLeftRadius: "8px" }}>Item Details</th>
                    <th style={{ padding: "12px 10px" }}>Category</th>
                    <th style={{ padding: "12px 10px", textAlign: "right" }}>Retail Price</th>
                    <th style={{ padding: "12px 10px", textAlign: "center", borderTopRightRadius: "8px", borderBottomRightRadius: "8px" }}>Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id} style={{ borderBottom: "1px solid #F1F5F9", transition: "background 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.background = "#F8FAFC"} onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                      <td style={{ padding: "14px 10px" }}>
                        <div style={{ fontWeight: 700, color: "#1E293B", fontSize: "15px" }}>{item.name}</div>
                        <div style={{ fontSize: "12px", color: "#64748B", fontWeight: 500, marginTop: "2px" }}>
                          Brand: <span style={{ color: "#3B82F6", fontWeight: 600 }}>{item.company}</span> &middot; Barcode: <span style={{ fontFamily: "'Courier New', monospace" }}>{item.barcode}</span>
                        </div>
                      </td>
                      <td style={{ padding: "14px 10px" }}>
                        <span style={{ fontSize: "12px", fontWeight: 700, color: "#0284C7", background: "#E0F2FE", padding: "4px 10px", borderRadius: "8px" }}>
                          {item.category}
                        </span>
                      </td>
                      <td style={{ padding: "14px 10px", textAlign: "right", fontFamily: "'Courier New', monospace", fontWeight: 800, color: "#10B981", fontSize: "15px" }}>
                        Rs. {item.price.toFixed(2)}
                      </td>
                      <td style={{ padding: "14px 10px", textAlign: "center" }}>
                        <span style={{ fontFamily: "'Courier New', monospace", fontWeight: 800, fontSize: "14px", padding: "6px 12px", borderRadius: "8px", background: item.quantity <= 5 ? "#FEF2F2" : "#F0FDF4", color: item.quantity <= 5 ? "#DC2626" : "#16A34A" }}>
                          {item.quantity}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}