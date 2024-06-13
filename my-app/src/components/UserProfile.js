import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './UserProfile.module.css';

const UserProfile = ({ userData }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const { data } = await axios.post('http://localhost:4000/profile', { userId: userData._id });
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
    <div className={styles.entirecontainer}>
    <div className={styles.profileContainer}>
    <h1>{user.displayName ? user.displayName : user.username}'s Profile</h1>
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
  );
}

export default UserProfile;
