import { useState } from "react";
import { useGetProductQuery } from "../../Redux/Features/product.Api";

export type TProduct = {
  _id:string
  category: string;
  title: string;
  price: number;
  quantity: number;
  description: string;
  rating: number;
  image: string;
  isDeleted:boolean;
};

import { Link } from "react-router-dom";

const HomeProduct = () => {

  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 6;
  console.log(searchTerm, minPrice, maxPrice)

  const { data, isLoading, error } = useGetProductQuery({
    searchTerm,
    minPrice,
    maxPrice,
    page: currentPage,
    limit:itemsPerPage,
    isDeleted: false, 
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value); 
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(e.target.value ? Number(e.target.value) : ""); 
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(e.target.value ? Number(e.target.value) : "");
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="min-h-[70vh] bg-gray-100 text-center">
    <div className=" flex-1  mt-24">
     <h2 className="mt-10 mb-10">Products</h2>
  <div className="mb-6 max-w-2xl mx-auto ">
    <input
      type="text"
      placeholder="    Search by Category and Title"
      value={searchTerm}
      onChange={handleSearchChange} 
      className="py-1 w-full mb-3 rounded-md border-[2px] focus:border-[#1b918b] focus:outline-none  border-[#03AED2]"
    />
     <h2 className="mb-2 bg-[#03AED2] py-1 px-2 text-white rounded-md">Filter by price range</h2>
    <div className="flex space-x-4 mb-4">
     
      <input
        type="number"
        placeholder="  Min Price"
        value={minPrice}
        onChange={handleMinPriceChange}
        className="py-1 w-full rounded-md border-[2px] focus:border-[#1b918b] focus:outline-none  border-[#03AED2]"
      />
      <input
        type="number"
        placeholder="  Max Price"
        value={maxPrice}
        onChange={handleMaxPriceChange}
        className="py-1 w-full rounded-md border-[2px] focus:border-[#1b918b] focus:outline-none  border-[#03AED2]"
      />
    </div>
    
  </div>

  {isLoading ? (
    <div>Loading...</div>
  ) : error ? (
    <div className="text-red-400 text-2xl font-medium"> No data found</div>
  ) : !data || data.data.length === 0 ? (
    <div>No facilities found</div>
  ) : (
    <div className="flex-[5] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-10 mx-auto ">
      {data?.data?.map((item:TProduct) => (
        <div key={item._id} className="card card-compact bg-white  rounded-md border-[#03AED2] border-[1px] shadow-sm hover:shadow-[#03AED2]">
          <figure>
            <img className="h-40 w-full" src={item.image} alt="Facility image" />
          </figure>
          <div className="card-body">
            <h2 className="text-lg font-medium text-black">{item.title}</h2>
            <p className="text-base text-black">Price: {item.price}</p>
            <p className="text-base text-black">Stock: {item.quantity}</p>
            <div className="card-actions justify-end">
              <Link to={`/productDetails/${item._id}`}>
                <button className="py-1 px-4  text-white rounded-tl-md rounded-br-md bg-[#03AED2] text-lg font-medium">View Details</button>
              </Link>
            </div>
          </div>
        </div>
      ))}
       
    </div>

  )}
  <div className="flex justify-center mt-4">
<button
onClick={() => handlePageChange(currentPage - 1)}
disabled={currentPage === 1}
className="py-1 px-4 bg-[#03AED2] text-white rounded-md mr-2 disabled:opacity-50"
>
Previous
</button>
<span className="py-1 px-2">Page {currentPage}</span>
<button
onClick={() => handlePageChange(currentPage + 1)}
disabled={data && data.data.length < 6} 
className="py-1 px-4 bg-[#03AED2] text-white rounded-md ml-2 disabled:opacity-50"
>
Next
</button>
</div>
 <Link to="/product">
 <button>See All </button>
 </Link>
</div>
  </div>
  );
};

export default HomeProduct;