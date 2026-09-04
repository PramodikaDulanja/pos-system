import { useState, useMemo } from "react";

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

export default function POSSystem() {
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState({});
  const [amountPaid, setAmountPaid] = useState(0);

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return PRODUCTS.filter(
      (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
    );
  }, [query]);

  const cartItems = useMemo(
    () => Object.values(cart).sort((a, b) => a.product.id - b.product.id),
    [cart]
  );

  const cartIds = new Set(cartItems.map((l) => l.product.id));
  const extraResults = searchResults.filter((p) => !cartIds.has(p.id));

  const getEntry = (product) => cart[product.id] || { product, qty: 0, discountPercent: 0 };

  const setQty = (product, qty) => {
    const clean = round2(Math.max(0, Math.min(999, parseFloat(qty))) || 0);
    setCart((prev) => {
      const next = { ...prev };
      if (!clean || clean <= 0) {
        delete next[product.id];
      } else {
        next[product.id] = { ...getEntry(product), qty: clean };
      }
      return next;
    });
  };

  const changeQty = (product, delta) => {
    const current = getEntry(product).qty;
    setQty(product, current + delta);
  };

  const setDiscount = (product, pct) => {
    const clean = Math.max(0, Math.min(100, parseFloat(pct) || 0));
    setCart((prev) => {
      const existing = prev[product.id];
      if (!existing) return prev;
      return { ...prev, [product.id]: { ...existing, discountPercent: clean } };
    });
  };

  const lineTotal = (line) =>
    round2(line.product.price * line.qty * (1 - (line.discountPercent || 0) / 100));

  const total = round2(cartItems.reduce((sum, l) => sum + lineTotal(l), 0));
  const itemCount = cartItems.reduce((sum, l) => sum + l.qty, 0);
  const balance = round2((amountPaid || 0) - total);

  const handlePrint = () => {
    if (cartItems.length === 0) return;
    window.print();
  };

  const ItemRow = ({ product, inBill }) => {
    const entry = getEntry(product);
    const active = entry.qty > 0;
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          padding: "14px 16px",
          background: "#FFFFFF",
          border: active ? "1.5px solid #2F6F4F" : "1.5px solid #E4E0D8",
          borderRadius: "6px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span
                style={{
                  fontSize: "15px",
                  fontWeight: 500,
                  color: "#1E2A28",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {product.name}
              </span>
              {inBill && (
                <span
                  style={{
                    fontSize: "10.5px",
                    fontWeight: 600,
                    color: "#2F6F4F",
                    background: "#E7F0EA",
                    padding: "2px 7px",
                    borderRadius: "10px",
                    flexShrink: 0,
                  }}
                >
                  In bill
                </span>
              )}
            </div>
            <div style={{ fontSize: "12px", color: "#7A756A", marginTop: "2px" }}>
              {product.category} &middot;{" "}
              <span style={{ fontFamily: "'Courier New', monospace" }}>
                {CURRENCY(product.price)}
              </span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
            <button onClick={() => changeQty(product, -1)} style={qtyBtnStyle} aria-label="Decrease quantity">
              &minus;
            </button>
            <input
              type="number"
              min="0"
              step="0.01"
              value={entry.qty === 0 ? "" : entry.qty}
              placeholder="0"
              onChange={(e) => setQty(product, e.target.value)}
              style={{
                width: "56px",
                textAlign: "center",
                padding: "8px 4px",
                fontSize: "14px",
                fontFamily: "'Courier New', monospace",
                border: "1.5px solid #DDD6C7",
                borderRadius: "4px",
                color: "#1E2A28",
                outline: "none",
              }}
            />
            <button
              onClick={() => changeQty(product, 1)}
              style={{ ...qtyBtnStyle, background: "#2F6F4F", color: "#FFFFFF", border: "1.5px solid #2F6F4F" }}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>

        {active && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              borderTop: "1px dashed #E4E0D8",
              paddingTop: "10px",
            }}
          >
            <span style={{ fontSize: "12px", color: "#7A756A" }}>Discount</span>
            <input
              type="number"
              min="0"
              max="100"
              step="1"
              value={entry.discountPercent || ""}
              placeholder="0"
              onChange={(e) => setDiscount(product, e.target.value)}
              style={{
                width: "48px",
                textAlign: "center",
                padding: "6px 4px",
                fontSize: "13px",
                fontFamily: "'Courier New', monospace",
                border: "1.5px solid #DDD6C7",
                borderRadius: "4px",
                color: "#E29234",
                outline: "none",
              }}
            />
            <span style={{ fontSize: "12px", color: "#7A756A" }}>%</span>
            <span style={{ fontSize: "12px", color: "#A6A196", marginLeft: "auto", fontFamily: "'Courier New', monospace" }}>
              = {CURRENCY(lineTotal(entry))}
            </span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      style={{
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        background: "#EFE9DA",
        minHeight: "100vh",
        padding: "28px",
        boxSizing: "border-box",
      }}
    >
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #pos-bill-print, #pos-bill-print * { visibility: visible; }
          #pos-bill-print { position: absolute; top: 0; left: 0; width: 320px; border: none !important; box-shadow: none !important; }
          .no-print { display: none !important; }
        }
      `}</style>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.6fr 1fr",
          gap: "24px",
          maxWidth: "1180px",
          margin: "0 auto",
          alignItems: "start",
        }}
      >
        {/* LEFT: search + results */}
        <div className="no-print">
          <div style={{ marginBottom: "18px" }}>
            <h1 style={{ fontSize: "22px", fontWeight: 600, color: "#1E2A28", margin: "0 0 2px 0", letterSpacing: "-0.01em" }}>
              Counter
            </h1>
            <p style={{ fontSize: "13px", color: "#7A756A", margin: 0 }}>
              Search for an item to add it to the bill
            </p>
          </div>

          <div style={{ position: "relative", marginBottom: "20px" }}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by item name or category..."
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "14px 16px",
                fontSize: "15px",
                border: "1.5px solid #DDD6C7",
                borderRadius: "6px",
                background: "#FFFFFF",
                color: "#1E2A28",
                outline: "none",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#2F6F4F")}
              onBlur={(e) => (e.target.style.borderColor = "#DDD6C7")}
            />
          </div>

          {cartItems.length === 0 && query.trim() === "" && (
            <div style={{ padding: "40px 20px", textAlign: "center", color: "#A6A196", fontSize: "14px", border: "1.5px dashed #DDD6C7", borderRadius: "6px" }}>
              Start typing to find items
            </div>
          )}

          {cartItems.length > 0 && (
            <div style={{ marginBottom: query.trim() ? "22px" : "0" }}>
              <div style={{ fontSize: "12px", fontWeight: 600, color: "#7A756A", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.03em" }}>
                In your bill
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {cartItems.map((line) => (
                  <ItemRow key={line.product.id} product={line.product} inBill />
                ))}
              </div>
            </div>
          )}

          {query.trim() !== "" && extraResults.length === 0 && searchResults.length === 0 && (
            <div style={{ padding: "40px 20px", textAlign: "center", color: "#A6A196", fontSize: "14px", border: "1.5px dashed #DDD6C7", borderRadius: "6px" }}>
              No items match "{query}"
            </div>
          )}

          {query.trim() !== "" && extraResults.length > 0 && (
            <div>
              {cartItems.length > 0 && (
                <div style={{ fontSize: "12px", fontWeight: 600, color: "#7A756A", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.03em" }}>
                  Search results
                </div>
              )}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {extraResults.map((product) => (
                  <ItemRow key={product.id} product={product} inBill={false} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT: bill preview */}
        <div
          id="pos-bill-print"
          style={{
            background: "#FFFFFF",
            border: "1.5px solid #DDD6C7",
            borderRadius: "8px",
            padding: "22px",
            position: "sticky",
            top: "28px",
          }}
        >
          <div style={{ borderBottom: "1.5px dashed #DDD6C7", paddingBottom: "14px", marginBottom: "14px" }}>
            <div style={{ fontSize: "16px", fontWeight: 600, color: "#1E2A28" }}>Bill</div>
            <div style={{ fontSize: "12px", color: "#7A756A", marginTop: "2px" }}>
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </div>
          </div>

          {cartItems.length === 0 ? (
            <div style={{ fontSize: "13px", color: "#A6A196", padding: "20px 0", textAlign: "center" }}>
              No items added yet
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "16px" }}>
              {cartItems.map((line) => {
                const hasDiscount = (line.discountPercent || 0) > 0;
                const unitPrice = line.product.price;
                return (
                  <div key={line.product.id} style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: "13.5px", color: "#1E2A28", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {line.product.name}
                      </div>
                      <div style={{ fontSize: "11.5px", color: "#A6A196", fontFamily: "'Courier New', monospace" }}>
                        {line.qty} x{" "}
                        {hasDiscount ? (
                          <>
                            <span style={{ textDecoration: "line-through" }}>{CURRENCY(unitPrice)}</span>{" "}
                            <span style={{ color: "#E29234" }}>-{line.discountPercent}%</span>
                          </>
                        ) : (
                          CURRENCY(unitPrice)
                        )}
                      </div>
                    </div>
                    <div style={{ fontSize: "13.5px", fontFamily: "'Courier New', monospace", color: "#1E2A28", flexShrink: 0 }}>
                      {CURRENCY(lineTotal(line))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div style={{ borderTop: "1.5px dashed #DDD6C7", paddingTop: "12px", display: "flex", flexDirection: "column", gap: "6px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "17px",
                fontWeight: 600,
                color: "#1E2A28",
                paddingBottom: "10px",
                borderBottom: "1.5px solid #E4E0D8",
              }}
            >
              <span>Total</span>
              <span style={{ fontFamily: "'Courier New', monospace" }}>{CURRENCY(total)}</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "13px", color: "#7A756A", marginTop: "4px" }}>
              <span>Amount paid (Rs.)</span>
              <input
                type="number"
                min="0"
                step="1"
                value={amountPaid === 0 ? "" : amountPaid}
                placeholder="0"
                onChange={(e) => setAmountPaid(Math.max(0, parseFloat(e.target.value) || 0))}
                style={{
                  width: "100px",
                  textAlign: "right",
                  padding: "7px 8px",
                  fontSize: "14px",
                  fontFamily: "'Courier New', monospace",
                  border: "1.5px solid #DDD6C7",
                  borderRadius: "4px",
                  color: "#1E2A28",
                  outline: "none",
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "15px",
                fontWeight: 600,
                color: balance < 0 ? "#C24E3A" : "#2F6F4F",
                marginTop: "2px",
              }}
            >
              <span>{balance < 0 ? "Balance due" : "Change to give"}</span>
              <span style={{ fontFamily: "'Courier New', monospace" }}>{CURRENCY(Math.abs(balance))}</span>
            </div>
          </div>

          <button
            onClick={handlePrint}
            disabled={cartItems.length === 0}
            className="no-print"
            style={{
              width: "100%",
              marginTop: "18px",
              padding: "14px",
              fontSize: "15px",
              fontWeight: 600,
              color: "#FFFFFF",
              background: cartItems.length === 0 ? "#B4C9BE" : "#2F6F4F",
              border: "none",
              borderRadius: "6px",
              cursor: cartItems.length === 0 ? "not-allowed" : "pointer",
              transition: "background 0.15s ease",
            }}
          >
            Print bill
          </button>
        </div>
      </div>
    </div>
  );
}

const qtyBtnStyle = {
  width: "30px",
  height: "30px",
  fontSize: "16px",
  lineHeight: "1",
  border: "1.5px solid #DDD6C7",
  borderRadius: "4px",
  background: "#FFFFFF",
  color: "#1E2A28",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};