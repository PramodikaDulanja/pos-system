import { useState, useMemo } from "react";
import "./POSSystem.css"; 

const PRODUCTS = [
  { id: 1, name: "Basmati Rice 1kg", category: "Groceries", price: 420 },
  { id: 2, name: "Coconut Oil 750ml", category: "Groceries", price: 690 },
  { id: 3, name: "Red Onions 1kg", category: "Vegetables", price: 260 },
  { id: 4, name: "Tomatoes 1kg", category: "Vegetables", price: 340 },
  { id: 5, name: "Ceylon Tea 200g", category: "Beverages", price: 380 },
  { id: 6, name: "Milk Powder 400g", category: "Groceries", price: 950 },
  { id: 7, name: "Bread Loaf", category: "Bakery", price: 150 },
  { id: 8, name: "Eggs (12)", category: "Dairy", price: 720 },
  { id: 9, name: "Chicken Curry Pack", category: "Meat", price: 890 },
  { id: 10, name: "Dhal 500g", category: "Groceries", price: 240 },
  { id: 11, name: "Sugar 1kg", category: "Groceries", price: 290 },
  { id: 12, name: "Bottled Water 1.5L", category: "Beverages", price: 130 },
];

const CURRENCY = (n) =>
  "Rs. " + n.toLocaleString("en-LK", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const round2 = (n) => Math.round(n * 100) / 100;

// Button Styles
const btnBaseStyle = {
  width: "32px", height: "32px", fontSize: "18px", lineHeight: "1",
  borderRadius: "8px", border: "none", cursor: "pointer", 
  display: "flex", alignItems: "center", justifyContent: "center",
  transition: "all 0.2s"
};

// ==========================================
// 1. ItemRow Component (වම් පස ලැයිස්තුව සඳහා)
// ==========================================
const ItemRow = ({ product, inBill, entry, changeQty, setQty, setDiscount, removeItem }) => {
  const active = entry.qty > 0;
  const lineTotalValue = round2(product.price * entry.qty * (1 - (entry.discountPercent || 0) / 100));

  return (
    <div
      className="item-card"
      style={{
        display: "flex", flexDirection: "column", gap: "10px", padding: "16px",
        background: active ? "#EEF2FF" : "#FFFFFF", 
        border: active ? "2px solid #4F46E5" : "1px solid #E2E8F0", 
        borderRadius: "12px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "16px", fontWeight: 600, color: "#1E293B", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {product.name}
            </span>
            {inBill && (
              <span style={{ fontSize: "11px", fontWeight: 700, color: "#FFFFFF", background: "#10B981", padding: "3px 8px", borderRadius: "12px", flexShrink: 0, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                In Bill
              </span>
            )}
          </div>
          <div style={{ fontSize: "13px", color: "#64748B", marginTop: "4px", fontWeight: 500 }}>
            <span style={{ color: "#3B82F6" }}>{product.category}</span> &middot; <span style={{ fontFamily: "'Courier New', monospace", fontWeight: 600, color: "#0F172A" }}>{CURRENCY(product.price)}</span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
          <button onClick={() => changeQty(product, -1)} style={{ ...btnBaseStyle, background: "#F1F5F9", color: "#475569" }}>&minus;</button>
          <input
            type="number" min="0" step="0.01" value={entry.qty === 0 ? "" : entry.qty} placeholder="0"
            onChange={(e) => setQty(product, e.target.value)}
            style={{ width: "50px", textAlign: "center", padding: "8px 4px", fontSize: "15px", fontWeight: 600, fontFamily: "'Courier New', monospace", border: "1px solid #CBD5E1", borderRadius: "8px", color: "#1E293B", outline: "none", background: "#FFFFFF" }}
          />
          <button onClick={() => changeQty(product, 1)} style={{ ...btnBaseStyle, background: "#4F46E5", color: "#FFFFFF", boxShadow: "0 2px 4px rgba(79,70,229,0.3)" }}>+</button>

          {/* In Bill කොටසේ පමණක් පෙන්වන Remove Button එක */}
          {inBill && (
            <button 
              onClick={() => removeItem(product.id)}
              title="Remove item"
              style={{ background: "#FEE2E2", color: "#DC2626", border: "none", width: "32px", height: "32px", borderRadius: "8px", cursor: "pointer", fontWeight: 800, fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center", marginLeft: "4px" }}
            >
              &times;
            </button>
          )}
        </div>
      </div>

      {active && (
        <div style={{ display: "flex", alignItems: "center", gap: "8px", borderTop: "1px dashed #CBD5E1", paddingTop: "12px", marginTop: "4px" }}>
          <span style={{ fontSize: "13px", fontWeight: 600, color: "#F59E0B" }}>Discount</span>
          <input
            type="number" min="0" max="100" step="1" value={entry.discountPercent || ""} placeholder="0"
            onChange={(e) => setDiscount(product, e.target.value)}
            style={{ width: "48px", textAlign: "center", padding: "6px 4px", fontSize: "14px", fontWeight: 700, fontFamily: "'Courier New', monospace", border: "1px solid #FCD34D", borderRadius: "6px", color: "#D97706", outline: "none", background: "#FFFBEB" }}
          />
          <span style={{ fontSize: "13px", fontWeight: 600, color: "#F59E0B" }}>%</span>
          <span style={{ fontSize: "14px", fontWeight: 700, color: "#10B981", marginLeft: "auto", fontFamily: "'Courier New', monospace" }}>
            = {CURRENCY(lineTotalValue)}
          </span>
        </div>
      )}
    </div>
  );
};

// ==========================================
// 2. ප්‍රධාන POS Component එක
// ==========================================
export default function POSSystem({ setTransactions }) {
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState({});
  const [amountPaid, setAmountPaid] = useState(0);

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return PRODUCTS.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
  }, [query]);

  const cartItems = useMemo(() => Object.values(cart).sort((a, b) => a.product.id - b.product.id), [cart]);
  const cartIds = new Set(cartItems.map((l) => l.product.id));
  const extraResults = searchResults.filter((p) => !cartIds.has(p.id));

  const getEntry = (product) => cart[product.id] || { product, qty: 0, discountPercent: 0 };

  // Quantity එක වෙනස් කිරීම (0 වුණත් කාර්ට් එකෙන් අයින් වන්නේ නැත)
  const setQty = (product, qty) => {
    const clean = round2(Math.max(0, Math.min(999, parseFloat(qty))) || 0);
    setCart((prev) => {
      const next = { ...prev };
      next[product.id] = { ...getEntry(product), qty: clean };
      return next;
    });
  };

  const changeQty = (product, delta) => {
    const current = getEntry(product).qty;
    setQty(product, current + delta);
  };

  // Remove Button එක ක්ලික් කළහොත් පමණක් අයිතමය සම්පූර්ණයෙන්ම ඉවත් වේ
  const removeItem = (productId) => {
    setCart((prev) => {
      const next = { ...prev };
      delete next[productId];
      return next;
    });
  };

  const setDiscount = (product, pct) => {
    const clean = Math.max(0, Math.min(100, parseFloat(pct) || 0));
    setCart((prev) => {
      const existing = prev[product.id];
      if (!existing) return prev;
      return { ...prev, [product.id]: { ...existing, discountPercent: clean } };
    });
  };

  const lineTotal = (line) => round2(line.product.price * line.qty * (1 - (line.discountPercent || 0) / 100));
  const total = round2(cartItems.reduce((sum, l) => sum + lineTotal(l), 0));
  const itemCount = cartItems.length;
  const balance = round2((amountPaid || 0) - total);

  const handlePrint = () => {
    if (cartItems.length === 0) return;

    // විකුණුම් දත්ත (Transactions) ඉතිහාසයට එකතු කිරීම
    const newTransaction = {
      id: Date.now(),
      billNo: `#BIL-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleString(),
      items: cartItems,
      itemsCount: itemCount,
      total: total
    };

    if (setTransactions) {
      setTransactions(prev => [newTransaction, ...prev]);
    }

    window.print();
  };

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", background: "#F4F7FE", minHeight: "100vh", padding: "30px", boxSizing: "border-box" }}>
      
      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: "30px", width: "100%", margin: "0 auto", alignItems: "start" }}>
        
        {/* වම් පස: Search & Results */}
        <div className="no-print">
          <div style={{ marginBottom: "24px" }}>
            <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#1E293B", margin: "0 0 4px 0", letterSpacing: "-0.02em" }}>POS Counter</h1>
            <p style={{ fontSize: "14px", color: "#64748B", margin: 0, fontWeight: 500 }}>Search and select items to build your bill effortlessly.</p>
          </div>

          <div style={{ position: "relative", marginBottom: "24px", boxShadow: "0 4px 20px rgba(0,0,0,0.04)", borderRadius: "12px" }}>
            <input
              type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by item name or category..."
              style={{ width: "100%", boxSizing: "border-box", padding: "18px 20px", fontSize: "16px", fontWeight: 500, border: "2px solid #E2E8F0", borderRadius: "12px", background: "#FFFFFF", color: "#1E293B", outline: "none", transition: "border-color 0.3s" }}
              onFocus={(e) => (e.target.style.borderColor = "#4F46E5")} onBlur={(e) => (e.target.style.borderColor = "#E2E8F0")}
            />
          </div>

          {cartItems.length === 0 && query.trim() === "" && (
            <div style={{ padding: "50px 20px", textAlign: "center", color: "#94A3B8", fontSize: "15px", fontWeight: 500, background: "#FFFFFF", border: "2px dashed #CBD5E1", borderRadius: "12px" }}>
              Start typing to find items...
            </div>
          )}

          {cartItems.length > 0 && (
            <div style={{ marginBottom: query.trim() ? "24px" : "0" }}>
              <div style={{ fontSize: "13px", fontWeight: 700, color: "#4F46E5", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "1px" }}>★ In Your Bill</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {cartItems.map((line) => (
                  <ItemRow key={line.product.id} product={line.product} inBill={true} entry={line} changeQty={changeQty} setQty={setQty} setDiscount={setDiscount} removeItem={removeItem} />
                ))}
              </div>
            </div>
          )}

          {query.trim() !== "" && extraResults.length > 0 && (
            <div>
              {cartItems.length > 0 && <div style={{ fontSize: "13px", fontWeight: 700, color: "#64748B", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "1px", marginTop: "24px" }}>Search Results</div>}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {extraResults.map((product) => (
                  <ItemRow key={product.id} product={product} inBill={false} entry={getEntry(product)} changeQty={changeQty} setQty={setQty} setDiscount={setDiscount} removeItem={removeItem} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* දකුණු පස: Bill Preview */}
        <div id="pos-bill-print" style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "16px", padding: "28px", position: "sticky", top: "30px", boxShadow: "0 10px 30px rgba(0,0,0,0.03)" }}>
          
          <div style={{ textAlign: "center", borderBottom: "2px dashed #E2E8F0", paddingBottom: "16px", marginBottom: "16px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 900, color: "#0F172A", margin: "0 0 4px 0", textTransform: "uppercase", letterSpacing: "1px" }}>
              YOUR COMPANY NAME
            </h2>
            <p style={{ fontSize: "13px", color: "#475569", margin: "0 0 2px 0", fontWeight: 500 }}>
              123, Main Street, Colombo 01
            </p>
            <p style={{ fontSize: "13px", color: "#475569", margin: "0 0 12px 0", fontWeight: 500 }}>
              Tel: 011-2345678 / 077-1234567
            </p>
            
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#64748B", fontWeight: 600, fontFamily: "'Courier New', monospace" }}>
              <span>Date: {new Date().toLocaleDateString()}</span>
              <span>Time: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#64748B", marginTop: "4px", fontWeight: 600, fontFamily: "'Courier New', monospace" }}>
              <span>Bill No: #000125</span>
              <span>Items: {itemCount}</span>
            </div>
          </div>

          {cartItems.length === 0 ? (
            <div style={{ fontSize: "14px", fontWeight: 500, color: "#94A3B8", padding: "40px 0", textAlign: "center" }}>Cart is empty</div>
          ) : (
            <div className="print-expand" style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px", maxHeight: "40vh", overflowY: "scroll", paddingRight: "8px" }}>
              {cartItems.map((line) => {
                const hasDiscount = (line.discountPercent || 0) > 0;
                const originalPrice = line.product.price;
                const discountedUnitPrice = originalPrice * (1 - (line.discountPercent || 0) / 100);

                return (
                  <div key={line.product.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px", borderBottom: "1px dashed #F1F5F9", paddingBottom: "10px" }}>
                    
                    <div style={{ flex: 1, minWidth: 0, textAlign: "left" }}>
                      <div style={{ fontSize: "14px", fontWeight: 600, color: "#1E293B", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {line.product.name}
                      </div>
                      <div style={{ fontSize: "12px", color: "#64748B", fontFamily: "'Courier New', monospace", fontWeight: 600, marginTop: "4px" }}>
                        {line.qty} x {hasDiscount ? (
                          <>
                            <span style={{ textDecoration: "line-through", color: "#94A3B8" }}>{CURRENCY(originalPrice)}</span> 
                            <span style={{ color: "#F59E0B", marginLeft: "4px" }}>(-{line.discountPercent}%)</span> 
                            <span style={{ color: "#10B981", marginLeft: "6px", fontWeight: 700 }}>{CURRENCY(discountedUnitPrice)}</span>
                          </>
                        ) : (
                          <span>{CURRENCY(originalPrice)}</span>
                        )}
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
                      <div style={{ textAlign: "right", fontSize: "15px", fontWeight: 700, fontFamily: "'Courier New', monospace", color: "#1E293B", whiteSpace: "nowrap" }}>
                        {CURRENCY(lineTotal(line))}
                      </div>

                      <button 
                        onClick={() => removeItem(line.product.id)}
                        className="no-print"
                        title="Remove item"
                        style={{ background: "#FEE2E2", color: "#DC2626", border: "none", width: "26px", height: "26px", borderRadius: "6px", cursor: "pointer", fontWeight: 800, fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "center" }}
                      >
                        &times;
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          )}

          <div style={{ background: "#F8FAFC", borderRadius: "12px", padding: "16px", marginBottom: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "20px", fontWeight: 800, color: "#1E293B", paddingBottom: "12px", borderBottom: "2px solid #E2E8F0" }}>
              <span>Total</span> <span style={{ fontFamily: "'Courier New', monospace", color: "#10B981" }}>{CURRENCY(total)}</span>
            </div>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "16px", padding: "12px 16px", background: "#FFFFFF", borderRadius: "10px", border: "1px solid #E2E8F0", boxShadow: "0 2px 5px rgba(0,0,0,0.02)" }}>
              <span style={{ fontSize: "15px", fontWeight: 700, color: "#334155" }}>Amount Paid (Rs.)</span>
              <input 
                type="number" min="0" step="1" value={amountPaid === 0 ? "" : amountPaid} placeholder="0.00" 
                onChange={(e) => setAmountPaid(Math.max(0, parseFloat(e.target.value) || 0))} 
                style={{ width: "120px", textAlign: "right", padding: "10px 14px", fontSize: "18px", fontWeight: 800, fontFamily: "'Courier New', monospace", border: "2px solid #94A3B8", borderRadius: "8px", color: "#0F172A", backgroundColor: "#F8FAFC", outline: "none", transition: "all 0.3s ease" }} 
                onFocus={(e) => { e.target.style.borderColor = "#4F46E5"; e.target.style.backgroundColor = "#FFFFFF"; e.target.style.boxShadow = "0 0 0 4px rgba(79, 70, 229, 0.15)"; }} 
                onBlur={(e) => { e.target.style.borderColor = "#94A3B8"; e.target.style.backgroundColor = "#F8FAFC"; e.target.style.boxShadow = "none"; }} 
              />
            </div>
            
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "16px", fontWeight: 800, color: balance < 0 ? "#EF4444" : "#4F46E5", marginTop: "12px" }}>
              <span>{balance < 0 ? "Balance Due" : "Change to Give"}</span> <span style={{ fontFamily: "'Courier New', monospace" }}>{CURRENCY(Math.abs(balance))}</span>
            </div>
          </div>

          <button onClick={handlePrint} disabled={cartItems.length === 0} className="pay-btn no-print" style={{ width: "100%", padding: "16px", fontSize: "16px", fontWeight: 700, color: "#FFFFFF", background: cartItems.length === 0 ? "#CBD5E1" : "linear-gradient(to right, #4F46E5 0%, #3B82F6 51%, #4F46E5 100%)", border: "none", borderRadius: "10px", cursor: cartItems.length === 0 ? "not-allowed" : "pointer" }}>
            PRINT BILL & CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
}