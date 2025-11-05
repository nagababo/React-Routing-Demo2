import React from "react";

export default function UserList({ users = [], loading, error }) {
  if (loading) return <p>Loading users...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  if (!users.length)
    return <p style={{ textAlign: "center" }}>No users found.</p>;

  return (
    <div style={{ textAlign: "center", marginTop: 40 }}>
      <h2>User List</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {users.map((user) => (
          <li
            key={user.id}
            style={{
              borderBottom: "1px solid #eee",
              padding: "10px 0",
            }}
          >
            <strong>{user.firstName} {user.lastName}</strong> — {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
