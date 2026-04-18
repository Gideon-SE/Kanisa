import { useState, useEffect } from "react";

export default function App() {
  const [sermons, setSermons] = useState([]);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "/sermons")
      .then(res => res.json())
      .then(data => setSermons(data))
      .catch(() => setSermons([]));
  }, []);

  return (
    <div style={{ fontFamily: "Arial", padding: 20 }}>
      <h1>Philadelphia Altar Church</h1>
      <p><b>Victory belongs to Jesus</b></p>

      <hr />

      <h2>Sermons</h2>

      {sermons.length === 0 ? (
        <p>No sermons available</p>
      ) : (
        sermons.map((s) => (
          <div key={s.id} style={{ border: "1px solid #ddd", margin: 10, padding: 10 }}>
            <h3>{s.title}</h3>
            <p>{s.content}</p>
          </div>
        ))
      )}
    </div>
  );
  }
