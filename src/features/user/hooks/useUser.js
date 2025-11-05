// src/features/users/hooks/useUser.js
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersRequest } from "../userSlice";
import {
  selectAllUsers,
  selectUsersLoading,
  selectUsersError,
} from "../userSelector";

export function useUser(autoFetch = true) {
  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);
  const loading = useSelector(selectUsersLoading);
  const error = useSelector(selectUsersError);
  
  // ✅ store filters locally in this hook
 // const [filters, setFilters] = useState({});
  const [filters, setFilters] = useState({
  gender: "",
  country: "",
  search: "",
});


  // ✅ function to trigger data fetching manually
  const fetchUsers = useCallback(
    (newFilters = filters) => {
      setFilters(newFilters);
      dispatch(fetchUsersRequest(newFilters));
    },
    [dispatch, filters]
  );

  // ✅ Auto fetch users when the hook is mounted
  useEffect(() => {
    if (autoFetch) {
      dispatch(fetchUsersRequest(filters));
    }
  }, [dispatch, autoFetch, filters]);

  return {
    users,
    loading,
    error,
    filters,
    setFilters,
    fetchUsers,
  };
}
