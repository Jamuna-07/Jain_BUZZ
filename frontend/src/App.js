import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Feed from './components/Feed';  // Ensure this path is correct

function App() {
  return (
    <Router>
      <div>
        <nav style={styles.navbar}>
          <h1 style={styles.logo}>JainBUZZ</h1>
          <div>
            <Link to="/" style={styles.link}>Home</Link>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </div>
        </nav>
        <div style={styles.container}>
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#333',
    color: '#fff',
  },
  logo: { margin: 0 },
  link: {
    marginLeft: '15px',
    color: '#fff',
    textDecoration: 'none',
    fontSize: '16px',
  },
  container: {
    padding: '20px',
  },
};

export default App;
