import React, { useContext, useState, useEffect } from 'react';
import PresenceContext from '../../context/presences/presenceContext';

export const PresenceForm = () => {
  const presenceContext = useContext(PresenceContext);

  const {
    addPresence,
    current,
    clearCurrent,
    updatePresence
  } = presenceContext;

  useEffect(() => {
    if (current) {
      setPresence(current);
    } else {
      setPresence({
        address: '',
        username: '',
        email: '',
        password: '',
        type: 'personal'
      });
    }
  }, [presenceContext, current]);

  const [presence, setPresence] = useState({
    address: '',
    username: '',
    email: '',
    password: '',
    type: 'personal'
  });

  const { address, username, email, password, type } = presence;

  const onChange = e =>
    setPresence({ ...presence, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (current) {
      updatePresence(presence);
    } else {
      addPresence(presence);
    }
    setPresence({
      address: '',
      username: '',
      email: '',
      password: '',
      type: 'personal'
    });
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">
        {current ? 'Update Presence' : 'Add Presence'}
      </h2>
      <input
        type="text"
        placeholder="Address"
        name="address"
        value={address}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Username"
        name="username"
        value={username}
        onChange={onChange}
      />
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={email}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Password"
        name="password"
        value={password}
        onChange={onChange}
      />
      <h5>Contact Type</h5>
      <input
        type="radio"
        name="type"
        value="personal"
        checked={type === 'personal'}
        onChange={onChange}
      />
      Personal{' '}
      <input
        type="radio"
        name="type"
        value="professional"
        checked={type === 'professional'}
        onChange={onChange}
      />
      Professional
      <div>
        <input
          type="submit"
          value={current ? 'Update Presence' : 'Add Presence'}
          className="btn btn-primary btn-block"
        />
      </div>
      {current && (
        <div>
          <button className="btn btn-light btn-block" onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default PresenceForm;
