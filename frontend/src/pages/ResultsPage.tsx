import { Button, Divider, List, ListItem, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { sampleResponse } from "../tests/SampleResponse";

const ResultsPage = () => {

    // const data = useFlightSearch(); //data is the results obtained from the fetch, an object array.
    const data = JSON.parse(sampleResponse);
    const navigate = useNavigate();

    const handleClick = (result: object) => {
        navigate("/details", result);   // use react router to route to this page while providing props.
    }

    return (
        <div>
            <Button onClick={() => navigate("/")} variant="contained"> &lt; Return to Search</Button>
            <List>
                {
                    data.data.map((result: any, index: any) => (
                        <div key={index} >
                            <Button onClick={() => {handleClick(result)}}>
                            <ListItem>
                                <ListItemText 
                                    primary={`Offer ${index + 1}`}
                                    secondary={result.itineraries[0].segments[0].departure.iataCode + " - " + result.itineraries[0].segments[1].arrival.iataCode

                                    }
                                />
                                <ListItemText
                                    primary={`Duration: ${result.itineraries[0].duration}`} 
                                    secondary={`Operated by: ${result.itineraries[0].segments[0].operating.carrierCode}`}
                                />
                                <ListItemText id="TotalPrice" 
                                    primary={result.price.total}
                                    secondary={"Total"}
                                />
                                <ListItemText id="PricePerTraveler" 
                                    primary={result.travelerPricings[0].price.total}
                                    secondary={"Per Traveler"}
                                />

                            </ListItem>
                            <Divider />
                            </Button>
                        </div>
                    ))
                }
            </List>

        </div>
    );
}
 
export default ResultsPage;