import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <div id="navbar">
        <div id="nav__con">
          <h1 id="logo">
            <Link to="/">Ben Todo</Link>
          </h1>

          <nav>
            <ul>
              <Link to="/">Home</Link>
              <Link to="https://www.ceelyrics.com/" target="_blank">
                More
              </Link>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
