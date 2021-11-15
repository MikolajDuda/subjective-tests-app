import { Link } from 'react-router-dom';

const VideoPlayer = ({ url: videoUrl }) => {
  // TODO: pobierać też informacje o wideo, które będzie można przekazać np. w type

  const hideControls = () => {
    document.getElementById('video-player').controls = false;
  }

  const showButton = () => {
    document.getElementById('rate-button').style.display = 'block';
    document.getElementById('video-player').style.display = 'none';
  }

  return (
    <div className="video-player">
      <video id="video-player" controls onPlay={hideControls} onEnded={showButton}>
        <source src={ videoUrl } type="video/mp4" />
      </video>
      <Link id="rate-button" style={ {display: "none"} } to="rate"><button className="button">Go to rate video</button></Link>
    </div>
  );
};

export default VideoPlayer;