import { Container } from "@mui/material";

const PriceBreakdown = () => {
    return ( 
        <Container>
            <h2>Price Breakdown</h2>
            <h3>{"Base: "}</h3>
            <h3>{"Fees: "}</h3>
            <h3>{"Total: "}</h3>
            <Container>
                <h2>Per Traveler</h2>
            </Container>
        </Container>
    );
}
 
export default PriceBreakdown;