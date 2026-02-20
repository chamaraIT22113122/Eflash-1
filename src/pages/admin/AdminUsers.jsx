import { useState, useEffect } from 'react';
import { getAllUsers, deleteUser } from '../../utils/authService';
import './AdminUsers.css';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    const allUsers = getAllUsers();
    setUsers(allUsers);
  };

  const handleDeleteUser = (email) => {
    if (window.confirm(`Are you sure you want to delete user ${email}?`)) {
      if (deleteUser(email)) {
        loadUsers();
      }
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesRole = filter === 'all' || user.role === filter;
    const matchesSearch = searchTerm === '' || 
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesRole && matchesSearch;
  });

  const stats = {
    total: users.length,
    admins: users.filter(u => u.role === 'admin').length,
    customers: users.filter(u => u.role === 'customer').length
  };

  return (
    <div className="admin-users">
      <div className="admin-users-header">
        <h1>User Management</h1>
      </div>

      <div className="users-stats">
        <div className="stat-card">
          <span className="stat-value">{stats.total}</span>
          <span className="stat-label">Total Users</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{stats.admins}</span>
          <span className="stat-label">Administrators</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{stats.customers}</span>
          <span className="stat-label">Customers</span>
        </div>
      </div>

      <div className="users-controls">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search users by email or name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="user-filters">
          <button
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            All Users
          </button>
          <button
            className={filter === 'admin' ? 'active' : ''}
            onClick={() => setFilter('admin')}
          >
            Admins
          </button>
          <button
            className={filter === 'customer' ? 'active' : ''}
            onClick={() => setFilter('customer')}
          >
            Customers
          </button>
        </div>
      </div>

      <div className="users-table-container">
        {filteredUsers.length === 0 ? (
          <div className="no-users">
            <p>No users found.</p>
          </div>
        ) : (
          <table className="users-table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Name</th>
                <th>Role</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={index}>
                  <td>{user.email}</td>
                  <td>{user.name || '-'}</td>
                  <td>
                    <span className={`role-badge role-${user.role}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}</td>
                  <td>
                    {user.email !== 'admin@eflash24.tech' && (
                      <button
                        className="btn-delete"
                        onClick={() => handleDeleteUser(user.email)}
                      >
                        Delete
                      </button>
                    )}
                    {user.email === 'admin@eflash24.tech' && (
                      <span className="protected-badge">Protected</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="users-note">
        <strong>Note:</strong> The default admin account (admin@eflash24.tech) is protected and cannot be deleted.
      </div>
    </div>
  );
};

export default AdminUsers;
