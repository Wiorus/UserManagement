import React, { ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { filterUsers } from '../features/users/usersSlice';

const SearchFilters: React.FC = () => {
  const dispatch = useDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(filterUsers({ [name]: value }));
  };

  return (
    <div className="search-filters">
      <input
        type="text"
        name="name"
        placeholder="Search by name"
        onChange={handleChange}
      />
      <input
        type="text"
        name="username"
        placeholder="Search by username"
        onChange={handleChange}
      />
      <input
        type="text"
        name="email"
        placeholder="Search by email"
        onChange={handleChange}
      />
      <input
        type="text"
        name="phone"
        placeholder="Search by phone"
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchFilters;
