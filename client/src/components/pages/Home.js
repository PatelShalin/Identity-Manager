import React, { useContext, useEffect } from 'react';
import Presences from '../presences/Presences';
import PresenceForm from '../presences/PresenceForm';
import PresenceFilter from '../presences/PresenceFilter';
import AuthContext from '../../context/auth/authContext';

export const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="grid-2">
      <div>
        <PresenceForm />
      </div>
      <div>
        <PresenceFilter />
        <Presences />
      </div>
    </div>
  );
};

export default Home;
