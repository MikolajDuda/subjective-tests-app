import { useHistory } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import TestSessionContext from '../context/TestSession/TestSessionContext';
import { PROXY } from '../App';

const VideoPlayer = () => {
  const history = useHistory();
  const testSessionContext = useContext(TestSessionContext);
  const [ isLoading, setIsLoading ] = useState(true);
  let videoSrc;

  const {
    pvs,
    current_pvs_array_id,
    instructional_video_path,
    instruction_played,
    markInstructionAsPlayed,
    getTestSession
  } = testSessionContext;

  useEffect(() => {
    getTestSession().then(() => {
      console.log('instructional_video_path', instructional_video_path);
      // videoSrc = instruction_played ? `${PROXY}/api/video/${pvs[current_pvs_array_id].path}` : `${PROXY}/api/video/${instructional_video_path}`;
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
    if (!instruction_played) {
      markInstructionAsPlayed();
    } else {
      history.push('/rate');
    }
  };

  const redirectToTest = () => {
    history.push('/video-player')
  }

  return (
    <div className="video-player">
      {!isLoading &&
        (
          <div>
            {!instruction_played ? <h2 className="instruction-header">Instrukcja</h2> : ''}
            <video id="video-player" controls onClick={playVideo} onPlay={hideControls} onEnded={redirectToRatingPage}>
              <source
                src={instruction_played ? `${PROXY}/api/video/${pvs[current_pvs_array_id].path}` : `${PROXY}/api/video/${instructional_video_path}`}
                type="video/mp4"/>
            </video>
            {!instruction_played ? <button className="button instruction-button" onClick={redirectToTest}>Rozpocznij test</button> : ''}
          </div>
        )}
    </div>
  );
};

export default VideoPlayer;