import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Home() {
  return <h2>Welcome to Philadelphia Altar Church</h2>;
}

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

function Donations() {
  return <h2>Give & Support Church</h2>;
}

function Prayers() {
  return <h2>Prayer Requests</h2>;
}

function Members() {
  return <h2>Members Area</h2>;
}

function Admin() {
  return <h2>Admin Dashboard</h2>;
}

export default function App() {
  return (
    <BrowserRouter>
      <nav style={{ display: "flex", gap: 10 }}>
        <Link to="/">Home</Link>
        <Link to="/sermons">Sermons</Link>
        <Link to="/donations">Donations</Link>
        <Link to="/prayers">Prayers</Link>
        <Link to="/members">Members</Link>
        <Link to="/admin">Admin</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sermons" element={<Sermons />} />
        <Route path="/donations" element={<Donations />} />
        <Route path="/prayers" element={<Prayers />} />
        <Route path="/members" element={<Members />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
  }
