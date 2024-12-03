import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div style={styles.container}>
      <h1>Welcome to JainBUZZ!</h1>
      <p>Your go-to platform for connecting with your university community.</p>
      <div>
        <Link
          to="/login"
          style={isHovered ? { ...styles.button, ...styles.buttonHover } : styles.button}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Login
        </Link>
        <Link
          to="/register"
          style={isHovered ? { ...styles.button, ...styles.buttonHover } : styles.button}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Register
        </Link>
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
  },
  button: {
    display: 'inline-block',
    margin: '10px',
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#333',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#555',
  }
};

export default Home;
