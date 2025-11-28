import React, { useState } from 'react';

const CuratorPanel = ({ artworks, setArtworks }) => {
  const [exhibitions, setExhibitions] = useState([
    {
      id: 1,
      title: 'Masters of Renaissance',
      description: 'A collection of Renaissance masterpieces',
      startDate: '2024-02-01',
      endDate: '2024-04-30',
      artworks: [2],
      status: 'active'
    }
  ]);

  const [newExhibition, setNewExhibition] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    selectedArtworks: []
  });

  const [insights, setInsights] = useState({});

  const handleExhibitionChange = (e) => {
    const { name, value } = e.target;
    setNewExhibition({ ...newExhibition, [name]: value });
  };

  const toggleArtworkSelection = (artworkId) => {
    const selected = newExhibition.selectedArtworks;
    if (selected.includes(artworkId)) {
      setNewExhibition({
        ...newExhibition,
        selectedArtworks: selected.filter(id => id !== artworkId)
      });
    } else {
      setNewExhibition({
        ...newExhibition,
        selectedArtworks: [...selected, artworkId]
      });
    }
  };

  const createExhibition = (e) => {
    e.preventDefault();
    if (!newExhibition.title || !newExhibition.startDate) {
      alert('Please fill in required fields');
      return;
    }

    const exhibition = {
      ...newExhibition,
      id: Date.now(),
      artworks: newExhibition.selectedArtworks,
      status: 'active'
    };

    setExhibitions([...exhibitions, exhibition]);
    setNewExhibition({
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      selectedArtworks: []
    });
    alert('Exhibition created successfully!');
  };

  const addInsight = (artworkId, insight) => {
    setInsights({
      ...insights,
      [artworkId]: insight
    });
    alert('Insight added successfully!');
  };

  const getArtworksByIds = (ids) => {
    return artworks.filter(art => ids.includes(art.id));
  };

  return (
    <div className="dashboard">
      <h2>Curator Panel</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>{exhibitions.length}</h3>
          <p>Total Exhibitions</p>
        </div>
        <div className="stat-card">
          <h3>{exhibitions.filter(e => e.status === 'active').length}</h3>
          <p>Active Exhibitions</p>
        </div>
        <div className="stat-card">
          <h3>{Object.keys(insights).length}</h3>
          <p>Artwork Insights</p>
        </div>
        <div className="stat-card">
          <h3>{artworks.length}</h3>
          <p>Artworks to Curate</p>
        </div>
      </div>

      <div className="dashboard-section">
        <h3>Create New Exhibition</h3>
        <form onSubmit={createExhibition}>
          <div className="form-group">
            <label>Exhibition Title *</label>
            <input 
              type="text" 
              name="title"
              value={newExhibition.title}
              onChange={handleExhibitionChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea 
              name="description"
              value={newExhibition.description}
              onChange={handleExhibitionChange}
              rows="3"
            />
          </div>
          <div className="form-group">
            <label>Start Date *</label>
            <input 
              type="date" 
              name="startDate"
              value={newExhibition.startDate}
              onChange={handleExhibitionChange}
              required
            />
          </div>
          <div className="form-group">
            <label>End Date</label>
            <input 
              type="date" 
              name="endDate"
              value={newExhibition.endDate}
              onChange={handleExhibitionChange}
            />
          </div>
          <div className="form-group">
            <label>Select Artworks</label>
            <div style={{ maxHeight: '200px', overflow: 'auto', border: '1px solid #ddd', padding: '1rem' }}>
              {artworks.map(artwork => (
                <div key={artwork.id} style={{ marginBottom: '0.5rem' }}>
                  <label>
                    <input 
                      type="checkbox"
                      checked={newExhibition.selectedArtworks.includes(artwork.id)}
                      onChange={() => toggleArtworkSelection(artwork.id)}
                    />
                    {artwork.title} by {artwork.artist}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <button type="submit" className="btn">Create Exhibition</button>
        </form>
      </div>

      <div className="dashboard-section">
        <h3>Current Exhibitions</h3>
        <div className="artwork-list">
          {exhibitions.map(exhibition => (
            <div key={exhibition.id} className="artwork-item">
              <div>
                <strong>{exhibition.title}</strong>
                <p>{exhibition.description}</p>
                <p>Artworks: {getArtworksByIds(exhibition.artworks).map(art => art.title).join(', ')}</p>
                <p>Duration: {exhibition.startDate} to {exhibition.endDate || 'Ongoing'}</p>
              </div>
              <div>
                <span className={`status ${exhibition.status}`}>{exhibition.status}</span>
                <button className="btn">Edit</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="dashboard-section">
        <h3>Artwork Insights</h3>
        <div className="artwork-list">
          {artworks.map(artwork => (
            <div key={artwork.id} className="artwork-item">
              <div>
                <strong>{artwork.title}</strong> by {artwork.artist}
                {insights[artwork.id] && (
                  <p style={{ fontStyle: 'italic', color: '#666' }}>
                    Insight: {insights[artwork.id]}
                  </p>
                )}
              </div>
              <div>
                <button 
                  className="btn"
                  onClick={() => {
                    const insight = prompt('Add your curatorial insight:');
                    if (insight) addInsight(artwork.id, insight);
                  }}
                >
                  Add Insight
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CuratorPanel;