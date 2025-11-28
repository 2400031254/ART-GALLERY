import React, { useState } from 'react';

const AdminPanel = ({ artworks, setArtworks }) => {
  const [users] = useState([
    { id: 1, name: 'John Artist', role: 'artist', status: 'active' },
    { id: 2, name: 'Jane Curator', role: 'curator', status: 'active' },
    { id: 3, name: 'Bob Visitor', role: 'visitor', status: 'active' }
  ]);

  const [settings, setSettings] = useState({
    galleryName: 'Virtual Art Gallery',
    commissionRate: 15,
    allowPurchases: true,
    maintenanceMode: false
  });

  const deleteArtwork = (id) => {
    if (window.confirm('Are you sure you want to delete this artwork?')) {
      setArtworks(artworks.filter(art => art.id !== id));
    }
  };

  const updateSettings = (key, value) => {
    setSettings({ ...settings, [key]: value });
  };

  const stats = {
    totalArtworks: artworks.length,
    totalUsers: users.length,
    totalRevenue: artworks.reduce((sum, art) => sum + art.price, 0),
    activeUsers: users.filter(u => u.status === 'active').length
  };

  return (
    <div className="dashboard">
      <h2>Admin Dashboard</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>{stats.totalArtworks}</h3>
          <p>Total Artworks</p>
        </div>
        <div className="stat-card">
          <h3>{stats.totalUsers}</h3>
          <p>Total Users</p>
        </div>
        <div className="stat-card">
          <h3>${stats.totalRevenue.toLocaleString()}</h3>
          <p>Total Value</p>
        </div>
        <div className="stat-card">
          <h3>{stats.activeUsers}</h3>
          <p>Active Users</p>
        </div>
      </div>

      <div className="dashboard-section">
        <h3>Gallery Settings</h3>
        <div className="form-group">
          <label>Gallery Name</label>
          <input 
            type="text" 
            value={settings.galleryName}
            onChange={(e) => updateSettings('galleryName', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Commission Rate (%)</label>
          <input 
            type="number" 
            value={settings.commissionRate}
            onChange={(e) => updateSettings('commissionRate', parseInt(e.target.value))}
          />
        </div>
        <div className="form-group">
          <label>
            <input 
              type="checkbox" 
              checked={settings.allowPurchases}
              onChange={(e) => updateSettings('allowPurchases', e.target.checked)}
            />
            Allow Purchases
          </label>
        </div>
        <div className="form-group">
          <label>
            <input 
              type="checkbox" 
              checked={settings.maintenanceMode}
              onChange={(e) => updateSettings('maintenanceMode', e.target.checked)}
            />
            Maintenance Mode
          </label>
        </div>
      </div>

      <div className="dashboard-section">
        <h3>User Management</h3>
        <div className="artwork-list">
          {users.map(user => (
            <div key={user.id} className="artwork-item">
              <div>
                <strong>{user.name}</strong> - {user.role} ({user.status})
              </div>
              <div>
                <button className="btn">Edit</button>
                <button className="btn btn-danger">Suspend</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="dashboard-section">
        <h3>Artwork Management</h3>
        <div className="artwork-list">
          {artworks.map(artwork => (
            <div key={artwork.id} className="artwork-item">
              <div>
                <strong>{artwork.title}</strong> by {artwork.artist} - ${artwork.price.toLocaleString()}
              </div>
              <div>
                <button className="btn">Edit</button>
                <button 
                  className="btn btn-danger"
                  onClick={() => deleteArtwork(artwork.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;