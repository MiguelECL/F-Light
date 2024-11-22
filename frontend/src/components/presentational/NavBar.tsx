import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Button><Link to="/"><h1>F-Light</h1></Link></Button>
                <Button><Link to="/about"><h2>About</h2></Link></Button>
            </Toolbar>
        </AppBar>
    );
}


export default NavBar;