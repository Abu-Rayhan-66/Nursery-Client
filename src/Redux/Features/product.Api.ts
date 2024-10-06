import { baseApi } from "../Api/baseApi";

const productApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
      createProduct: builder.mutation({
        query: (data) => ({
          
          url: "/api/product",
          method: "POST",
          body: data,
          
        }),
        invalidatesTags: ["product"],
      }),
  
      getProduct: builder.query({
        query: ({searchTerm = "", minPrice = "", maxPrice = "",page, limit, sortBy, sortOrder }) => ({
          url: "/api/product",
          params: { searchTerm, minPrice, maxPrice, page, limit, sortBy, sortOrder },
          method: "GET",
          
        }),
        providesTags: ["product"],
      }),

      getSingleProduct: builder.query({
        query: (id) => ({
          url: `/api/product/${id}`,
          method: "GET",
          
        }),
        providesTags: ["product"],
      }),

      updateProduct: builder.mutation({
        query: (products) => ({
          url: `/api/product/updateMultiple`,
          method: "PATCH",
          body:  products 
        }),
        invalidatesTags: ["product"],
      }),
      
      updateSingleProduct: builder.mutation({
        query: ({id, products}) => ({
          url: `/api/product/${id}`,
          method: "PATCH",
          body:  products 
        }),
        invalidatesTags: ["product"],
      }),

      deleteProduct: builder.mutation({
        query: (id) => ({
          url: `/api/product/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["product"],
      }),
    }),
  });
  
  export const {
    useCreateProductMutation,
    useGetProductQuery,
    useGetSingleProductQuery,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useUpdateSingleProductMutation,
   
    
  } = productApi;