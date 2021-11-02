import { Link } from 'react-router-dom';

const VideoPlayer = ({ url: videoUrl }) => {
  // TODO: pobierać też informacje o wideo, które będzie można przekazać np. w type
  return (
    <div className="video-player">
      <video controls>
        <source src={ videoUrl } type="video/mp4" />
      </video>
      <Link to="rate"><button className="button">Go to rate video</button></Link>
    </div>
  );
};

export default VideoPlayer;