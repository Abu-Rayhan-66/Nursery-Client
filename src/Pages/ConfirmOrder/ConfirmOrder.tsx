/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../Redux/hooks";
import { RootState } from "../../Redux/store";
import { clearCart } from "../../Redux/Features/cart/cartSlice";
import { useNavigate } from 'react-router-dom';
import { useUpdateProductMutation } from "../../Redux/Features/product.Api";
import { toast } from "sonner";


const ConfirmOrder = () => {
  const cartData = useAppSelector((state: RootState) => state.cart.items);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [updateProductQuantities, { isLoading }] = useUpdateProductMutation(); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  const totalPriceWithTaxAndShipping = () => {
    const subtotal = cartData.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const tax = subtotal * 0.1; // 10% tax
    const SHIPPING_CHARGE = 3;
    return subtotal + tax + SHIPPING_CHARGE;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cartData.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    const productsToUpdate = cartData.map((item) => ({
      id: item.productId, 
      quantity: item.quantity,
    }));


    const toastId = toast.loading("Order placing...")
    try {
      const response = await updateProductQuantities(productsToUpdate).unwrap();


      console.log(response.message);

      dispatch(clearCart());
     toast.success("Order placed successfully",{id:toastId})
      navigate('/successOrder'); 
    } catch (err: any) {
      console.error("Failed to place order:", err);
      toast.error("Something went wrong", {id:toastId})
    }
  };

  window.addEventListener('beforeunload', function (e) {
    const confirmationMessage = "Your progress will be lost if you leave this page.";
    
    e.returnValue = confirmationMessage; 
    return confirmationMessage;          
});


  return (
    <div className=" min-h-[69vh] mt-24 flex flex-col lg:flex-row justify-between px-4 max-w-6xl mx-auto">
      <div className="w-full lg:w-1/2 pr-4 flex flex-col">
        <h2 className="text-lg text-center">Shipping Details</h2>
        <form className="mt-4 flex-grow" onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-3">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={userDetails.name}
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={userDetails.email}
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={userDetails.phone}
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={userDetails.address}
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded"
            />
          </div>
          <button
            type="submit"
            className={`mt-4 px-3 w-full new-btn ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Cash on Delivery"}
          </button>
        </form>
      </div>

      <div className="w-full lg:w-1/2 pl-4 flex flex-col">
        <h2 className="text-lg text-center">Order Summary</h2>
        <div className="bg-white shadow-md p-4 flex-grow flex flex-col mt-4">
          {cartData.length === 0 ? (
            <h2 className="text-center">No products to confirm</h2>
          ) : (
            <div className="flex flex-col space-y-4">
              {cartData.map((item) => (
                <div key={item.productId} className="flex justify-between">
                  <span>{item.name}</span>
                  <span>{`$${item.price} x ${item.quantity}`}</span>
                  <span>{`$${(item.price * item.quantity).toFixed(2)}`}</span>
                </div>
              ))}
              <div className="flex justify-between mt-2 font-bold">
                <span>Total</span>
                <span>{`$${totalPriceWithTaxAndShipping().toFixed(2)}`}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrder;
