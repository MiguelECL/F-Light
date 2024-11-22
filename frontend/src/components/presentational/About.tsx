import { Container } from "@mui/material";

const About = () => {
    return (  
        <Container maxWidth="sm" sx={{marginTop: 20}} className="AboutPage">
            <h1>About</h1>
            <p>
                F-Light is a flight-tracking application that leverages the <a target="blank" href="https://developers.amadeus.com/"> Amadeus API </a> 
                to track flight information such as pricing.
            </p>
            <a target="blank" href="https://github.com/MiguelECL/F-Light">GitHub</a>
        </Container>
    );
}
 
export default About;