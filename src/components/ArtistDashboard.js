import React, { useState } from 'react';

const ArtistDashboard = ({ artworks, setArtworks }) => {
  const [newArtwork, setNewArtwork] = useState({
    title: '',
    artist: 'Current Artist',
    year: new Date().getFullYear(),
    description: '',
    culturalHistory: '',
    price: '',
    category: ''
  });

  const [sales] = useState([
    { id: 1, artwork: 'Starry Night', buyer: 'John Doe', amount: 50000000, date: '2024-01-15' },
    { id: 2, artwork: 'Mona Lisa', buyer: 'Jane Smith', amount: 100000000, date: '2024-01-10' }
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewArtwork({ ...newArtwork, [name]: value });
  };

  const addArtwork = (e) => {
    e.preventDefault();
    if (!newArtwork.title || !newArtwork.price) {
      alert('Please fill in all required fields');
      return;
    }

    const artwork = {
      ...newArtwork,
      id: Date.now(),
      price: parseInt(newArtwork.price),
      image: "https://via.placeholder.com/300x400?text=New+Artwork"
    };

    setArtworks([...artworks, artwork]);
    setNewArtwork({
      title: '',
      artist: 'Current Artist',
      year: new Date().getFullYear(),
      description: '',
      culturalHistory: '',
      price: '',
      category: ''
    });
    alert('Artwork added successfully!');
  };

  const myArtworks = artworks.filter(art => art.artist === 'Current Artist' || art.artist === newArtwork.artist);
  const totalRevenue = sales.reduce((sum, sale) => sum + sale.amount, 0);

  return (
    <div className="dashboard">
      <h2>Artist Dashboard</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>{myArtworks.length}</h3>
          <p>My Artworks</p>
        </div>
        <div className="stat-card">
          <h3>{sales.length}</h3>
          <p>Total Sales</p>
        </div>
        <div className="stat-card">
          <h3>${totalRevenue.toLocaleString()}</h3>
          <p>Total Revenue</p>
        </div>
        <div className="stat-card">
          <h3>85%</h3>
          <p>Commission Rate</p>
        </div>
      </div>

      <div className="dashboard-section">
        <h3>Upload New Artwork</h3>
        <form onSubmit={addArtwork}>
          <div className="form-group">
            <label>Title *</label>
            <input 
              type="text" 
              name="title"
              value={newArtwork.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Year</label>
            <input 
              type="number" 
              name="year"
              value={newArtwork.year}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select 
              name="category"
              value={newArtwork.category}
              onChange={handleInputChange}
            >
              <option value="">Select Category</option>
              <option value="Renaissance">Renaissance</option>
              <option value="Impressionism">Impressionism</option>
              <option value="Post-Impressionism">Post-Impressionism</option>
              <option value="Modern">Modern</option>
              <option value="Contemporary">Contemporary</option>
            </select>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea 
              name="description"
              value={newArtwork.description}
              onChange={handleInputChange}
              rows="3"
            />
          </div>
          <div className="form-group">
            <label>Cultural History</label>
            <textarea 
              name="culturalHistory"
              value={newArtwork.culturalHistory}
              onChange={handleInputChange}
              rows="3"
            />
          </div>
          <div className="form-group">
            <label>Price ($) *</label>
            <input 
              type="number" 
              name="price"
              value={newArtwork.price}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="btn">Upload Artwork</button>
        </form>
      </div>

      <div className="dashboard-section">
        <h3>My Artworks</h3>
        <div className="artwork-list">
          {myArtworks.map(artwork => (
            <div key={artwork.id} className="artwork-item">
              <div>
                <strong>{artwork.title}</strong> ({artwork.year}) - ${artwork.price.toLocaleString()}
              </div>
              <div>
                <button className="btn">Edit</button>
                <button className="btn">View Stats</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="dashboard-section">
        <h3>Sales History</h3>
        <div className="artwork-list">
          {sales.map(sale => (
            <div key={sale.id} className="artwork-item">
              <div>
                <strong>{sale.artwork}</strong> sold to {sale.buyer} on {sale.date}
              </div>
              <div>
                <strong>${sale.amount.toLocaleString()}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtistDashboard;