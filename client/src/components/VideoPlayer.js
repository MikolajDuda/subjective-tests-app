import { useHistory } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import TestSessionContext from '../context/testSession/TestSessionContext';
import { PROXY } from '../App';

const VideoPlayer = () => {
  const history = useHistory();
  const testSessionContext = useContext(TestSessionContext);
  const [ videoUrl, setVideoUrl ] = useState('');

  const { path, videos, currentVideoId } = testSessionContext;

  useEffect(() => {
    const url = `${PROXY}/api/video/${path}${videos[currentVideoId].path}`;
    setVideoUrl(url);
  }, [ testSessionContext ]);

  const hideControls = () => {
    const player = document.getElementById("video-player");
    player.requestFullscreen();
    document.getElementById('video-player').controls = false;
  };

  const playVideo = () => {
    const player = document.getElementById("video-player");
    player.play();
  };

  document.addEventListener('fullscreenchange', () => {
    const player = document.getElementById("video-player");
    if (player !== null && !player.paused) {
      player.pause();
    }
  });

  const redirectToRatingPage = () => {
    history.push('/rate');
  };

  return (
    <div className="video-player">
      {videoUrl && (
        <video id="video-player" controls onClick={playVideo} onPlay={hideControls} onEnded={redirectToRatingPage}>
          <source src={videoUrl} type="video/mp4" />
        </video>
      )}
    </div>
  );
};

export default VideoPlayer;