import { useHistory } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import TestSessionContext from '../context/TestSession/TestSessionContext';
import { PROXY } from '../App';

const VideoPlayer = () => {
  const history = useHistory();
  const testSessionContext = useContext(TestSessionContext);
  const [ isLoading, setIsLoading ] = useState(true);

  const {
    pvs,
    current_pvs_array_id,
    getTestSession
  } = testSessionContext;

  useEffect(() => {
    getTestSession().then(() => {
      setIsLoading(false);
    });
  }, []);

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
      {!isLoading &&
        (
          <div>
            <h2 className="instruction-header">Wideo nr {current_pvs_array_id + 1}</h2>
            <video id="video-player" controls onClick={playVideo} onPlay={hideControls} onEnded={redirectToRatingPage}>
              <source
                src={`${PROXY}/api/video/${pvs[current_pvs_array_id].path}`}
                type="video/mp4" />
            </video>
          </div>
        )}
    </div>
  );
};

export default VideoPlayer;