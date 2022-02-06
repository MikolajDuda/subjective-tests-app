import { useHistory } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import TestSessionContext from '../context/TestSession/TestSessionContext';
import { PROXY } from '../App';

const InstructionPlayer = () => {
  const history = useHistory();
  const testSessionContext = useContext(TestSessionContext);
  const [ isLoading, setIsLoading ] = useState(true);
  let instructionPlayed = false;

  const {
    instructional_video_path,
    markInstructionAsPlayed,
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
    instructionPlayed = true;
  };

  const redirectToTest = () => {
    if (instructionPlayed) {
      markInstructionAsPlayed();
      history.push('/video-player');
    } else {
      alert('Przed rozpoczęciem testu należy obejrzeć instrukcję');
    }
  }

  return (
    <div className="video-player">
      {!isLoading &&
        (
          <div>
            <h2 className="instruction-header">Instrukcja</h2>
            <video id="video-player" controls onClick={playVideo} onPlay={hideControls} onEnded={redirectToRatingPage}>
              <source
                src={`${PROXY}/api/video/${instructional_video_path}`}
                type="video/mp4"/>
            </video>
            <button className="button instruction-button" onClick={redirectToTest}>Rozpocznij test</button>
          </div>
        )}
    </div>
  );
};

export default InstructionPlayer;