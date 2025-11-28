import React, { useState, useEffect } from 'react';

const VirtualTour = ({ artworks }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [tourMode, setTourMode] = useState('guided'); // guided or self-paced

  const currentArtwork = artworks[currentIndex];

  useEffect(() => {
    let interval;
    if (isPlaying && tourMode === 'guided') {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % artworks.length);
      }, 10000); // Change artwork every 10 seconds
    }
    return () => clearInterval(interval);
  }, [isPlaying, tourMode, artworks.length]);

  const nextArtwork = () => {
    setCurrentIndex((prev) => (prev + 1) % artworks.length);
  };

  const prevArtwork = () => {
    setCurrentIndex((prev) => (prev - 1 + artworks.length) % artworks.length);
  };

  const goToArtwork = (index) => {
    setCurrentIndex(index);
  };

  if (!currentArtwork) {
    return <div className="virtual-tour">No artworks available for tour</div>;
  }

  return (
    <div className="virtual-tour">
      <div className="tour-header" style={{ marginBottom: '2rem' }}>
        <h2>Virtual Gallery Tour</h2>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'center' }}>
          <button 
            className={`btn ${tourMode === 'guided' ? 'active' : ''}`}
            onClick={() => setTourMode('guided')}
          >
            Guided Tour
          </button>
          <button 
            className={`btn ${tourMode === 'self-paced' ? 'active' : ''}`}
            onClick={() => setTourMode('self-paced')}
          >
            Self-Paced
          </button>
          {tourMode === 'guided' && (
            <button 
              className="btn"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? 'Pause' : 'Play'} Tour
            </button>
          )}
        </div>
      </div>

      <div className="tour-artwork">
        <div style={{ 
          marginBottom: '2rem',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
        }}>
          <img 
            src={currentArtwork.image} 
            alt={currentArtwork.title}
            style={{ 
              width: '100%', 
              height: '400px', 
              objectFit: 'contain',
              background: '#2c3e50'
            }}
          />
        </div>

        <div style={{ textAlign: 'left', maxWidth: '600px', margin: '0 auto' }}>
          <h3>{currentArtwork.title}</h3>
          <p><strong>Artist:</strong> {currentArtwork.artist}</p>
          <p><strong>Year:</strong> {currentArtwork.year}</p>
          <p><strong>Category:</strong> {currentArtwork.category}</p>
          
          <div style={{ margin: '1rem 0' }}>
            <h4>Description</h4>
            <p>{currentArtwork.description}</p>
          </div>

          <div className="cultural-info">
            <h4>Cultural & Historical Context</h4>
            <p>{currentArtwork.culturalHistory}</p>
          </div>

          <div style={{ 
            background: 'rgba(255,255,255,0.1)', 
            padding: '1rem', 
            borderRadius: '8px',
            marginTop: '1rem'
          }}>
            <h4>Audio Guide Transcript</h4>
            <p>
              Welcome to this magnificent piece. {currentArtwork.title} represents a significant 
              moment in art history. Created in {currentArtwork.year} by {currentArtwork.artist}, 
              this work showcases the {currentArtwork.category} movement's distinctive characteristics. 
              {currentArtwork.culturalHistory}
            </p>
          </div>
        </div>
      </div>

      <div className="tour-controls">
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <button className="btn" onClick={prevArtwork}>
            ← Previous
          </button>
          <span style={{ 
            background: 'rgba(255,255,255,0.2)', 
            padding: '0.5rem 1rem', 
            borderRadius: '4px' 
          }}>
            {currentIndex + 1} of {artworks.length}
          </span>
          <button className="btn" onClick={nextArtwork}>
            Next →
          </button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          {artworks.map((artwork, index) => (
            <button
              key={artwork.id}
              className={`btn ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToArtwork(index)}
              style={{ 
                minWidth: '40px',
                background: index === currentIndex ? '#e74c3c' : '#3498db'
              }}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <p>
            {tourMode === 'guided' 
              ? isPlaying 
                ? 'Guided tour in progress - artworks change automatically every 10 seconds'
                : 'Guided tour paused - click Play to continue'
              : 'Self-paced tour - navigate at your own speed'
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default VirtualTour;