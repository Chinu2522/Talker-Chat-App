import bearImage from './bear.jpg';
import { useState } from 'react';

const EmptyChatContainer = () => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };
  
    return (
      <div className="flex-1 md:bg-[#1c1d25] md:flex flex-col justify-center items-center hidden duration-1000 transition-all">
        <div className="text-opacity-80 text-white flex flex-col gap-5 items-center mt-10 lg:text-4xl text-3xl transition-all duration-300 text-center">
          <h3 className="pacifico-regular">
            HII   <span className="text-purple-500">Welocme to our land!!!!</span>
          </h3>
          <div
            className="image-container"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img src={bearImage} alt="Image" className={isHovered ? 'image hovered' : 'image'} />
          </div>
        </div>
      </div>
    );
  };
export default EmptyChatContainer;
