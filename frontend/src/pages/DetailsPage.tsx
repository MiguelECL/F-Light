import { useLocation } from "react-router-dom";

const DetailsPage = () => {
    const location = useLocation();
    const result = location.state || {};

    return (  
        <div>
            <h1>Details</h1>

        </div>
    );
}
 
export default DetailsPage;