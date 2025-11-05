// UserListContainer.jsx
import React from "react";
import UserList from "./UserList";
import UserFilters from "./UserFilters";
import { useUser } from "../hooks/useUser";

export default function UserListContainer() {
  const { users, loading, error, fetchUsers } = useUser();

  const handleApplyFilters = (selectedFilters) => {
    fetchUsers(selectedFilters);
  };

  return (
    <div style={{ padding: 20 }}>
      <UserFilters onApply={handleApplyFilters} />
      <UserList users={users} loading={loading} error={error} />
    </div>
  );
}
