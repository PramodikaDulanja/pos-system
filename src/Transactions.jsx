import React, { useState, useMemo } from "react";

const CURRENCY = (n) =>
  "Rs. " + (n || 0).toLocaleString("en-LK", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function Transactions({ setActiveView, transactions }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBill, setSelectedBill] = useState(null);

  // Search filter for bills
  const filteredTransactions = useMemo(() => {
    return transactions.filter(tx => {
      const q = searchQuery.toLowerCase();
      return (
        tx.billNo.toLowerCase().includes(q) ||
        tx.date.toLowerCase().includes(q)
      );
    });
  }, [transactions, searchQuery]);

  const totalRevenue = transactions.reduce((sum, tx) => sum + tx.total, 0);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#F4F7FE", minHeight: "100vh", padding: "30px", boxSizing: "border-box" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px", background: "#FFFFFF", padding: "20px 28px", borderRadius: "16px", border: "1px solid #E2E8F0", boxShadow: "0 4px 20px rgba(0,0,0,0.02)" }}>
          <div>
            <h1 style={{ fontSize: "26px", fontWeight: 900, color: "#1E293B", margin: "0 0 4px 0" }}>📊 Transactions & Sales History</h1>
            <p style={{ fontSize: "14px", color: "#64748B", margin: 0, fontWeight: 500 }}>View past bills, track total revenues, and analyze sales logs.</p>
          </div>
          <button 
            onClick={() => setActiveView("dashboard")}
            style={{ background: "linear-gradient(135deg, #4F46E5 0%, #3B82F6 100%)", color: "#FFFFFF", border: "none", padding: "12px 22px", borderRadius: "10px", fontWeight: 700, fontSize: "14px", cursor: "pointer", boxShadow: "0 4px 12px rgba(79,70,229,0.25)" }}
          >
            ← Back to Dashboard
          </button>
        </div>

        {/* Summary Metric Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px", marginBottom: "28px" }}>
          <div style={{ background: "#FFFFFF", padding: "24px", borderRadius: "16px", border: "1px solid #E2E8F0", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
            <div style={{ fontSize: "13px", fontWeight: 700, color: "#64748B", textTransform: "uppercase" }}>Total Revenue Collected</div>
            <div style={{ fontSize: "28px", fontWeight: 900, color: "#10B981", marginTop: "8px", fontFamily: "'Courier New', monospace" }}>
              {CURRENCY(totalRevenue)}
            </div>
          </div>
          <div style={{ background: "#FFFFFF", padding: "24px", borderRadius: "16px", border: "1px solid #E2E8F0", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
            <div style={{ fontSize: "13px", fontWeight: 700, color: "#64748B", textTransform: "uppercase" }}>Total Completed Bills</div>
            <div style={{ fontSize: "28px", fontWeight: 900, color: "#4F46E5", marginTop: "8px", fontFamily: "'Courier New', monospace" }}>
              {transactions.length} Bills
            </div>
          </div>
        </div>

        {/* Transactions Table Section */}
        <div style={{ background: "#FFFFFF", padding: "28px", borderRadius: "16px", border: "1px solid #E2E8F0", boxShadow: "0 10px 30px rgba(0,0,0,0.03)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#1E293B", margin: 0 }}>📋 Sales Logs</h3>
            <span style={{ fontSize: "12px", fontWeight: 700, background: "#EEF2FF", color: "#4F46E5", padding: "6px 12px", borderRadius: "20px" }}>
              {filteredTransactions.length} Records
            </span>
          </div>

          {/* Search Bar */}
          <div style={{ marginBottom: "16px" }}>
            <input 
              type="text" 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
              placeholder="🔍 Search by bill number (e.g. #BIL-1001) or date..." 
              style={{ width: "100%", padding: "12px 16px", borderRadius: "10px", border: "2px solid #E2E8F0", fontSize: "14px", fontWeight: 500, color: "#1E293B", background: "#F8FAFC", outline: "none", boxSizing: "border-box" }}
              onFocus={(e) => e.target.style.borderColor = "#4F46E5"}
              onBlur={(e) => e.target.style.borderColor = "#E2E8F0"}
            />
          </div>

          <div style={{ maxHeight: "450px", overflowY: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "14px" }}>
              <thead>
                <tr style={{ background: "#F8FAFC", borderBottom: "2px solid #E2E8F0", color: "#475569", textTransform: "uppercase", fontSize: "12px" }}>
                  <th style={{ padding: "12px 14px" }}>Bill No</th>
                  <th style={{ padding: "12px 14px" }}>Date & Time</th>
                  <th style={{ padding: "12px 14px", textAlign: "center" }}>Items Count</th>
                  <th style={{ padding: "12px 14px", textAlign: "right" }}>Total Amount</th>
                  <th style={{ padding: "12px 14px", textAlign: "center" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: "center", padding: "50px", color: "#94A3B8", fontWeight: 600 }}>
                      No transaction records found. Complete a bill in POS Counter first!
                    </td>
                  </tr>
                ) : (
                  filteredTransactions.map((tx) => (
                    <tr key={tx.id} style={{ borderBottom: "1px solid #F1F5F9" }}>
                      <td style={{ padding: "14px", fontFamily: "'Courier New', monospace", fontWeight: 800, color: "#4F46E5" }}>
                        {tx.billNo}
                      </td>
                      <td style={{ padding: "14px", fontWeight: 600, color: "#334155" }}>
                        {tx.date}
                      </td>
                      <td style={{ padding: "14px", textAlign: "center", fontWeight: 700, color: "#0284C7" }}>
                        {tx.itemsCount} Items
                      </td>
                      <td style={{ padding: "14px", textAlign: "right", fontFamily: "'Courier New', monospace", fontWeight: 800, color: "#10B981", fontSize: "15px" }}>
                        {CURRENCY(tx.total)}
                      </td>
                      <td style={{ padding: "14px", textAlign: "center" }}>
                        <button 
                          onClick={() => setSelectedBill(tx)}
                          style={{ background: "#EEF2FF", color: "#4F46E5", border: "none", padding: "6px 14px", borderRadius: "8px", cursor: "pointer", fontWeight: 700, fontSize: "13px" }}
                        >
                          👁️ View Bill
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Bill Details Modal */}
      {selectedBill && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ background: "#FFFFFF", padding: "30px", borderRadius: "16px", width: "400px", maxWidth: "90%", boxShadow: "0 10px 30px rgba(0,0,0,0.2)" }}>
            <div style={{ textAlign: "center", borderBottom: "2px dashed #CBD5E1", paddingBottom: "14px", marginBottom: "14px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: 900, color: "#1E293B", margin: "0 0 4px 0" }}>BILL RECEIPT COPY</h3>
              <p style={{ fontSize: "13px", color: "#64748B", margin: 0, fontFamily: "'Courier New', monospace" }}>{selectedBill.billNo} &middot; {selectedBill.date}</p>
            </div>

            <div style={{ maxHeight: "250px", overflowY: "auto", marginBottom: "16px" }}>
              {selectedBill.items.map((item, idx) => (
                <div key={idx} style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "8px", borderBottom: "1px solid #F1F5F9", paddingBottom: "6px" }}>
                  <span>{item.product.name} ({item.qty}x)</span>
                  <span style={{ fontFamily: "'Courier New', monospace", fontWeight: 700 }}>{CURRENCY(item.product.price * item.qty)}</span>
                </div>
              ))}
            </div>

            <div style={{ borderTop: "2px solid #E2E8F0", paddingTop: "12px", marginBottom: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "16px", fontWeight: 800, color: "#1E293B" }}>
                <span>Total Amount:</span>
                <span style={{ fontFamily: "'Courier New', monospace", color: "#10B981" }}>{CURRENCY(selectedBill.total)}</span>
              </div>
            </div>

            <button 
              onClick={() => setSelectedBill(null)}
              style={{ width: "100%", padding: "12px", background: "#4F46E5", color: "#FFFFFF", border: "none", borderRadius: "10px", fontWeight: 700, cursor: "pointer" }}
            >
              Close Receipt
            </button>
          </div>
        </div>
      )}
    </div>
  );
}