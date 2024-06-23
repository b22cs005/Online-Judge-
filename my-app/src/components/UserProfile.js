import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './UserProfile.module.css';

const UserProfile = ({ userData }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const { data } = await axios.post('https://backend.codehack.me/profile', { userId: userData._id });
        if (data.success) {
          setUser(data.user);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    getUserData();
  }, [userData._id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.dashboard}>
      <nav className={styles.sidebar}>
        <h2>Dashboard</h2>
      </nav>
      <div className={styles.main}>
        <header className={styles.header}>
          <h1>Welcome, {user.displayName ? user.displayName : user.username}</h1>
        </header>
        <div className={styles.content}>
          <div className={styles.profileContainer}>
            <h2>Profile Information</h2>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Number of Problems Solved:</strong> {user.solvedProblems.length}</p>
            <div className={styles.solvedProblems}>
              <h2>Solved Problems</h2>
              {user.solvedProblems.length > 0 ? (
                <ul>
                  {user.solvedProblems.map(problem => (
                    <li key={problem._id}>{problem.title}</li>
                  ))}
                </ul>
              ) : (
                <p>No problems solved yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
