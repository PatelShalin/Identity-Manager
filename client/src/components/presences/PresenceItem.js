import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import PresenceContext from '../../context/presences/presenceContext';

export const PresenceItem = ({ presence }) => {
  const presenceContext = useContext(PresenceContext);

  const { deletePresence, setCurrent, clearCurrent } = presenceContext;

  const { _id, address, username, email, password, type } = presence;

  const onDelete = () => {
    deletePresence(_id);
    clearCurrent();
  };

  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {username}{' '}
        <span
          style={{ float: 'right' }}
          className={
            'badge ' +
            (type === 'professional' ? 'badge-success' : 'badge-primary')
          }
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className="list">
        {address && (
          <li>
            <i className="fas fa-link"></i>
            {' ' + address}
          </li>
        )}
        {email && (
          <li>
            <i className="fas fa-envelope-open"></i>
            {' ' + email}
          </li>
        )}
        {password && (
          <li>
            <i className="fas fa-key"></i>
            {' ' + password}
          </li>
        )}
      </ul>
      <p>
        <button
          className="btn btn-dark btn-sm"
          onClick={() => setCurrent(presence)}
        >
          Edit
        </button>
        <button className="btn btn-danger btn-sm" onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

PresenceItem.propTypes = {
  presence: PropTypes.object.isRequired
};

export default PresenceItem;
