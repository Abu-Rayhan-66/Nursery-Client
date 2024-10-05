import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';


const Banner = () => {
  return (
    <div className="w-full">
      <Carousel showArrows={true} >
        <div>
          <img
            src="https://i.ibb.co.com/CVMGRPk/archery-range.jpg"
            alt="Archery Range"
            className="w-full  object-cover"
          />
        </div>
        <div>
          <img
            src="https://i.ibb.co.com/JRDtbvs/Screenshot-4.png"
            alt="Team Sports"
            className="w-full  object-cover"
          />
        </div>
        <div>
          <img
            src="https://i.ibb.co.com/GtkvGqv/why-do-they-sprinkle-football-pitches.jpg"
            alt="Football Pitch"
            className="w-full  object-cover"
          />
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;

