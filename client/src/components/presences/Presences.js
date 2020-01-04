import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PresenceContext from '../../context/presences/presenceContext';
import PresenceItem from './PresenceItem';
import Spinner from '../layout/Spinner';

export const Presences = () => {
  const presenceContext = useContext(PresenceContext);

  const { presences, filtered, getPresences, loading } = presenceContext;

  useEffect(() => {
    getPresences();
    // eslint-disable-next-line
  }, []);

  if (presences !== null && presences.length === 0 && !loading) {
    return <h4>Please Add A Presence...</h4>;
  }

  return (
    <Fragment>
      {presences !== null && !loading ? (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map(presence => (
                <CSSTransition
                  key={presence._id}
                  timeout={500}
                  classNames="item"
                >
                  <PresenceItem presence={presence} />
                </CSSTransition>
              ))
            : presences.map(presence => (
                <CSSTransition
                  key={presence._id}
                  timeout={500}
                  classNames="item"
                >
                  <PresenceItem presence={presence} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Presences;
