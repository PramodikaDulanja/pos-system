import React, { useState, useMemo } from "react";

export default function CategoryBrandManager({ setActiveView, categories, setCategories, companies, setCompanies }) {
  // 1. Category States & Search
  const generateCatCode = () => {
    const nextId = categories.length > 0 ? categories.length + 1 : 1;
    return `CAT-${String(nextId).padStart(3, '0')}`;
  };

  const [catInput, setCatInput] = useState("");
  const [editingCatIndex, setEditingCatIndex] = useState(null);
  const [catSearchQuery, setCatSearchQuery] = useState("");

  // 2. Company States & Search
  const generateCompCode = () => {
    const nextId = companies.length > 0 ? companies.length + 1 : 1;
    return `CMP-${String(nextId).padStart(3, '0')}`;
  };

  const [compInput, setCompInput] = useState("");
  const [editingCompIndex, setEditingCompIndex] = useState(null);
  const [compSearchQuery, setCompSearchQuery] = useState("");

  const handleCatSubmit = (e) => {
    e.preventDefault();
    if (!catInput.trim()) return;

    if (editingCatIndex !== null) {
      const updated = [...categories];
      updated[editingCatIndex] = catInput.trim();
      setCategories(updated);
      setEditingCatIndex(null);
    } else {
      if (categories.includes(catInput.trim())) {
        alert("This category already exists!");
        return;
      }
      setCategories([...categories, catInput.trim()]);
    }
    setCatInput("");
  };

  const handleCompSubmit = (e) => {
    e.preventDefault();
    if (!compInput.trim()) return;

    if (editingCompIndex !== null) {
      const updated = [...companies];
      updated[editingCompIndex] = compInput.trim();
      setCompanies(updated);
      setEditingCompIndex(null);
    } else {
      if (companies.includes(compInput.trim())) {
        alert("This brand/company already exists!");
        return;
      }
      setCompanies([...companies, compInput.trim()]);
    }
    setCompInput("");
  };

  const handleDeleteCategory = (cat) => {
    if (categories.length <= 1) {
      alert("You must keep at least one category!");
      return;
    }
    if (window.confirm(`Are you sure you want to delete category "${cat}"?`)) {
      setCategories(categories.filter(c => c !== cat));
    }
  };

  const handleDeleteCompany = (comp) => {
    if (companies.length <= 1) {
      alert("You must keep at least one company!");
      return;
    }
    if (window.confirm(`Are you sure you want to delete brand "${comp}"?`)) {
      setCompanies(companies.filter(c => c !== comp));
    }
  };

  // Live Filter for Categories
  const filteredCategories = useMemo(() => {
    return categories.map((cat, idx) => ({ name: cat, originalIndex: idx, code: `CAT-${String(idx + 1).padStart(3, '0')}` }))
      .filter(item => {
        const q = catSearchQuery.toLowerCase();
        return item.name.toLowerCase().includes(q) || item.code.toLowerCase().includes(q);
      });
  }, [categories, catSearchQuery]);

  // Live Filter for Companies
  const filteredCompanies = useMemo(() => {
    return companies.map((comp, idx) => ({ name: comp, originalIndex: idx, code: `CMP-${String(idx + 1).padStart(3, '0')}` }))
      .filter(item => {
        const q = compSearchQuery.toLowerCase();
        return item.name.toLowerCase().includes(q) || item.code.toLowerCase().includes(q);
      });
  }, [companies, compSearchQuery]);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#F4F7FE", minHeight: "100vh", padding: "30px", boxSizing: "border-box" }}>
      <div style={{ maxWidth: "1350px", margin: "0 auto" }}>
        
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px", background: "#FFFFFF", padding: "20px 28px", borderRadius: "16px", border: "1px solid #E2E8F0", boxShadow: "0 4px 20px rgba(0,0,0,0.02)" }}>
          <div>
            <h1 style={{ fontSize: "26px", fontWeight: 900, color: "#1E293B", margin: "0 0 4px 0" }}>🏷️ Categories & Brands Management Hub</h1>
            <p style={{ fontSize: "14px", color: "#64748B", margin: 0, fontWeight: 500 }}>Manage store categories and brands with live search filters.</p>
          </div>
          <button 
            onClick={() => setActiveView("dashboard")}
            style={{ background: "linear-gradient(135deg, #4F46E5 0%, #3B82F6 100%)", color: "#FFFFFF", border: "none", padding: "12px 22px", borderRadius: "10px", fontWeight: 700, fontSize: "14px", cursor: "pointer", boxShadow: "0 4px 12px rgba(79,70,229,0.25)" }}
          >
            ← Back to Dashboard
          </button>
        </div>

        {/* Main Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px", alignItems: "start" }}>
          
          {/* ================= 1. CATEGORIES SECTION ================= */}
          <div style={{ display: "grid", gap: "20px" }}>
            
            {/* Category Form */}
            <div style={{ background: "#FFFFFF", padding: "28px", borderRadius: "16px", border: "1px solid #E2E8F0", boxShadow: "0 10px 30px rgba(0,0,0,0.03)" }}>
              <h2 style={{ fontSize: "18px", fontWeight: 800, color: "#1E293B", marginBottom: "16px", borderBottom: "2px dashed #E2E8F0", paddingBottom: "10px" }}>
                {editingCatIndex !== null ? "✏️ Modify Category" : "➕ Add New Category"}
              </h2>

              <form onSubmit={handleCatSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <label style={{ fontSize: "13px", fontWeight: 700, color: "#475569", display: "block", marginBottom: "6px" }}>Category ID</label>
                  <input 
                    type="text" value={editingCatIndex !== null ? `CAT-${String(editingCatIndex + 1).padStart(3, '0')}` : generateCatCode()} readOnly 
                    style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", border: "2px solid #CBD5E1", fontSize: "14px", fontWeight: 700, fontFamily: "'Courier New', monospace", color: "#334155", background: "#F1F5F9", boxSizing: "border-box", cursor: "not-allowed" }} 
                  />
                </div>

                <div>
                  <label style={{ fontSize: "13px", fontWeight: 700, color: "#0F172A", display: "block", marginBottom: "6px" }}>Category Name *</label>
                  <input 
                    type="text" value={catInput} onChange={(e) => setCatInput(e.target.value)} placeholder="e.g. Household Items" required 
                    style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", border: "2px solid #3B82F6", fontSize: "15px", fontWeight: 700, color: "#0F172A", background: "#FFFFFF", outline: "none", boxSizing: "border-box" }} 
                    onFocus={(e) => e.target.style.boxShadow = "0 0 0 4px rgba(59,130,246,0.15)"}
                    onBlur={(e) => e.target.style.boxShadow = "none"}
                  />
                </div>

                <div style={{ display: "flex", gap: "10px", marginTop: "4px" }}>
                  <button type="submit" style={{ flex: 1, padding: "14px", background: editingCatIndex !== null ? "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)" : "linear-gradient(135deg, #10B981 0%, #059669 100%)", color: "#FFFFFF", border: "none", borderRadius: "10px", fontWeight: 800, fontSize: "15px", cursor: "pointer", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
                    {editingCatIndex !== null ? "Update Category" : "Save Category"}
                  </button>
                  {editingCatIndex !== null && (
                    <button type="button" onClick={() => { setEditingCatIndex(null); setCatInput(""); }} style={{ padding: "14px 20px", background: "#64748B", color: "#FFFFFF", border: "none", borderRadius: "10px", fontWeight: 700, cursor: "pointer" }}>
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Categories Table with Live Search */}
            <div style={{ background: "#FFFFFF", padding: "28px", borderRadius: "16px", border: "1px solid #E2E8F0", boxShadow: "0 10px 30px rgba(0,0,0,0.03)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#1E293B", margin: 0 }}>📋 Categories List</h3>
                <span style={{ fontSize: "12px", fontWeight: 700, background: "#EEF2FF", color: "#4F46E5", padding: "6px 12px", borderRadius: "20px" }}>{filteredCategories.length} / {categories.length}</span>
              </div>

              {/* Search Bar for Categories */}
              <div style={{ marginBottom: "14px" }}>
                <input 
                  type="text" 
                  value={catSearchQuery} 
                  onChange={(e) => setCatSearchQuery(e.target.value)} 
                  placeholder="🔍 Search category by name or ID..." 
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "2px solid #E2E8F0", fontSize: "13px", fontWeight: 500, color: "#1E293B", background: "#F8FAFC", outline: "none", boxSizing: "border-box" }}
                  onFocus={(e) => e.target.style.borderColor = "#4F46E5"}
                  onBlur={(e) => e.target.style.borderColor = "#E2E8F0"}
                />
              </div>

              <div style={{ maxHeight: "260px", overflowY: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "14px" }}>
                  <thead>
                    <tr style={{ background: "#F8FAFC", borderBottom: "2px solid #E2E8F0", color: "#475569", textTransform: "uppercase", fontSize: "12px" }}>
                      <th style={{ padding: "10px" }}>ID</th>
                      <th style={{ padding: "10px" }}>Category Name</th>
                      <th style={{ padding: "10px", textAlign: "center" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCategories.length === 0 ? (
                      <tr>
                        <td colSpan="3" style={{ textAlign: "center", padding: "30px", color: "#94A3B8", fontWeight: 600 }}>No categories found.</td>
                      </tr>
                    ) : (
                      filteredCategories.map((item) => (
                        <tr key={item.name} style={{ borderBottom: "1px solid #F1F5F9" }}>
                          <td style={{ padding: "12px 10px", fontFamily: "'Courier New', monospace", fontWeight: 700, color: "#4F46E5" }}>
                            {item.code}
                          </td>
                          <td style={{ padding: "12px 10px", fontWeight: 700, color: "#1E293B" }}>{item.name}</td>
                          <td style={{ padding: "12px 10px", textAlign: "center" }}>
                            <div style={{ display: "flex", justifyContent: "center", gap: "6px" }}>
                              <button 
                                onClick={() => { setEditingCatIndex(item.originalIndex); setCatInput(item.name); }} 
                                style={{ background: "#FEF3C7", color: "#D97706", border: "none", padding: "6px 10px", borderRadius: "8px", cursor: "pointer", fontWeight: 700, fontSize: "12px", display: "flex", alignItems: "center", gap: "4px" }}
                              >
                                ✏️ Edit
                              </button>
                              <button 
                                onClick={() => handleDeleteCategory(item.name)} 
                                style={{ background: "#FEE2E2", color: "#DC2626", border: "none", padding: "6px 10px", borderRadius: "8px", cursor: "pointer", fontWeight: 700, fontSize: "12px", display: "flex", alignItems: "center", gap: "4px" }}
                              >
                                🗑️ Delete
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


          {/* ================= 2. COMPANIES / BRANDS SECTION ================= */}
          <div style={{ display: "grid", gap: "20px" }}>
            
            {/* Company Form */}
            <div style={{ background: "#FFFFFF", padding: "28px", borderRadius: "16px", border: "1px solid #E2E8F0", boxShadow: "0 10px 30px rgba(0,0,0,0.03)" }}>
              <h2 style={{ fontSize: "18px", fontWeight: 800, color: "#1E293B", marginBottom: "16px", borderBottom: "2px dashed #E2E8F0", paddingBottom: "10px" }}>
                {editingCompIndex !== null ? "✏️ Modify Brand / Company" : "➕ Add New Brand / Company"}
              </h2>

              <form onSubmit={handleCompSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <label style={{ fontSize: "13px", fontWeight: 700, color: "#475569", display: "block", marginBottom: "6px" }}>Company ID</label>
                  <input 
                    type="text" value={editingCompIndex !== null ? `CMP-${String(editingCompIndex + 1).padStart(3, '0')}` : generateCompCode()} readOnly 
                    style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", border: "2px solid #CBD5E1", fontSize: "14px", fontWeight: 700, fontFamily: "'Courier New', monospace", color: "#334155", background: "#F1F5F9", boxSizing: "border-box", cursor: "not-allowed" }} 
                  />
                </div>

                <div>
                  <label style={{ fontSize: "13px", fontWeight: 700, color: "#0F172A", display: "block", marginBottom: "6px" }}>Brand / Company Name *</label>
                  <input 
                    type="text" value={compInput} onChange={(e) => setCompInput(e.target.value)} placeholder="e.g. Nestlé" required 
                    style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", border: "2px solid #10B981", fontSize: "15px", fontWeight: 700, color: "#0F172A", background: "#FFFFFF", outline: "none", boxSizing: "border-box" }} 
                    onFocus={(e) => e.target.style.boxShadow = "0 0 0 4px rgba(16,185,129,0.15)"}
                    onBlur={(e) => e.target.style.boxShadow = "none"}
                  />
                </div>

                <div style={{ display: "flex", gap: "10px", marginTop: "4px" }}>
                  <button type="submit" style={{ flex: 1, padding: "14px", background: editingCompIndex !== null ? "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)" : "linear-gradient(135deg, #10B981 0%, #059669 100%)", color: "#FFFFFF", border: "none", borderRadius: "10px", fontWeight: 800, fontSize: "15px", cursor: "pointer", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
                    {editingCompIndex !== null ? "Update Brand" : "Save Brand"}
                  </button>
                  {editingCompIndex !== null && (
                    <button type="button" onClick={() => { setEditingCompIndex(null); setCompInput(""); }} style={{ padding: "14px 20px", background: "#64748B", color: "#FFFFFF", border: "none", borderRadius: "10px", fontWeight: 700, cursor: "pointer" }}>
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Companies Table with Live Search */}
            <div style={{ background: "#FFFFFF", padding: "28px", borderRadius: "16px", border: "1px solid #E2E8F0", boxShadow: "0 10px 30px rgba(0,0,0,0.03)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#1E293B", margin: 0 }}>📋 Brands & Companies List</h3>
                <span style={{ fontSize: "12px", fontWeight: 700, background: "#F0FDF4", color: "#16A34A", padding: "6px 12px", borderRadius: "20px" }}>{filteredCompanies.length} / {companies.length}</span>
              </div>

              {/* Search Bar for Companies */}
              <div style={{ marginBottom: "14px" }}>
                <input 
                  type="text" 
                  value={compSearchQuery} 
                  onChange={(e) => setCompSearchQuery(e.target.value)} 
                  placeholder="🔍 Search brand by name or ID..." 
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "2px solid #E2E8F0", fontSize: "13px", fontWeight: 500, color: "#1E293B", background: "#F8FAFC", outline: "none", boxSizing: "border-box" }}
                  onFocus={(e) => e.target.style.borderColor = "#10B981"}
                  onBlur={(e) => e.target.style.borderColor = "#E2E8F0"}
                />
              </div>

              <div style={{ maxHeight: "260px", overflowY: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "14px" }}>
                  <thead>
                    <tr style={{ background: "#F8FAFC", borderBottom: "2px solid #E2E8F0", color: "#475569", textTransform: "uppercase", fontSize: "12px" }}>
                      <th style={{ padding: "10px" }}>ID</th>
                      <th style={{ padding: "10px" }}>Brand Name</th>
                      <th style={{ padding: "10px", textAlign: "center" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCompanies.length === 0 ? (
                      <tr>
                        <td colSpan="3" style={{ textAlign: "center", padding: "30px", color: "#94A3B8", fontWeight: 600 }}>No brands found.</td>
                      </tr>
                    ) : (
                      filteredCompanies.map((item) => (
                        <tr key={item.name} style={{ borderBottom: "1px solid #F1F5F9" }}>
                          <td style={{ padding: "12px 10px", fontFamily: "'Courier New', monospace", fontWeight: 700, color: "#16A34A" }}>
                            {item.code}
                          </td>
                          <td style={{ padding: "12px 10px", fontWeight: 700, color: "#1E293B" }}>{item.name}</td>
                          <td style={{ padding: "12px 10px", textAlign: "center" }}>
                            <div style={{ display: "flex", justifyContent: "center", gap: "6px" }}>
                              <button 
                                onClick={() => { setEditingCompIndex(item.originalIndex); setCompInput(item.name); }} 
                                style={{ background: "#FEF3C7", color: "#D97706", border: "none", padding: "6px 10px", borderRadius: "8px", cursor: "pointer", fontWeight: 700, fontSize: "12px", display: "flex", alignItems: "center", gap: "4px" }}
                              >
                                ✏️ Edit
                              </button>
                              <button 
                                onClick={() => handleDeleteCompany(item.name)} 
                                style={{ background: "#FEE2E2", color: "#DC2626", border: "none", padding: "6px 10px", borderRadius: "8px", cursor: "pointer", fontWeight: 700, fontSize: "12px", display: "flex", alignItems: "center", gap: "4px" }}
                              >
                                🗑️ Delete
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
    </div>
  );
}