import PropTypes from "prop-types";
import clsx from "clsx";
import { Link } from "react-router-dom";

const Logo = ({ imageUrl, logoClass }) => {
  return (
    <div className={clsx(logoClass)}>
      <Link to={process.env.PUBLIC_URL + "/"}>
        {/* <img alt="" src={process.env.PUBLIC_URL + imageUrl} /> */}
        <h4 style={{fontWeight: "bold", color: "#313131"}}>Needs and Luxuries</h4>
      </Link>
    </div>
  );
};

Logo.propTypes = {
  imageUrl: PropTypes.string,
  logoClass: PropTypes.string
};

export default Logo;
