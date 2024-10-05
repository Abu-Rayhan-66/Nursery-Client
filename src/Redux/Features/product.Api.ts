import { baseApi } from "../Api/baseApi";

const productApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
      createProduct: builder.mutation({
        query: (data) => ({
          
          url: "/api/product",
          method: "POST",
          body: data,
          
        }),
      }),
  
      getProduct: builder.query({
        query: ({searchTerm = "", minPrice = "", maxPrice = "",page, limit }) => ({
          url: "/api/product",
          params: { searchTerm, minPrice, maxPrice, page, limit },
          method: "GET",
          
        }),
      }),

      getSingleProduct: builder.query({
        query: (id) => ({
          url: `/api/product/${id}`,
          method: "GET",
          
        }),
      }),

      updateProduct: builder.mutation({
        query: (products) => ({
          url: `/api/product/updateMultiple`,
          method: "PATCH",
          body:  products 
        }),
      }),
    }),
  });
  
  export const {
    useCreateProductMutation,
    useGetProductQuery,
    useGetSingleProductQuery,
    useUpdateProductMutation
   
    
  } = productApi;