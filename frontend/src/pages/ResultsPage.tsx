import { Button, Divider, List, ListItem, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ResultsItem from "../components/ResultsItem";

const ResultsPage = () => {

    const navigate = useNavigate();

    return (
        <div>
            <Button onClick={() => navigate("/")} variant="contained"> &lt; Return to Search</Button>
            <Stack>
                {/* A mapping is intended to go here, so that for every result there is a container displayed */}
                <ResultsItem />
                <ResultsItem />
                <ResultsItem />
            </Stack>

        </div>
    );
}
 
export default ResultsPage;