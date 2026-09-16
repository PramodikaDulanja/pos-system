import React, { useState, useMemo } from "react";

export default function ItemManagement({ setActiveView, items, setItems }) {
  const CATEGORIES_LIST = ["Groceries", "Vegetables", "Beverages", "Bakery", "Dairy", "Meat"];
  const COMPANIES_LIST = ["Araliya", "Marina", "Local", "Dilmah", "Anchor", "CBL", "Farm", "Crysbro", "Samaposha", "General"];

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("All");
  const [selectedCompanyFilter, setSelectedCompanyFilter] = useState("All");

  const generateItemCode = () => {
    const nextId = items.length > 0 ? Math.max(...items.map(i => i.id || 0)) + 1 : 1;
    return `ITM-${String(nextId).padStart(3, '0')}`;
  };

  const [formData, setFormData] = useState({
    code: generateItemCode(),
    name: "",
    category: "Groceries",
    company: "General",
    buyingPrice: "",
    retailPrice: "",
    barcode: "",
    quantity: ""
  });

  const [editingId, setEditingId] = useState(null);

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

    if (editingId) {
      setItems(items.map(item => item.id === editingId ? {
        ...item,
        name: formData.name,
        category: formData.category,
        company: formData.company || "General",
        buyingPrice: parseFloat(formData.buyingPrice) || 0,
        price: parseFloat(formData.retailPrice) || 0,
        barcode: formData.barcode || "-",
        quantity: parseFloat(formData.quantity) || 0
      } : item));
      setEditingId(null);
    } else {
      const newItem = {
        id: Date.now(),
        code: formData.code,
        name: formData.name,
        category: formData.category,
        company: formData.company || "General",
        buyingPrice: parseFloat(formData.buyingPrice) || 0,
        price: parseFloat(formData.retailPrice) || 0,
        barcode: formData.barcode || "-",
        quantity: parseFloat(formData.quantity) || 0
      };
      setItems([newItem, ...items]);
    }

    setFormData({
      code: generateItemCode(),
      name: "",
      category: "Groceries",
      company: "General",
      buyingPrice: "",
      retailPrice: "",
      barcode: "",
      quantity: ""
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      code: item.code || `ITM-${item.id}`,
      name: item.name,
      category: item.category,
      company: item.company || "General",
      buyingPrice: item.buyingPrice,
      retailPrice: item.price,
      barcode: item.barcode,
      quantity: item.quantity
    });
  };

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesCategory = selectedCategoryFilter === "All" || item.category === selectedCategoryFilter;
      const matchesCompany = selectedCompanyFilter === "All" || item.company === selectedCompanyFilter;
      
      const q = searchQuery.toLowerCase();
      const matchesSearch = 
        item.name.toLowerCase().includes(q) || 
        (item.code && item.code.toLowerCase().includes(q)) || 
        (item.barcode && item.barcode.toLowerCase().includes(q)) ||
        (item.company && item.company.toLowerCase().includes(q));
      
      return matchesCategory && matchesCompany && matchesSearch;
    });
  }, [items, searchQuery, selectedCategoryFilter, selectedCompanyFilter]);

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", background: "#F4F7FE", minHeight: "100vh", padding: "30px", boxSizing: "border-box" }}>
      <div style={{ maxWidth: "1350px", margin: "0 auto" }}>
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" ,marginBottom: "20px", background: "#FFFFFF", padding: "12px 28px", borderRadius: "16px", border: "1px solid #E2E8F0", boxShadow: "0 4px 20px rgba(0,0,0,0.02)" }}>
          <div>
            <h1 style={{ fontSize: "25px", fontWeight: 900, color: "#1E293B", margin: "0 0 4px 0" }}>📦 Item Management Hub</h1>
          </div>
          <button 
            onClick={() => setActiveView("dashboard")}
            style={{ background: "linear-gradient(135deg, #4F46E5 0%, #3B82F6 100%)", color: "#FFFFFF", border: "none", padding: "8px 22px", borderRadius: "10px", fontWeight: 700, fontSize: "14px", cursor: "pointer", boxShadow: "0 4px 12px rgba(79,70,229,0.25)" }}
          >
            ← Back to Dashboard
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "30px", alignItems: "start" }}>
          
          <div style={{ background: "#FFFFFF", padding: "28px", borderRadius: "16px", border: "1px solid #E2E8F0", boxShadow: "0 10px 30px rgba(0,0,0,0.03)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px", borderBottom: "2px dashed #E2E8F0", paddingBottom: "14px" }}>
              <div style={{ width: "36px", height: "36px", background: editingId ? "#FEF3C7" : "#EEF2FF", color: editingId ? "#D97706" : "#4F46E5", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", fontWeight: 800 }}>
                {editingId ? "✏️" : "➕"}
              </div>
              <h2 style={{ fontSize: "18px", fontWeight: 800, color: "#1E293B", margin: 0 }}>
                {editingId ? "Modify Item Details" : "Add New Inventory Item"}
              </h2>
            </div>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              
              <div>
                <label style={{ fontSize: "13px", fontWeight: 700, color: "#334155", display: "block", marginBottom: "6px" }}>Item Code (Unique ID)</label>
                <input 
                  type="text" name="code" value={formData.code} readOnly 
                  style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", border: "2px solid #CBD5E1", fontSize: "14px", fontWeight: 700, fontFamily: "'Courier New', monospace", color: "#64748B", background: "#E2E8F0", outline: "none", boxSizing: "border-box", cursor: "not-allowed" }} 
                />
              </div>

              <div>
                <label style={{ fontSize: "13px", fontWeight: 700, color: "#334155", display: "block", marginBottom: "6px" }}>Item Name *</label>
                <input 
                  type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Milk Powder 400g" required 
                  style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", border: "2px solid #CBD5E1", fontSize: "14px", fontWeight: 600, color: "#1E293B", background: "#F8FAFC", outline: "none", boxSizing: "border-box" }} 
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <div>
                  <label style={{ fontSize: "13px", fontWeight: 700, color: "#334155", display: "block", marginBottom: "6px" }}>Category</label>
                  <select 
                    name="category" value={formData.category} onChange={handleChange} 
                    style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", border: "2px solid #CBD5E1", fontSize: "14px", fontWeight: 600, color: "#1E293B", background: "#F8FAFC", outline: "none", boxSizing: "border-box" }}
                  >
                    {CATEGORIES_LIST.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: "13px", fontWeight: 700, color: "#334155", display: "block", marginBottom: "6px" }}>Company / Brand</label>
                  <select 
                    name="company" value={formData.company} onChange={handleChange} 
                    style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", border: "2px solid #CBD5E1", fontSize: "14px", fontWeight: 600, color: "#1E293B", background: "#F8FAFC", outline: "none", boxSizing: "border-box" }}
                  >
                    {COMPANIES_LIST.map(comp => (
                      <option key={comp} value={comp}>{comp}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <div>
                  <label style={{ fontSize: "13px", fontWeight: 700, color: "#334155", display: "block", marginBottom: "6px" }}>Buying Price (Rs.)</label>
                  <input 
                    type="number" step="0.01" name="buyingPrice" value={formData.buyingPrice} onChange={handleChange} placeholder="0.00" 
                    style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", border: "2px solid #CBD5E1", fontSize: "15px", fontWeight: 700, fontFamily: "'Courier New', monospace", color: "#0F172A", background: "#F8FAFC", outline: "none", boxSizing: "border-box" }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "13px", fontWeight: 700, color: "#10B981", display: "block", marginBottom: "6px" }}>Retail Price (Rs.) *</label>
                  <input 
                    type="number" step="0.01" name="retailPrice" value={formData.retailPrice} onChange={handleChange} placeholder="0.00" required 
                    style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", border: "2px solid #10B981", fontSize: "15px", fontWeight: 800, fontFamily: "'Courier New', monospace", color: "#047857", background: "#ECFDF5", outline: "none", boxSizing: "border-box" }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <div>
                  <label style={{ fontSize: "13px", fontWeight: 700, color: "#334155", display: "block", marginBottom: "6px" }}>Barcode</label>
                  <input 
                    type="text" name="barcode" value={formData.barcode} onChange={handleChange} placeholder="Scan / Code" 
                    style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", border: "2px solid #CBD5E1", fontSize: "14px", fontWeight: 600, fontFamily: "'Courier New', monospace", color: "#1E293B", background: "#F8FAFC", outline: "none", boxSizing: "border-box" }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "13px", fontWeight: 700, color: "#334155", display: "block", marginBottom: "6px" }}>Quantity</label>
                  <input 
                    type="number" step="0.01" name="quantity" value={formData.quantity} onChange={handleChange} placeholder="0" 
                    style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", border: "2px solid #CBD5E1", fontSize: "15px", fontWeight: 700, fontFamily: "'Courier New', monospace", color: "#1E293B", background: "#F8FAFC", outline: "none", boxSizing: "border-box" }}
                  />
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <button 
                  type="submit" 
                  style={{ flex: 1, padding: "16px", background: editingId ? "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)" : "linear-gradient(135deg, #10B981 0%, #059669 100%)", color: "#FFFFFF", border: "none", borderRadius: "10px", fontWeight: 800, fontSize: "15px", cursor: "pointer", boxShadow: "0 6px 15px rgba(0,0,0,0.15)" }}
                >
                  {editingId ? "UPDATE ITEM" : "+ SAVE ITEM TO INVENTORY"}
                </button>
                {editingId && (
                  <button 
                    type="button" 
                    onClick={() => { setEditingId(null); setFormData({ code: generateItemCode(), name: "", category: "Groceries", company: "General", buyingPrice: "", retailPrice: "", barcode: "", quantity: "" }); }}
                    style={{ padding: "16px", background: "#64748B", color: "#FFFFFF", border: "none", borderRadius: "10px", fontWeight: 700, cursor: "pointer" }}
                  >
                    Cancel
                  </button>
                )}
              </div>

            </form>
          </div>

          <div style={{ background: "#FFFFFF", padding: "28px", borderRadius: "16px", border: "1px solid #E2E8F0", boxShadow: "0 10px 30px rgba(0,0,0,0.03)" }}>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h2 style={{ fontSize: "18px", fontWeight: 800, color: "#1E293B", margin: 0 }}>
                📋 Inventory Stock List
              </h2>
              <span style={{ fontSize: "13px", fontWeight: 700, background: "#EEF2FF", color: "#4F46E5", padding: "6px 12px", borderRadius: "20px", fontFamily: "'Courier New', monospace" }}>
                Showing: {filteredItems.length} / {items.length}
              </span>
            </div>

            <div style={{ marginBottom: "14px" }}>
              <input 
                type="text" 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
                placeholder="🔍 Search by item name, code, barcode or brand..." 
                style={{ width: "100%", padding: "12px 16px", borderRadius: "10px", border: "2px solid #E2E8F0", fontSize: "14px", fontWeight: 500, color: "#1E293B", background: "#F8FAFC", outline: "none", boxSizing: "border-box" }}
                onFocus={(e) => e.target.style.borderColor = "#4F46E5"}
                onBlur={(e) => e.target.style.borderColor = "#E2E8F0"}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px", borderBottom: "2px dashed #E2E8F0", paddingBottom: "14px" }}>
              <div>
                <label style={{ fontSize: "11px", fontWeight: 700, color: "#64748B", display: "block", marginBottom: "4px", textTransform: "uppercase" }}>Filter by Category</label>
                <select 
                  value={selectedCategoryFilter} 
                  onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "13px", fontWeight: 600, color: "#1E293B", background: "#FFFFFF", outline: "none" }}
                >
                  <option value="All">All Categories</option>
                  {CATEGORIES_LIST.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: "11px", fontWeight: 700, color: "#64748B", display: "block", marginBottom: "4px", textTransform: "uppercase" }}>Filter by Brand</label>
                <select 
                  value={selectedCompanyFilter} 
                  onChange={(e) => setSelectedCompanyFilter(e.target.value)}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "13px", fontWeight: 600, color: "#1E293B", background: "#FFFFFF", outline: "none" }}
                >
                  <option value="All">All Brands / Companies</option>
                  {COMPANIES_LIST.map(comp => (
                    <option key={comp} value={comp}>{comp}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ maxHeight: "420px", overflowY: "auto", paddingRight: "4px" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "14px" }}>
                <thead>
                  <tr style={{ background: "#F8FAFC", borderBottom: "2px solid #E2E8F0", color: "#475569", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    <th style={{ padding: "12px 10px" }}>Item Details</th>
                    <th style={{ padding: "12px 10px" }}>Category</th>
                    <th style={{ padding: "12px 10px", textAlign: "right" }}>Price</th>
                    <th style={{ padding: "12px 10px", textAlign: "center" }}>Stock</th>
                    <th style={{ padding: "12px 10px", textAlign: "center" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.length === 0 ? (
                    <tr>
                      <td colSpan="5" style={{ textAlign: "center", padding: "40px", color: "#94A3B8", fontWeight: 600 }}>
                        No items found matching your filters.
                      </td>
                    </tr>
                  ) : (
                    filteredItems.map((item) => (
                      <tr key={item.id} style={{ borderBottom: "1px solid #F1F5F9" }}>
                        <td style={{ padding: "14px 10px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                            <span style={{ fontSize: "11px", fontWeight: 700, fontFamily: "'Courier New', monospace", color: "#4F46E5", background: "#EEF2FF", padding: "2px 6px", borderRadius: "4px" }}>
                              {item.code || `ITM-${item.id}`}
                            </span>
                            <span style={{ fontWeight: 700, color: "#1E293B", fontSize: "15px" }}>{item.name}</span>
                          </div>
                          <div style={{ fontSize: "12px", color: "#64748B", fontWeight: 500, marginTop: "2px" }}>
                            Brand: <span style={{ color: "#3B82F6", fontWeight: 600 }}>{item.company}</span>
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
                          <span style={{ fontFamily: "'Courier New', monospace", fontWeight: 800, fontSize: "14px", padding: "6px 10px", borderRadius: "8px", background: item.quantity <= 5 ? "#FEF2F2" : "#F0FDF4", color: item.quantity <= 5 ? "#DC2626" : "#16A34A" }}>
                            {item.quantity}
                          </span>
                        </td>
                        <td style={{ padding: "14px 10px", textAlign: "center" }}>
                          <div style={{ display: "flex", justifyContent: "center", gap: "6px" }}>
                            <button 
                              onClick={() => handleEdit(item)}
                              title="Modify Item"
                              style={{ background: "#FEF3C7", color: "#D97706", border: "none", width: "32px", height: "32px", borderRadius: "8px", cursor: "pointer", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}
                            >
                              ✏️
                            </button>
                            <button 
                              onClick={() => handleDelete(item.id)}
                              title="Delete Item"
                              style={{ background: "#FEE2E2", color: "#DC2626", border: "none", width: "32px", height: "32px", borderRadius: "8px", cursor: "pointer", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}
                            >
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}