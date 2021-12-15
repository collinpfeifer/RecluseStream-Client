import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStreams } from '../../actions';
import { motion } from 'framer-motion';

const StreamList = ({ fetchStreams, streams, currentUserId, isSignedIn }) => {
  useEffect(() => {
    fetchStreams();
  }, []);

  const renderButtons = (stream) => {
    if (stream.userId === currentUserId) {
      return (
        <div className='right floated content'>
          <Link to={`/streams/edit/${stream.id}`} className='ui button primary'>
            Edit
          </Link>
          <Link
            to={`/streams/delete/${stream.id}`}
            className='ui button negative'>
            Delete
          </Link>
        </div>
      );
    }
  };

  const renderCreate = () => {
    console.log(isSignedIn);
    if (isSignedIn) {
      return (
        <div style={{ textAlign: 'right' }}>
          <Link to='/streams/new' className='ui button primary'>
            Create Stream
          </Link>
        </div>
      );
    }
  };

  const renderList = () => {
    return streams.map((stream) => {
      return (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ rotate: 360, scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}>
          <div className='item' key={stream.id}>
            {renderButtons(stream)}
            <i className='large middle alinged icon camera' />
            <div className='content'>
              <Link to={`/streams/${stream.id}`}>{stream.title}</Link>
              <div className='description'>{stream.description}</div>
            </div>
          </div>
        </motion.div>
      );
    });
  };

  return (
    <div>
      <h2>Streams</h2>
      <div className='ui celled list'>{renderList()}</div>
      {renderCreate()}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);
