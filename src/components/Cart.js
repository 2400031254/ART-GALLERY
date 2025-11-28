import React from 'react';

const Cart = ({ cart, setCart, onClose }) => {
  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const checkout = () => {
    alert(`Purchase completed! Total: $${total.toLocaleString()}`);
    setCart([]);
    onClose();
  };

  return (
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
        overflow: 'auto',
        width: '90%'
      }}>
        <h2>Shopping Cart ({cart.length} items)</h2>
        
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            {cart.map(item => (
              <div key={item.id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem',
                borderBottom: '1px solid #eee'
              }}>
                <div>
                  <strong>{item.title}</strong>
                  <p>by {item.artist}</p>
                  <p>${item.price.toLocaleString()}</p>
                </div>
                <button 
                  className="btn btn-danger"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
            
            <div style={{ marginTop: '1rem', textAlign: 'right' }}>
              <h3>Total: ${total.toLocaleString()}</h3>
            </div>
            
            <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
              <button className="btn" onClick={checkout}>
                Checkout
              </button>
              <button className="btn" onClick={onClose}>
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;