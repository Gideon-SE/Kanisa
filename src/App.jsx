import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";

/* =======================
   HOME PAGE
======================= */
function Home() {
  return (
    <div>
      <h1>Philadelphia Altar Church</h1>
      <p>Victory belongs to Jesus</p>
    </div>
  );
}

/* =======================
   SERMONS PAGE
======================= */
function Sermons() {
  const [sermons, setSermons] = useState([]);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "/sermons")
      .then(res => res.json())
      .then(data => setSermons(data));
  }, []);

  return (
    <div>
      <h2>Sermons</h2>
      {sermons.map(s => (
        <div key={s.id}>
          <h3>{s.title}</h3>
          <p>{s.content}</p>
        </div>
      ))}
    </div>
  );
}

/* =======================
   PRAYERS PAGE
======================= */
function Prayers() {
  const [message, setMessage] = useState("");

  const submitPrayer = () => {
    fetch(import.meta.env.VITE_API_URL + "/prayers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    }).then(() => {
      alert("Prayer submitted");
      setMessage("");
    });
  };

  return (
    <div>
      <h2>Prayer Requests</h2>

      <textarea
        placeholder="Write your prayer request"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <br />
      <button onClick={submitPrayer}>Submit Prayer</button>
    </div>
  );
}

/* =======================
   MEMBERS PAGE
======================= */
function Members() {
  return (
    <div>
      <h2>Members Area</h2>
      <p>Coming soon...</p>
    </div>
  );
}

/* =======================
   DONATIONS PAGE
======================= */
function Donations() {
  return (
    <div>
      <h2>Donations</h2>
      <p>Support the church (M-Pesa coming soon)</p>
    </div>
  );
}

/* =======================
   ADMIN DASHBOARD (FULL WORKING)
======================= */
function Admin() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const addSermon = () => {
    fetch(import.meta.env.VITE_API_URL + "/sermons", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content })
    })
      .then(res => res.json())
      .then(() => {
        alert("Sermon added successfully");
        setTitle("");
        setContent("");
      });
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <input
        placeholder="Sermon Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br />

      <textarea
        placeholder="Sermon Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <br />

      <button onClick={addSermon}>Add Sermon</button>
    </div>
  );
}

/* =======================
   MAIN APP
======================= */
export default function App() {
  return (
    <BrowserRouter>
      {/* NAVIGATION */}
      <nav style={{ display: "flex", gap: 10, padding: 10 }}>
        <Link to="/">Home</Link>
        <Link to="/sermons">Sermons</Link>
        <Link to="/prayers">Prayers</Link>
        <Link to="/members">Members</Link>
        <Link to="/donations">Donations</Link>
        <Link to="/admin">Admin</Link>
      </nav>

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sermons" element={<Sermons />} />
        <Route path="/prayers" element={<Prayers />} />
        <Route path="/members" element={<Members />} />
        <Route path="/donations" element={<Donations />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
          }
