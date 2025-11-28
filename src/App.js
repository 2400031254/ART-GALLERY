import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Gallery from './components/Gallery';
import AdminPanel from './components/AdminPanel';
import ArtistDashboard from './components/ArtistDashboard';
import CuratorPanel from './components/CuratorPanel';
import VirtualTour from './components/VirtualTour';
import { artworksData } from './data/artworks';

function App() {
  const [currentUser, setCurrentUser] = useState({ role: 'visitor', name: 'Guest' });
  const [currentView, setCurrentView] = useState('gallery');
  const [artworks, setArtworks] = useState(artworksData);
  const [cart, setCart] = useState([]);

  const switchRole = (role) => {
    setCurrentUser({ ...currentUser, role });
    setCurrentView(role === 'admin' ? 'admin' : role === 'artist' ? 'artist' : role === 'curator' ? 'curator' : 'gallery');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'admin':
        return <AdminPanel artworks={artworks} setArtworks={setArtworks} />;
      case 'artist':
        return <ArtistDashboard artworks={artworks} setArtworks={setArtworks} />;
      case 'curator':
        return <CuratorPanel artworks={artworks} setArtworks={setArtworks} />;
      case 'tour':
        return <VirtualTour artworks={artworks} />;
      default:
        return <Gallery artworks={artworks} currentUser={currentUser} cart={cart} setCart={setCart} />;
    }
  };

  return (
    <div className="App">
      <Header 
        currentUser={currentUser} 
        switchRole={switchRole}
        setCurrentView={setCurrentView}
        currentView={currentView}
        cart={cart}
        setCart={setCart}
      />
      {renderContent()}
    </div>
  );
}

export default App;