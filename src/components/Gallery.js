import React, { useState } from 'react';

const Gallery = ({ artworks, currentUser, cart, setCart }) => {
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  const addToCart = (artwork) => {
    if (cart.find(item => item.id === artwork.id)) {
      alert('This artwork is already in your cart!');
      return;
    }
    setCart([...cart, artwork]);
    alert(`${artwork.title} added to cart!`);
  };

  const ArtworkModal = ({ artwork, onClose }) => (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '8px',
        maxWidth: '600px',
        maxHeight: '80vh',
        overflow: 'auto'
      }}>
        <h2>{artwork.title}</h2>
        <img 
          src={artwork.image} 
          alt={artwork.title}
          style={{ width: '100%', height: '300px', objectFit: 'contain', marginBottom: '1rem' }}
        />
        <p><strong>Artist:</strong> {artwork.artist}</p>
        <p><strong>Year:</strong> {artwork.year}</p>
        <p><strong>Category:</strong> {artwork.category}</p>
        <p><strong>Description:</strong> {artwork.description}</p>
        <div className="cultural-info">
          <h4>Cultural History</h4>
          <p>{artwork.culturalHistory}</p>
        </div>
        <p className="artwork-price">${artwork.price.toLocaleString()}</p>
        <div style={{ marginTop: '1rem' }}>
          <button className="btn" onClick={() => addToCart(artwork)}>
            Add to Cart
          </button>
          <button className="btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div style={{ padding: '1rem', background: 'white', margin: '1rem' }}>
        <h2>Art Gallery Collection</h2>
        {cart.length > 0 && (
          <p>Cart: {cart.length} items - Total: ${cart.reduce((sum, item) => sum + item.price, 0).toLocaleString()}</p>
        )}
      </div>
      
      <div className="gallery-grid">
        {artworks.map(artwork => (
          <div key={artwork.id} className="artwork-card">
            <img 
              src={artwork.image} 
              alt={artwork.title}
              className="artwork-image"
              style={{ width: '100%', height: '250px', objectFit: 'cover' }}
            />
            <div className="artwork-info">
              <div className="artwork-title">{artwork.title}</div>
              <div className="artwork-artist">by {artwork.artist} ({artwork.year})</div>
              <div className="artwork-price">${artwork.price.toLocaleString()}</div>
              <p>{artwork.description}</p>
              <button 
                className="btn" 
                onClick={() => setSelectedArtwork(artwork)}
              >
                View Details
              </button>
              <button 
                className="btn" 
                onClick={() => addToCart(artwork)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedArtwork && (
        <ArtworkModal 
          artwork={selectedArtwork} 
          onClose={() => setSelectedArtwork(null)} 
        />
      )}
    </div>
  );
};

export default Gallery;