import React, { useState } from "react";

export default function ItemManagement({ setActiveView, items, setItems }) {
  // නව භාණ්ඩයක් සඳහා Form State එක
  const [formData, setFormData] = useState({
    name: "",
    category: "Groceries",
    company: "",
    buyingPrice: "",
    retailPrice: "",
    barcode: "",
    quantity: ""
  });

  // Input වෙනස්වීම් පාලනය කිරීම
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // නව භාණ්ඩයක් ඇතුළත් කිරීම (Submit)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.retailPrice) {
      alert("Please fill in the item name and retail price!");
      return;
    }

    const newItem = {
      id: Date.now(), // තාවකාලික ID එකක්
      name: formData.name,
      category: formData.category,
      company: formData.company || "General",
      buyingPrice: parseFloat(formData.buyingPrice) || 0,
      price: parseFloat(formData.retailPrice) || 0, // POS එකේ පාවිච්චි වන price key එක
      barcode: formData.barcode || "-",
      quantity: parseFloat(formData.quantity) || 0
    };

    // භාණ්ඩ ලැයිස්තුවට අලුත් එක එකතු කිරීම
    setItems([newItem, ...items]);

    // Form එක Clear කිරීම
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
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#F4F7FE", minHeight: "100vh", padding: "30px", boxSizing: "border-box" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        
        {/* Header සහ Back Button */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <div>
            <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#1E293B", margin: "0 0 4px 0" }}>Item Management</h1>
            <p style={{ fontSize: "14px", color: "#64748B", margin: 0, fontWeight: 500 }}>Add new inventory items, manage pricing, and stock levels.</p>
          </div>
          <button 
            onClick={() => setActiveView("dashboard")}
            style={{ background: "#4F46E5", color: "#FFFFFF", border: "none", padding: "10px 20px", borderRadius: "8px", fontWeight: 700, cursor: "pointer", boxShadow: "0 2px 4px rgba(79,70,229,0.2)" }}
          >
            ← Back to Dashboard
          </button>
        </div>

        {/* ප්‍රධාන කොටස් දෙක: Form එක සහ Items Table එක */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "30px", alignItems: "start" }}>
          
          {/* 1. වම් පස: නව භාණ්ඩ ඇතුළත් කිරීමේ Form එක */}
          <div style={{ background: "#FFFFFF", padding: "24px", borderRadius: "16px", border: "1px solid #E2E8F0", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
            <h2 style={{ fontSize: "18px", fontWeight: 800, color: "#1E293B", marginBottom: "20px", borderBottom: "2px solid #F1F5F9", paddingBottom: "10px" }}>
              ➕ Add New Item
            </h2>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              
              <div>
                <label style={{ fontSize: "13px", fontWeight: 700, color: "#334155", display: "block", marginBottom: "6px" }}>Item Name *</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Milk Powder 400g" required style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "14px", outline: "none", boxSizing: "border-box" }} />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ fontSize: "13px", fontWeight: 700, color: "#334155", display: "block", marginBottom: "6px" }}>Category</label>
                  <select name="category" value={formData.category} onChange={handleChange} style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "14px", outline: "none", background: "#FFFFFF", boxSizing: "border-box" }}>
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
                  <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="e.g. Anchor" style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "14px", outline: "none", boxSizing: "border-box" }} />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ fontSize: "13px", fontWeight: 700, color: "#334155", display: "block", marginBottom: "6px" }}>Buying Price (Rs.)</label>
                  <input type="number" step="0.01" name="buyingPrice" value={formData.buyingPrice} onChange={handleChange} placeholder="0.00" style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "14px", outline: "none", boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ fontSize: "13px", fontWeight: 700, color: "#334155", display: "block", marginBottom: "6px" }}>Retail Price (Rs.) *</label>
                  <input type="number" step="0.01" name="retailPrice" value={formData.retailPrice} onChange={handleChange} placeholder="0.00" required style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "14px", outline: "none", boxSizing: "border-box" }} />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ fontSize: "13px", fontWeight: 700, color: "#334155", display: "block", marginBottom: "6px" }}>Barcode</label>
                  <input type="text" name="barcode" value={formData.barcode} onChange={handleChange} placeholder="Scan or type" style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "14px", outline: "none", boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ fontSize: "13px", fontWeight: 700, color: "#334155", display: "block", marginBottom: "6px" }}>Initial Quantity</label>
                  <input type="number" step="0.01" name="quantity" value={formData.quantity} onChange={handleChange} placeholder="0" style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "14px", outline: "none", boxSizing: "border-box" }} />
                </div>
              </div>

              <button type="submit" style={{ marginTop: "10px", width: "100%", padding: "14px", background: "linear-gradient(to right, #10B981, #059669)", color: "#FFFFFF", border: "none", borderRadius: "8px", fontWeight: 800, fontSize: "15px", cursor: "pointer", boxShadow: "0 4px 10px rgba(16,185,129,0.2)" }}>
                SAVE ITEM TO INVENTORY
              </button>

            </form>
          </div>

          {/* 2. දකුණු පස: දැනට ඇති භාණ්ඩ පෙන්වන වගුව (Table) */}
          <div style={{ background: "#FFFFFF", padding: "24px", borderRadius: "16px", border: "1px solid #E2E8F0", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
            <h2 style={{ fontSize: "18px", fontWeight: 800, color: "#1E293B", marginBottom: "20px", borderBottom: "2px solid #F1F5F9", paddingBottom: "10px" }}>
              📦 Inventory List ({items.length} Items)
            </h2>

            <div style={{ maxHeight: "550px", overflowY: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "14px" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid #E2E8F0", color: "#64748B", fontSize: "12px", textTransform: "uppercase" }}>
                    <th style={{ padding: "10px" }}>Item Name</th>
                    <th style={{ padding: "10px" }}>Category</th>
                    <th style={{ padding: "10px" }}>Retail Price</th>
                    <th style={{ padding: "10px" }}>Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id} style={{ borderBottom: "1px solid #F1F5F9" }}>
                      <td style={{ padding: "12px 10px", fontWeight: 600, color: "#1E293B" }}>
                        {item.name}
                        <div style={{ fontSize: "11px", color: "#94A3B8", fontWeight: 400 }}>Barcode: {item.barcode}</div>
                      </td>
                      <td style={{ padding: "12px 10px", color: "#3B82F6", fontWeight: 500 }}>{item.category}</td>
                      <td style={{ padding: "12px 10px", fontFamily: "'Courier New', monospace", fontWeight: 700, color: "#10B981" }}>
                        Rs. {item.price.toFixed(2)}
                      </td>
                      <td style={{ padding: "12px 10px", fontFamily: "'Courier New', monospace", fontWeight: 700, color: item.quantity <= 5 ? "#EF4444" : "#0F172A" }}>
                        {item.quantity}
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