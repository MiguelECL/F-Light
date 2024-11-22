import { Container } from "@mui/material";
import ParsedOffer from "../../interfaces/ParsedOffer";

const PriceBreakdown = ({offer}: {offer:ParsedOffer}) => {

    return ( 
        <Container>
            <h2>Price Breakdown</h2>
            <h3>{`Base: ${offer.basePrice}`}</h3>
            <div><h3>Fees</h3> 
                {offer.fees.map((fee:any, index:number) => { 
                    if(fee.amount != 0){
                        return (
                            <h4 key={index}>{`${fee.type} - ${fee.amount}`}</h4>
                        )
                    }
                })}
            </div>
            <h3>{"Total: " + offer.totalPrice}</h3>
            <Container>
                <h2>Per Traveler</h2>
                <h3>{offer.perTravelerPrice}</h3>
            </Container>
        </Container>
    );
}
 
export default PriceBreakdown;