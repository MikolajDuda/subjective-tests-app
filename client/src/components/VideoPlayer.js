import { useHistory } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import TestSessionContext from '../context/TestSession/TestSessionContext';
import { PROXY } from '../App';

const VideoPlayer = () => {
  const history = useHistory();
  const testSessionContext = useContext(TestSessionContext);
  const [ isLoading, setIsLoading ] = useState(true);
  let instructionPlayed = false;

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
    console.log('redirectToRatingPage się wykonał')
    if (instruction_played) {
      history.push('/rate');
    } else {
      instructionPlayed = true;
    }
  };

  const redirectToTest = () => {
    if (instructionPlayed) {
      markInstructionAsPlayed();
      history.go(0);          // TODO: ogarnąć historię i odtwarzanie dobrych rzeczy po obejrzeniu instrukcji
    } else {
      alert('Przed rozpoczęciem testu należy obejrzeć instrukcję');
    }
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