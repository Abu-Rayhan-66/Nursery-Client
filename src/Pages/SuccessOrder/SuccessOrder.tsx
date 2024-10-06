import { Link } from 'react-router-dom';

const SuccessOrder = () => {
  return (
    <div className="mt-24 flex flex-col items-center justify-center px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-semibold mb-4">Order Placed Successfully!</h2>
      <p className="mb-6">Thank you for your purchase. Your order is being processed.</p>
      <Link to="/" className="px-4 py-2 new-btn">
        Back to Home
      </Link>
    </div>
  );
};

export default SuccessOrder;
