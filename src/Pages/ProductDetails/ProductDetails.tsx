import { useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "../../Redux/Features/product.Api";
import ReactStars from "react-stars";
import { useState } from "react";
import { useAppDispatch } from "../../Redux/hooks";
import { addToCart } from "../../Redux/Features/cart/cartSlice";
// import  './index.css';

const ProductDetails = () => {
  const { id } = useParams();
  const { data } = useGetSingleProductQuery(id);
  const product = data?.data;
  console.log(data?.data);

  const dispatch = useAppDispatch();
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        productId: product._id,
        name: product.title,
        image: product.image,
        price: product.price,
        quantity: 1,
        available: product.quantity,
      })
    );
    setAddedToCart(true);
  };

  window.addEventListener('beforeunload', function (e) {
    const confirmationMessage = "Your progress will be lost if you leave this page.";
    
    e.returnValue = confirmationMessage; 
    return confirmationMessage;          
});


  return (
    <div className="min-h-[69vh]">
      <div className="max-w-7xl card lg:card-side bg-base-100 shadow-xl mt-24 ">
        <div className="flex-1 ">
          <figure>
            <img className="h-full" src={data?.data?.image} alt="Album" />
          </figure>
        </div>
        <div className="card-body flex-1">
          <h2 className="card-title">{data?.data?.category}</h2>
          <h2 className="card-title">{data?.data?.title}</h2>
          <h2 className="card-title">${data?.data?.price}</h2>
          <h2 className="card-title">Available: {data?.data?.quantity}</h2>
          <ReactStars
            count={5}
            value={data?.data?.rating}
            edit={false} 
            size={24}
            color2={'#03AED2'}
          />
          <p>{data?.data?.description}</p>
          <div className="card-actions">
            <button 
              onClick={handleAddToCart} 
              className="new-btn" 
              disabled={data?.data?.quantity === 0} // Disable if quantity is 0
            >
              {addedToCart ? "Added to cart" : "Add To Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
