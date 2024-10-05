import Banner from "../../Components/Banner/Banner";
import HomeProduct from "../../Components/HomeProdect/HomeProduct";
import { useGetProductQuery } from "../../Redux/Features/product.Api";




const Home = () => {

  const {data} = useGetProductQuery(undefined)
  console.log(data)
    return (
        <div>
         <Banner></Banner>
         <HomeProduct></HomeProduct>
        
        </div>
    );
};

export default Home;