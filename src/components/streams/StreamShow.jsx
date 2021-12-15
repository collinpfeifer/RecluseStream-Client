import React, { useEffect, useRef } from 'react';
import flv from 'flv.js';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';

const StreamShow = ({ match, fetchStream, stream }) => {
  const videoStream = useRef(null);
  let player = null;

  useEffect(() => {
    fetchStream(match.params.id);
    buildPlayer();

    return () => {
      player.destroy();
    };
  }, []);

  useEffect(() => {
    buildPlayer();

    return () => {
      player.destroy();
    };
  }, [stream]);

  const buildPlayer = () => {
    if (player || !stream) {
      return;
    }

    player = flv.createPlayer({
      type: 'flv',
      url: `${process.env.REACT_APP_RMTP}/live/${match.params.id}.flv`,
    });
    player.attachMediaElement(videoStream.current);
    player.load();
  };

  const renderContent = () => {
    if (!stream) {
      return (
        <div className='ui segment'>
          <div className='ui active inverted dimmer'>
            <div className='ui text loader'>Loading</div>
          </div>
        </div>
      );
    }
    return (
      <div>
        <video ref={videoStream} style={{ width: '90%' }} controls />
        <h1>{stream.title}</h1>
        <h5>{stream.description}</h5>
      </div>
    );
  };

  return <div>{renderContent()}</div>;
};

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);
