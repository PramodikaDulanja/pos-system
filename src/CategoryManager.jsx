import React, { useState, useMemo } from "react";

export default function CategoryManager({ setActiveView, categories, setCategories }) {
  const generateCatCode = () => {
    const nextId = categories.length > 0 ? categories.length + 1 : 1;
    return `CAT-${String(nextId).padStart(3, '0')}`;
  };

  const [catInput, setCatInput] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!catInput.trim()) return;

    if (editingIndex !== null) {
      const updated = [...categories];
      updated[editingIndex] = catInput.trim();
      setCategories(updated);
      setEditingIndex(null);
    } else {
      if (categories.includes(catInput.trim())) {
        alert("This category already exists!");
        return;
      }
      setCategories([...categories, catInput.trim()]);
    }
    setCatInput("");
  };

  const handleDelete = (cat) => {
    if (categories.length <= 1) {
      alert("You must keep at least one category!");
      return;
    }
    if (window.confirm(`Are you sure you want to delete category "${cat}"?`)) {
      setCategories(categories.filter(c => c !== cat));
    }
  };

  const filteredCategories = useMemo(() => {
    return categories.map((cat, idx) => ({ name: cat, originalIndex: idx, code: `CAT-${String(idx + 1).padStart(3, '0')}` }))
      .filter(item => {
        const q = searchQuery.toLowerCase();
        return item.name.toLowerCase().includes(q) || item.code.toLowerCase().includes(q);
      });
  }, [categories, searchQuery]);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#F4F7FE", minHeight: "100vh", padding: "30px", boxSizing: "border-box" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px", background: "#FFFFFF", padding: "20px 28px", borderRadius: "16px", border: "1px solid #E2E8F0", boxShadow: "0 4px 20px rgba(0,0,0,0.02)" }}>
          <div>
            <h1 style={{ fontSize: "26px", fontWeight: 900, color: "#1E293B", margin: "0 0 4px 0" }}>📂 Category Management Hub</h1>
            <p style={{ fontSize: "14px", color: "#64748B", margin: 0, fontWeight: 500 }}>Add, edit, delete, and search store categories seamlessly.</p>
          </div>
          <button 
            onClick={() => setActiveView("dashboard")}
            style={{ background: "linear-gradient(135deg, #4F46E5 0%, #3B82F6 100%)", color: "#FFFFFF", border: "none", padding: "12px 22px", borderRadius: "10px", fontWeight: 700, fontSize: "14px", cursor: "pointer", boxShadow: "0 4px 12px rgba(79,70,229,0.25)" }}
          >
            ← Back to Dashboard
          </button>
        </div>

        {/* Form and Table Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "30px", alignItems: "start" }}>
          
          {/* Form */}
          <div style={{ background: "#FFFFFF", padding: "28px", borderRadius: "16px", border: "1px solid #E2E8F0", boxShadow: "0 10px 30px rgba(0,0,0,0.03)" }}>
            <h2 style={{ fontSize: "18px", fontWeight: 800, color: "#1E293B", marginBottom: "16px", borderBottom: "2px dashed #E2E8F0", paddingBottom: "10px" }}>
              {editingIndex !== null ? "✏️ Modify Category" : "➕ Add New Category"}
            </h2>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ fontSize: "13px", fontWeight: 700, color: "#475569", display: "block", marginBottom: "6px" }}>Category ID</label>
                <input 
                  type="text" value={editingIndex !== null ? `CAT-${String(editingIndex + 1).padStart(3, '0')}` : generateCatCode()} readOnly 
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
                <button type="submit" style={{ flex: 1, padding: "14px", background: editingIndex !== null ? "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)" : "linear-gradient(135deg, #10B981 0%, #059669 100%)", color: "#FFFFFF", border: "none", borderRadius: "10px", fontWeight: 800, fontSize: "15px", cursor: "pointer", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
                  {editingIndex !== null ? "Update Category" : "Save Category"}
                </button>
                {editingIndex !== null && (
                  <button type="button" onClick={() => { setEditingIndex(null); setCatInput(""); }} style={{ padding: "14px 20px", background: "#64748B", color: "#FFFFFF", border: "none", borderRadius: "10px", fontWeight: 700, cursor: "pointer" }}>
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Table */}
          <div style={{ background: "#FFFFFF", padding: "28px", borderRadius: "16px", border: "1px solid #E2E8F0", boxShadow: "0 10px 30px rgba(0,0,0,0.03)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#1E293B", margin: 0 }}>📋 Categories List</h3>
              <span style={{ fontSize: "12px", fontWeight: 700, background: "#EEF2FF", color: "#4F46E5", padding: "6px 12px", borderRadius: "20px" }}>{filteredCategories.length} / {categories.length}</span>
            </div>

            <div style={{ marginBottom: "14px" }}>
              <input 
                type="text" 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
                placeholder="🔍 Search category by name or ID..." 
                style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "2px solid #E2E8F0", fontSize: "13px", fontWeight: 500, color: "#1E293B", background: "#F8FAFC", outline: "none", boxSizing: "border-box" }}
                onFocus={(e) => e.target.style.borderColor = "#4F46E5"}
                onBlur={(e) => e.target.style.borderColor = "#E2E8F0"}
              />
            </div>

            <div style={{ maxHeight: "350px", overflowY: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "14px" }}>
                <thead>
                  <tr style={{ background: "#F8FAFC", borderBottom: "2px solid #E2E8F0", color: "#475569", textTransform: "uppercase", fontSize: "12px" }}>
                    <th style={{ padding: "12px 10px" }}>ID</th>
                    <th style={{ padding: "12px 10px" }}>Category Name</th>
                    <th style={{ padding: "12px 10px", textAlign: "center" }}>Actions</th>
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
                        <td style={{ padding: "14px 10px", fontFamily: "'Courier New', monospace", fontWeight: 700, color: "#4F46E5" }}>
                          {item.code}
                        </td>
                        <td style={{ padding: "14px 10px", fontWeight: 700, color: "#1E293B" }}>{item.name}</td>
                        <td style={{ padding: "14px 10px", textAlign: "center" }}>
                          <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
                            <button 
                              onClick={() => { setEditingIndex(item.originalIndex); setCatInput(item.name); }} 
                              style={{ background: "#FEF3C7", color: "#D97706", border: "none", padding: "6px 12px", borderRadius: "8px", cursor: "pointer", fontWeight: 700, fontSize: "12px", display: "flex", alignItems: "center", gap: "4px" }}
                            >
                              ✏️ Edit
                            </button>
                            <button 
                              onClick={() => handleDelete(item.name)} 
                              style={{ background: "#FEE2E2", color: "#DC2626", border: "none", padding: "6px 12px", borderRadius: "8px", cursor: "pointer", fontWeight: 700, fontSize: "12px", display: "flex", alignItems: "center", gap: "4px" }}
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
  );
}