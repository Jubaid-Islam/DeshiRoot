
import Banner from "./banner";
import ComparisonTable from "./ComparisonTable";
import CustomerFeedback from "./CustomerFeedback";
import DeliveryMap from "./DeliveryMap";
import Feature from "./Fearture";
import ProductGrid from "./ProductGrid";


const Home = () => {
    return (
        <div>
            <Banner />
            <Feature />
            <ProductGrid/>
            <ComparisonTable/>
            <DeliveryMap/>
            <CustomerFeedback/>
        </div>
    );
};

export default Home;