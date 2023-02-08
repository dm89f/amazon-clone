
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

function Banner() {
  return (
    <Carousel
      autoPlay
      infiniteLoop
      showStatus={true}
      showIndicators={false}
      showThumbs={false}
      interval={2000}
      
    >
      <div>
        <img src="/images/banner_1.jpg" alt="banner_1" />
      </div>
      <div>
        <img src="/images/banner_2.jpg" alt="banner_2" />
      </div>
      <div>
        <img src="/images/banner_3.jpg" alt="banner_3" />
      </div>
      <div>
        <img src="/images/banner_4.jpg" alt="banner_4" />
      </div>
      <div>
        <img src="/images/banner_4.jpg" alt="banner_5" />
      </div>

    </Carousel>
  )
}

export default Banner