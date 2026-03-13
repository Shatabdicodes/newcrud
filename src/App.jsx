import { useState } from "react";

const defaultUsers = [
  { id: 1, name: "Raj Sharma", email: "raj@gmail.com", password: "123456", age: 20, gender: "Male", terms: true },
  { id: 2, name: "Kasturi Sen", email: "kas@gmail.com", password: "123456", age: 21, gender: "Female", terms: false },
  { id: 3, name: "Sayantani Dey", email: "sayantani@gmail.com", password: "123456", age: 22, gender: "Female", terms: true },
];

function getColor(name) {
  const c = { "Raj Sharma": "#6c63ff", "Kasturi Sen": "#4f8ef7", "Sayantani Dey": "#5b8dee" };
  const fallback = ["#6c63ff","#4f8ef7","#5b8dee","#06b6d4","#10b981","#f59e0b","#ef4444","#ec4899"];
  return c[name] || fallback[name.charCodeAt(0) % fallback.length];
}
function getInitials(name) {
  return name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
}

export default function App() {
  const [users, setUsers] = useState(defaultUsers);
  const [form, setForm] = useState({ name: "", email: "", password: "", age: "", gender: "Male", terms: false });
  const [editId, setEditId] = useState(null);
  const [tab, setTab] = useState("form"); // for mobile tab switching

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      setUsers(users.map(u => u.id === editId ? { ...form, id: editId } : u));
      setEditId(null);
    } else {
      setUsers([...users, { ...form, id: Date.now() }]);
    }
    setForm({ name: "", email: "", password: "", age: "", gender: "Male", terms: false });
    setTab("users");
  };

  const handleEdit = (user) => { setForm(user); setEditId(user.id); setTab("form"); };
  const handleDelete = (id) => setUsers(users.filter(u => u.id !== id));

  const total = users.length;
  const male = users.filter(u => u.gender === "Male").length;
  const female = users.filter(u => u.gender === "Female").length;
  const agreed = users.filter(u => u.terms).length;

  return (
    <div style={{
      minHeight: "100vh", width: "100vw",
      background: "#07090f",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "10px", boxSizing: "border-box",
      fontFamily: "'Segoe UI', Arial, sans-serif",
    }}>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .inp {
          width: 100%; background: #181c2e; border: 1.5px solid #232740;
          color: #c8d0e8; padding: 9px 12px; border-radius: 8px;
          font-size: 13px; outline: none; font-family: inherit;
          transition: border-color 0.2s;
        }
        .inp:focus { border-color: #4f6ef7; }
        .inp::placeholder { color: #3a405e; }

        .field { margin-bottom: 10px; }
        .field-label {
          font-size: 10px; font-weight: 700; color: #4a5272;
          letter-spacing: 0.13em; display: block; margin-bottom: 5px; text-transform: uppercase;
        }

        .radio-group { display: flex; gap: 6px; flex-wrap: wrap; }
        .radio-label {
          display: flex; align-items: center; gap: 5px;
          font-size: 12px; color: #7a84a8; cursor: pointer;
          background: #181c2e; border: 1.5px solid #232740;
          padding: 7px 12px; border-radius: 8px; font-weight: 500;
          transition: border-color 0.2s; user-select: none;
        }
        .radio-label:hover { border-color: #4f6ef7; }
        .radio-label input[type=radio] { width: 13px; height: 13px; accent-color: #4f6ef7; flex-shrink: 0; cursor: pointer; }

        .terms-row { display: flex; align-items: center; gap: 8px; margin-bottom: 14px; }
        .terms-row input[type=checkbox] { width: 15px; height: 15px; accent-color: #4f6ef7; cursor: pointer; flex-shrink: 0; }
        .terms-row span { font-size: 12px; color: #5a6280; }

        .save-btn {
          width: 100%; padding: 11px;
          background: linear-gradient(90deg, #3b5bdb 0%, #5b63f7 60%, #6c63ff 100%);
          border: none; border-radius: 9px; color: white;
          font-size: 13px; font-weight: 700; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 7px;
          font-family: inherit; letter-spacing: 0.03em;
          box-shadow: 0 4px 18px rgba(79,110,247,0.22);
          transition: opacity 0.2s;
        }
        .save-btn:hover { opacity: 0.92; }

        table { width: 100%; border-collapse: collapse; font-size: 12px; }
        th {
          font-size: 9px; font-weight: 700; color: #3a4260;
          letter-spacing: 0.12em; padding: 8px 10px; text-align: left;
          border-bottom: 1px solid #181c2e; text-transform: uppercase;
          white-space: nowrap;
        }
        td { padding: 10px 10px; border-bottom: 1px solid #161928; vertical-align: middle; }
        tr:last-child td { border-bottom: none; }
        tr:hover td { background: rgba(255,255,255,0.012); }

        .badge-male   { background: #12203e; color: #60a5fa; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; display:inline-block; white-space:nowrap; }
        .badge-female { background: #22103a; color: #c084fc; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; display:inline-block; white-space:nowrap; }
        .badge-other  { background: #0e2420; color: #34d399; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; display:inline-block; white-space:nowrap; }

        .agree-icon-box   { background: #133a20; border-radius: 4px; width: 18px; height: 18px; display:flex; align-items:center; justify-content:center; font-size: 10px; color: #22c55e; flex-shrink:0; }
        .decline-icon-box { background: #3a1010; border-radius: 4px; width: 18px; height: 18px; display:flex; align-items:center; justify-content:center; font-size: 10px; color: #ef4444; flex-shrink:0; }
        .agree-text   { color: #22c55e; font-size: 11px; font-weight: 700; white-space:nowrap; }
        .decline-text { color: #ef4444; font-size: 11px; font-weight: 700; white-space:nowrap; }
        .tc-cell { display: flex; align-items: center; gap: 5px; }

        .edit-btn {
          background: #1c2348; color: #7090ff; border: 1.5px solid #2a3468;
          padding: 5px 10px; border-radius: 7px; font-size: 11px; font-weight: 700;
          cursor: pointer; display: inline-flex; align-items: center; gap: 4px;
          font-family: inherit; transition: background 0.15s; white-space:nowrap;
        }
        .edit-btn:hover { background: #243070; }
        .del-btn {
          background: #22100e; color: #ef4444; border: 1.5px solid #3a1c18;
          padding: 5px 8px; border-radius: 7px; font-size: 12px;
          cursor: pointer; margin-left: 5px; font-family: inherit;
          transition: background 0.15s; display: inline-flex; align-items: center;
        }
        .del-btn:hover { background: #2e1410; }

        .stat-chip {
          background: #13172a; border: 1.5px solid #20243c; border-radius: 20px;
          padding: 4px 12px; font-size: 12px; font-weight: 600; color: #6a729a;
          display: inline-flex; align-items: center; gap: 5px;
        }
        .stat-chip b { color: #d0d8f0; font-weight: 800; }

        .inner-card {
          background: #10131e; border: 1.5px solid #1e2238;
          border-radius: 14px; padding: 16px 18px;
        }
        .section-head { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
        .section-icon {
          background: #1c2348; border-radius: 8px; width: 28px; height: 28px;
          display: flex; align-items: center; justify-content: center; font-size: 13px; flex-shrink: 0;
        }
        .section-title { font-size: 14px; font-weight: 800; color: #e8eaf8; }

        /* ── MOBILE TABS ── */
        .mob-tabs { display: none; }

        /* ── DESKTOP: side-by-side ── */
        .content-grid {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 14px;
          flex: 1;
          min-height: 0;
        }
        .form-panel  { display: flex; flex-direction: column; overflow: hidden; }
        .table-panel { display: flex; flex-direction: column; overflow: hidden; }

        /* ── TABLET (≤900px): stack vertically, both visible, scroll allowed ── */
        @media (max-width: 900px) {
          .outer-shell { border-radius: 24px !important; padding: 14px 14px !important; height: auto !important; min-height: calc(100vh - 20px) !important; overflow-y: auto !important; }
          .content-grid { grid-template-columns: 1fr !important; gap: 12px !important; flex: none !important; }
          .form-panel, .table-panel { overflow: visible !important; }
          .inner-card { padding: 14px 14px !important; }
        }

        /* ── MOBILE (≤600px): tab switcher ── */
        @media (max-width: 600px) {
          .outer-shell { border-radius: 18px !important; padding: 12px 10px !important; }
          .mob-tabs { display: flex !important; gap: 8px; margin-bottom: 12px; flex-shrink: 0; }
          .mob-tab {
            flex: 1; padding: 8px; border-radius: 10px; border: 1.5px solid #20243c;
            background: #10131e; color: #5a6280; font-size: 13px; font-weight: 700;
            cursor: pointer; font-family: inherit; transition: all 0.2s; text-align: center;
          }
          .mob-tab.active { background: #1c2348; border-color: #4f6ef7; color: #7090ff; }
          .content-grid { display: block !important; flex: none !important; }
          .form-panel  { display: none; }
          .table-panel { display: none; }
          .form-panel.visible  { display: flex !important; flex-direction: column; }
          .table-panel.visible { display: flex !important; flex-direction: column; }
          .header-title { font-size: 17px !important; }
          .header-logo  { width: 34px !important; height: 34px !important; font-size: 16px !important; }
          .users-badge  { font-size: 11px !important; padding: 5px 12px !important; }
          th { padding: 7px 7px !important; font-size: 8px !important; }
          td { padding: 8px 7px !important; }
          .edit-btn { padding: 4px 8px !important; font-size: 10px !important; }
          .del-btn  { padding: 4px 6px !important; font-size: 11px !important; }
        }

        ::-webkit-scrollbar { width: 3px; height: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #20243c; border-radius: 3px; }
      `}</style>

      {/* ── BIG ARC OUTER SHELL ── */}
      <div className="outer-shell" style={{
        width: "100%", height: "calc(100vh - 20px)",
        background: "radial-gradient(ellipse at 60% 40%, #12183a 0%, #0a0c14 60%, #080a10 100%)",
        borderRadius: "32px",
        border: "1.5px solid #1e2238",
        boxShadow: "0 0 0 5px #0d0f1a, 0 0 60px rgba(79,110,247,0.08)",
        display: "flex", flexDirection: "column",
        padding: "18px 22px",
        overflow: "hidden",
        color: "#e2e8f0",
      }}>

        {/* HEADER */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div className="header-logo" style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg,#4f6ef7,#6c63ff)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 19, flexShrink: 0 }}>👤</div>
            <h1 className="header-title" style={{ fontSize: "22px", fontWeight: 900, color: "#fff", letterSpacing: "-0.5px" }}>
              User <span style={{ color: "#4f72ff" }}>Management</span>
            </h1>
          </div>
          <div className="users-badge" style={{ background: "#10131e", border: "1.5px solid #20243c", borderRadius: "20px", padding: "6px 16px", fontSize: "12px", fontWeight: 700, color: "#c8d0e8", whiteSpace: "nowrap" }}>
            {total} Users
          </div>
        </div>

        {/* MOBILE TABS */}
        <div className="mob-tabs">
          <button className={`mob-tab ${tab === "form" ? "active" : ""}`} onClick={() => setTab("form")}>
            ✏️ {editId ? "Edit User" : "Add User"}
          </button>
          <button className={`mob-tab ${tab === "users" ? "active" : ""}`} onClick={() => setTab("users")}>
            📋 All Users ({total})
          </button>
        </div>

        {/* CONTENT GRID */}
        <div className="content-grid">

          {/* FORM PANEL */}
          <div className={`form-panel inner-card ${tab === "form" ? "visible" : ""}`}>
            <div className="section-head">
              <div className="section-icon">✏️</div>
              <span className="section-title">{editId ? "Edit User" : "Add New User"}</span>
            </div>
            <form onSubmit={handleSubmit} style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <div className="field">
                <label className="field-label">FULL NAME</label>
                <input className="inp" name="name" value={form.name} onChange={handleChange} placeholder="e.g. Arjun Das" />
              </div>
              <div className="field">
                <label className="field-label">EMAIL ADDRESS</label>
                <input className="inp" name="email" value={form.email} onChange={handleChange} placeholder="e.g. arjun@example.com" />
              </div>
              <div className="field">
                <label className="field-label">PASSWORD</label>
                <input className="inp" type="password" name="password" value={form.password} onChange={handleChange} placeholder="Enter password" />
              </div>
              <div className="field">
                <label className="field-label">AGE</label>
                <input className="inp" name="age" value={form.age} onChange={handleChange} placeholder="e.g. 25" />
              </div>
              <div className="field">
                <label className="field-label">GENDER</label>
                <div className="radio-group">
                  {["Male","Female","Other"].map(g => (
                    <label key={g} className="radio-label">
                      <input type="radio" name="gender" value={g} checked={form.gender === g} onChange={handleChange} />
                      {g}
                    </label>
                  ))}
                </div>
              </div>
              <div className="terms-row" style={{ marginTop: "auto" }}>
                <input type="checkbox" name="terms" checked={form.terms} onChange={handleChange} />
                <span>I agree to the Terms & Conditions</span>
              </div>
              <button type="submit" className="save-btn">
                💾 {editId ? "Update User" : "Save User"}
              </button>
            </form>
          </div>

          {/* TABLE PANEL */}
          <div className={`table-panel inner-card ${tab === "users" ? "visible" : ""}`}>
            <div className="section-head">
              <div className="section-icon">📋</div>
              <span className="section-title">All Users</span>
            </div>
            <div style={{ display: "flex", gap: "6px", marginBottom: "12px", flexWrap: "wrap", flexShrink: 0 }}>
              <div className="stat-chip"><b>{total}</b> Total</div>
              <div className="stat-chip"><b>{male}</b> Male</div>
              <div className="stat-chip"><b>{female}</b> Female</div>
              <div className="stat-chip"><b>{agreed}</b> Agreed T&C</div>
            </div>
            <div style={{ flex: 1, overflowY: "auto", overflowX: "auto" }}>
              <table>
                <thead>
                  <tr>
                    <th>#</th><th>NAME</th><th>EMAIL</th><th>PASS</th><th>AGE</th><th>GENDER</th><th>T&C</th><th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u, i) => (
                    <tr key={u.id}>
                      <td style={{ color: "#2e3450", fontWeight: 700 }}>{String(i+1).padStart(2,"0")}</td>
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <div style={{ width: 30, height: 30, borderRadius: "50%", background: getColor(u.name), display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800, color: "#fff", flexShrink: 0 }}>
                            {getInitials(u.name)}
                          </div>
                          <span style={{ fontWeight: 700, color: "#d8dff5", whiteSpace: "nowrap" }}>{u.name}</span>
                        </div>
                      </td>
                      <td style={{ color: "#5a6280" }}>{u.email}</td>
                      <td style={{ color: "#2e3450", letterSpacing: "2px" }}>••••••</td>
                      <td style={{ color: "#c8d0e8", fontWeight: 700 }}>{u.age}</td>
                      <td>
                        <span className={u.gender==="Male"?"badge-male":u.gender==="Female"?"badge-female":"badge-other"}>
                          {u.gender}
                        </span>
                      </td>
                      <td>
                        <div className="tc-cell">
                          {u.terms
                            ? <><div className="agree-icon-box">✔</div><span className="agree-text">Agreed</span></>
                            : <><div className="decline-icon-box">✖</div><span className="decline-text">Declined</span></>
                          }
                        </div>
                      </td>
                      <td style={{ whiteSpace: "nowrap" }}>
                        <button className="edit-btn" onClick={() => handleEdit(u)}>✏ Edit</button>
                        <button className="del-btn" onClick={() => handleDelete(u.id)}>🗑</button>
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