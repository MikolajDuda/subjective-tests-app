import { Link, useHistory } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import TestSessionContext from '../context/testSession/TestSessionContext';

const VideoPlayer = ({ url: videoUrl }) => {
  // TODO: pobierać też informacje o wideo, które będzie można przekazać np. w type
  const history = useHistory();
  const testSessionContext = useContext(TestSessionContext);
  videoUrl = `localhost:3001/api/video/${testSessionContext.path}${testSessionContext.videos[0].path}`;

  const hideControls = () => {
    const player = document.getElementById("video-player");
    player.requestFullscreen();
    document.getElementById('video-player').controls = false;
  };

  const playVideo = () => {
    const player = document.getElementById("video-player");
    player.play();
    // if (player.paused) {
    //   player.play();
    // }
  };

  document.addEventListener('fullscreenchange', () => {
    const player = document.getElementById("video-player");
    if (!player.paused) {
      player.pause();
    }
  });

  const redirectToRatingPage = () => {
    history.push('/rate');
  };

  return (
    <div className="video-player">
      <video id="video-player" controls onClick={playVideo} onPlay={hideControls} onEnded={redirectToRatingPage}>
        <source src={videoUrl} type="video/mp4" />
      </video>
    </div>
  );
};

export default VideoPlayer;