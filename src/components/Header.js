import React, { useState } from 'react';
import Cart from './Cart';

const Header = ({ currentUser, switchRole, setCurrentView, currentView, cart, setCart }) => {
  const [showCart, setShowCart] = useState(false);

  return (
    <header className="header">
      <div>
        <h1>Virtual Art Gallery</h1>
        <span>Welcome, {currentUser.name} ({currentUser.role})</span>
      </div>
      
      <div className="nav-buttons">
        <div className="role-selector">
          <button 
            className={`nav-btn ${currentUser.role === 'visitor' ? 'active' : ''}`}
            onClick={() => switchRole('visitor')}
          >
            Visitor
          </button>
          <button 
            className={`nav-btn ${currentUser.role === 'artist' ? 'active' : ''}`}
            onClick={() => switchRole('artist')}
          >
            Artist
          </button>
          <button 
            className={`nav-btn ${currentUser.role === 'curator' ? 'active' : ''}`}
            onClick={() => switchRole('curator')}
          >
            Curator
          </button>
          <button 
            className={`nav-btn ${currentUser.role === 'admin' ? 'active' : ''}`}
            onClick={() => switchRole('admin')}
          >
            Admin
          </button>
        </div>
        
        <button 
          className={`nav-btn ${currentView === 'gallery' ? 'active' : ''}`}
          onClick={() => setCurrentView('gallery')}
        >
          Gallery
        </button>
        <button 
          className={`nav-btn ${currentView === 'tour' ? 'active' : ''}`}
          onClick={() => setCurrentView('tour')}
        >
          Virtual Tour
        </button>
        <button 
          className="nav-btn"
          onClick={() => setShowCart(true)}
        >
          Cart ({cart.length})
        </button>
      </div>
      
      {showCart && (
        <Cart 
          cart={cart} 
          setCart={setCart} 
          onClose={() => setShowCart(false)} 
        />
      )}
    </header>
  );
};

export default Header;