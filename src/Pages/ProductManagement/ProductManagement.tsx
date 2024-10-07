import { useState } from "react";
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductQuery,
  useUpdateSingleProductMutation,
} from "../../Redux/Features/product.Api";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { FaPlus } from "react-icons/fa";

export type TProduct = {
  _id: string;
  category: string;
  title: string;
  price: number;
  quantity: number;
  description: string;
  rating: number;
  image: string;
  isDeleted: boolean;
};

const ProductManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 7;

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [updateProductData, setUpdateProductData] = useState<TProduct | null>(null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProductData, setNewProductData] = useState<Omit<TProduct, "_id" | "isDeleted">>({
    category: "",
    title: "",
    price: 0,
    quantity: 0,
    description: "",
    rating: 0,
    image: "",
  });

  const [updateProduct] = useUpdateSingleProductMutation();
  const [addNewProduct] = useCreateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const { data, isLoading, error } = useGetProductQuery({
     searchTerm,
     page: currentPage,
     limit:itemsPerPage, 
    
    });

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
      };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleOpenUpdateModal = (product: TProduct) => {
    setUpdateProductData(product);
    setIsUpdateModalOpen(true);
  };


  const handleCloseUpdateModal = () => {
    setUpdateProductData(null);
    setIsUpdateModalOpen(false);
  };

  const handleOpenAddModal = () => {
    setNewProductData({
      category: "",
      title: "",
      price: 0,
      quantity: 0,
      description: "",
      rating: 0,
      image: "",
    });
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setNewProductData({
      category: "",
      title: "",
      price: 0,
      quantity: 0,
      description: "",
      rating: 0,
      image: "",
    });
    setIsAddModalOpen(false);
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!updateProductData) return;

    try {
      await updateProduct({ id: updateProductData._id, products: updateProductData });
      console.log("Updated product data:", updateProductData);
      toast.success("Product updated successfully!");
      setIsUpdateModalOpen(false);
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Something went wrong while updating the product.");
    }
  };

  const handleAddProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await addNewProduct(newProductData).unwrap();
      toast.success("Product added successfully!");
      setIsAddModalOpen(false); 
    } catch (err) {
      console.error("Add product failed:", err);
      toast.error("Something went wrong while adding the product.");
    }
  };

  const handleDelete = async (productId: string) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const toastId = toast.loading("Deleting product...");
          try {
            await deleteProduct(productId).unwrap();
            toast.success("Product deleted successfully!", { id: toastId });
          } catch (err) {
            console.error("Delete failed:", err);
            toast.error("Something went wrong while deleting the product.", { id: toastId });
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your product is safe :)",
            icon: "error",
          });
        }
      });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching products.</div>;
  }

  if (!data || !data.data || data.data.length === 0) {
    return <div>No products found.</div>;
  }

  return (
    <div className="mt-24 min-h-[69vh]">
      <input
        type="text"
        placeholder="Search by Category and Title"
        value={searchTerm}
        onChange={handleSearchChange}
        className="hidden py-1 w-full mb-3 rounded-md border-2 focus:border-[#1b918b] focus:outline-none border-[#03AED2]"
      />

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Serial</th>
              <th>Image</th>
              <th>Title</th>
              <th>Price ($)</th>
              <th>Category</th>
              <th>Update</th>
              <th>Delete</th>
              <th>
                <button onClick={handleOpenAddModal} className="new-btn">
                <FaPlus className="inline mb-1"></FaPlus> Add Product 
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.data.map((item: TProduct, index: number) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={item.image} alt={item.title} />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{item.title}</td>
                <td>${item.price}</td>
                <td>{item.category}</td>
                <th>
                  <button onClick={() => handleOpenUpdateModal(item)} className="new-btn">
                    Update
                  </button>
                </th>
                <th>
                  <button onClick={() => handleDelete(item._id)} className="new-btn">
                    Delete
                  </button>
                </th>
                <th>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isUpdateModalOpen && updateProductData && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-1/3 relative">
            <h2 className="text-xl font-bold mb-4">Update Product</h2>
            <form onSubmit={handleUpdate}>

              <div className="mb-4">
                <label className="block mb-1">Category</label>
                <input
                  type="text"
                  value={updateProductData.category}
                  onChange={(e) =>
                    setUpdateProductData((prev) => ({
                      ...prev!,
                      category: e.target.value,
                    }))
                  }
                  className="border rounded-md p-2 w-full"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1">Title</label>
                <input
                  type="text"
                  value={updateProductData.title}
                  onChange={(e) =>
                    setUpdateProductData((prev) => ({
                      ...prev!,
                      title: e.target.value,
                    }))
                  }
                  className="border rounded-md p-2 w-full"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1">Price ($)</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={updateProductData.price}
                  onChange={(e) =>
                    setUpdateProductData((prev) => ({
                      ...prev!,
                      price: Number(e.target.value),
                    }))
                  }
                  className="border rounded-md p-2 w-full"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1">Quantity</label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={updateProductData.quantity}
                  onChange={(e) =>
                    setUpdateProductData((prev) => ({
                      ...prev!,
                      quantity: Number(e.target.value),
                    }))
                  }
                  className="border rounded-md p-2 w-full"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1">Rating</label>
                <input
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={updateProductData.rating}
                  onChange={(e) =>
                    setUpdateProductData((prev) => ({
                      ...prev!,
                      rating: Number(e.target.value),
                    }))
                  }
                  className="border rounded-md p-2 w-full"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1">Image URL</label>
                <input
                  type="url"
                  value={updateProductData.image}
                  onChange={(e) =>
                    setUpdateProductData((prev) => ({
                      ...prev!,
                      image: e.target.value,
                    }))
                  }
                  className="border rounded-md p-2 w-full"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1">Description</label>
                <textarea
                  value={updateProductData.description}
                  onChange={(e) =>
                    setUpdateProductData((prev) => ({
                      ...prev!,
                      description: e.target.value,
                    }))
                  }
                  className="border rounded-md p-2 w-full"
                  required
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handleCloseUpdateModal}
                  className="new-btn"
                >
                  Cancel
                </button>
                <button type="submit" className="new-btn">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isAddModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-1/3 relative">
            <h2 className="text-xl font-bold mb-4">Add New Product</h2>
            <form onSubmit={handleAddProduct}>

              <div className="mb-4">
                <label className="block mb-1">Category</label>
                <input
                  type="text"
                  value={newProductData.category}
                  onChange={(e) =>
                    setNewProductData((prev) => ({
                      ...prev!,
                      category: e.target.value,
                    }))
                  }
                  className="border rounded-md p-2 w-full"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1">Title</label>
                <input
                  type="text"
                  value={newProductData.title}
                  onChange={(e) =>
                    setNewProductData((prev) => ({
                      ...prev!,
                      title: e.target.value,
                    }))
                  }
                  className="border rounded-md p-2 w-full"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1">Price ($)</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={newProductData.price}
                  onChange={(e) =>
                    setNewProductData((prev) => ({
                      ...prev!,
                      price: Number(e.target.value),
                    }))
                  }
                  className="border rounded-md p-2 w-full"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1">Quantity</label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={newProductData.quantity}
                  onChange={(e) =>
                    setNewProductData((prev) => ({
                      ...prev!,
                      quantity: Number(e.target.value),
                    }))
                  }
                  className="border rounded-md p-2 w-full"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1">Rating</label>
                <input
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={newProductData.rating}
                  onChange={(e) =>
                    setNewProductData((prev) => ({
                      ...prev!,
                      rating: Number(e.target.value),
                    }))
                  }
                  className="border rounded-md p-2 w-full"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1">Image URL</label>
                <input
                  type="url"
                  value={newProductData.image}
                  onChange={(e) =>
                    setNewProductData((prev) => ({
                      ...prev!,
                      image: e.target.value,
                    }))
                  }
                  className="border rounded-md p-2 w-full"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1">Description</label>
                <textarea
                  value={newProductData.description}
                  onChange={(e) =>
                    setNewProductData((prev) => ({
                      ...prev!,
                      description: e.target.value,
                    }))
                  }
                  className="border rounded-md p-2 w-full"
                  required
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handleCloseAddModal}
                  className="new-btn"
                >
                  Cancel
                </button>
                <button type="submit" className="new-btn">
                  Add
                </button>
              </div>
            </form>
          </div>
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
disabled={data && data.data.length < 7} 
className="py-1 px-4 bg-[#03AED2] text-white rounded-md ml-2 disabled:opacity-50"
>
Next
</button>
</div>
    </div>
  );
};

export default ProductManagement;
