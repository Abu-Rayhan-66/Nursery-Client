import Banner from "../../Components/Banner/Banner";
import HomeProduct from "../../Components/HomeProdect/HomeProduct";
import ImageGallery from "../../Components/ImageGallery/ImageGallery";
import { useGetProductQuery } from "../../Redux/Features/product.Api";
import Category from "../Category/Category";




const Home = () => {

  const {data} = useGetProductQuery(undefined)
  console.log(data)
    return (
        <div>
         <Banner></Banner>
         <HomeProduct></HomeProduct>
         <Category></Category>
         <ImageGallery></ImageGallery>
        
        </div>
    );
};

export default Home;