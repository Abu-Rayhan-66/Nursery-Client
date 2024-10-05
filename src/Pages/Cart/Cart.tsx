import { CartItem, updateQuantity, removeFromCart, clearCart } from "../../Redux/Features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { RootState } from "../../Redux/store";
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const cartData = useAppSelector((state: RootState) => state.cart.items);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const SHIPPING_CHARGE = 3;

  const subtotal = (): number => {
    return cartData.reduce(
      (sum: number, item: CartItem) => sum + item.price * item.quantity,
      0
    );
  };

  const tax = (): number => {
    return subtotal() * 0.1; 
  };

  const totalPriceWithTaxAndShipping = (): number => {
    return subtotal() + tax() + SHIPPING_CHARGE;
  };

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ productId, quantity: newQuantity }));
    }
  };

  const handleRemove = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handlePlaceOrder = () => {
    navigate('/confirmOrder');
  };

  return (
    <div className="mt-24 max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
 
        <div className="lg:col-span-2">
          {cartData.length > 0 ? (
            cartData.map((item) => (
              <div className="mb-6 border-b pb-4" key={item.productId}>
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-28 h-28 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p>{`Price: $${item.price.toFixed(2)}`}</p>
                    <p>{`Total: $${(item.price * item.quantity).toFixed(2)}`}</p>
                    <p>Available quantity: {item.available}</p>
  
                    <div className="flex items-center space-x-2 mt-2">
                      <button
                        className="btn btn-sm"
                        onClick={() =>
                          handleQuantityChange(item.productId, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        min={1}
                        onChange={(e) =>
                          handleQuantityChange(item.productId, +e.target.value)
                        }
                        className="w-16 text-center border rounded-md"
                      />
                      <button
                        className="btn btn-sm"
                        onClick={() =>
                          handleQuantityChange(item.productId, item.quantity + 1)
                        }
                        disabled={item.quantity >= item.available}
                      >
                        +
                      </button>
                    </div>

                    <div className="mt-4">
                      <button
                        className="btn btn-sm bg-red-500 text-white"
                        onClick={() => handleRemove(item.productId)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center h-60 border border-dashed border-gray-300 rounded-md">
              <p className="text-center text-xl text-gray-500">
                Your cart is empty.
              </p>
            </div>
          )}
        </div>

        <div className="border p-6 rounded-lg bg-white shadow-md h-[400px]">
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
          <div className="overflow-y-auto h-full">
            <div className="flex justify-between text-lg mb-2">
              <span>Subtotal:</span>
              <span>{`$${subtotal().toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between text-lg mb-2">
              <span>Tax (10%):</span>
              <span>{`$${tax().toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between text-lg mb-2">
              <span>Shipping:</span>
              <span>{`$${SHIPPING_CHARGE.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between text-xl font-bold border-t pt-2 mt-4">
              <span>Total:</span>
              <span>{`$${totalPriceWithTaxAndShipping().toFixed(2)}`}</span>
            </div>

            <button
              className="w-full bg-blue-500 text-white p-3 mt-6 rounded-lg hover:bg-blue-600"
              onClick={handlePlaceOrder}
              disabled={cartData.length === 0}
            >
              Proceed to Pay
            </button>
            {cartData.length > 0 && (
              <button
                className="w-full bg-red-500 text-white p-3 mt-3 rounded-lg hover:bg-red-600"
                onClick={handleClearCart}
              >
                Clear Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
