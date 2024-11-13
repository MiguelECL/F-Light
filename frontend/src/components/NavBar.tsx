import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <div>
            <h1><Link to="/">F-Light</Link></h1>
            <div>
                <Link to="/about">About</Link>
            </div>
        </div>
    );
}


export default NavBar;