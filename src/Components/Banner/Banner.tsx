import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';


const Banner = () => {
  return (
    <div className="w-full">
      <Carousel showArrows={true} >
        
        <div>
          <img
            src="https://i.ibb.co.com/gmxrH0h/popular-potted-houseplants-white-background-53876-127000-rawpixel.jpg"
            alt="Team Sports"
            className=" w-full  object-cover"
          />
        </div>
        <div>
          <img
            src="https://i.ibb.co.com/8D5vZfs/air-purifying-plants-0-1200.jpg"
            alt="Football Pitch"
            className="w-full  object-cover"
          />
        </div>
        <div>
          <img
            src="https://i.ibb.co.com/5Lq3PG9/unnamed.jpg"
            alt="Archery Range"
            className="w-full  object-cover"
          />
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;

