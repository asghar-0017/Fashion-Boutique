import PropTypes from "prop-types";
import clsx from "clsx";

const SectionTitleWithText = ({ spaceTopClass, spaceBottomClass }) => {
  return (
    <div className={clsx("welcome-area", spaceTopClass, spaceBottomClass)}>
      <div className="container">
        <div className="welcome-content text-center">
          <h5>Who Are We</h5>
          <h1>Welcome To Needs and Luxuries</h1>
          <p>
            **Needs and Luxuries** is where timeless elegance meets everyday
            comfort. Our brand is dedicated to crafting high-quality women’s
            clothing that balances sophisticated design with practical
            wearability. Whether you're looking for sleek, tailored pieces for
            the office or soft, relaxed styles for the weekend, our collections
            offer versatile options to suit your lifestyle. From luxurious
            fabrics to thoughtful details, every item is designed with modern
            women in mind—those who seek both fashion-forward aesthetics and
            functional pieces. At **Needs and Luxuries**, we believe that women
            should feel effortlessly chic no matter the occasion.
          </p>
        </div>
      </div>
    </div>
  );
};

SectionTitleWithText.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default SectionTitleWithText;
