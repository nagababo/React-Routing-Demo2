
import React from "react";
import { useUser } from "../hooks/useUser";

export default function UserFilters() {
  const { filters, setFilters, fetchUsers } = useUser(false); // autoFetch = false

  const handleApply = () => {
    fetchUsers(filters);
  };

  return (
    <div style={{ textAlign: "center", marginTop: 20 }}>
      <h3>Filter Users</h3>

      <select
        value={filters.gender}
        onChange={(e) =>
          setFilters({ ...filters, gender: e.target.value })
        }
      >
        <option value="">All</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>

      <input
        type="text"
        placeholder="Search by name"
        value={filters.search}
        onChange={(e) =>
          setFilters({ ...filters, search: e.target.value })
        }
      />

      <button onClick={handleApply}>Apply Filters</button>

      {/* 👇 Live preview of user's selections */}
      <div style={{ marginTop: 10 }}>
        <strong>Selected Filters:</strong>{" "}
        {JSON.stringify(filters, null, 2)}
      </div>
    </div>
  );
}


// import React, { useState } from "react";

// export default function UserFilters({ onApply }) {
//   const [gender, setGender] = useState("");
//   const [search, setSearch] = useState("");

//   const handleApply = () => {
//     const filters = {};
//     if (gender) filters.gender = gender;
//     if (search) filters.q = search;
//     onApply(filters);
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         gap: "1rem",
//         marginBottom: "1rem",
//       }}
//     >
//       <input
//         type="text"
//         placeholder="Search by name..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />

//       <select value={gender} onChange={(e) => setGender(e.target.value)}>
//         <option value="">All Genders</option>
//         <option value="male">Male</option>
//         <option value="female">Female</option>
//       </select>

//       <button onClick={handleApply}>Apply Filters</button>
//     </div>
//   );
// }
