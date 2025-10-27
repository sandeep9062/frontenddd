import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// ✅ Helper to get token (only client-side)
const getToken = () =>
  typeof window !== "undefined" ? localStorage.getItem("token") : null;

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/products`;

const prepareHeaders = (headers: Headers) => {
  const token = getToken();
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  return headers;
};

// ✅ Interfaces
interface ProductImage {
  url: string;
  public_id?: string;
}

interface Product {
  _id: string;
  name: string;
  brand?: string;
  category: string;
  description?: string;
  composition?: string;
  dosage?: string;
  prescriptionRequired?: boolean;
  price: number;
  discountPrice?: number;
  stockCount: number;
  expiryDate?: string;
  manufacturingDate?: string;
  manufacturer?: string;
  storageConditions?: string;
  weight?: number;
  images: ProductImage[];
  tags?: string[];
  rating?: number;
  numReviews?: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface PaginatedProductsResponse {
  products: Product[];
  page: number;
  pages: number;
  totalProducts: number;
}

// ✅ Create API Slice
export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders,
  }),
  tagTypes: ["Products", "Product"],
  endpoints: (builder) => ({
    // ✅ GET all products (supports pagination, filters, and search)
    getProducts: builder.query<
      PaginatedProductsResponse,
      { keyword?: string; category?: string; brand?: string; pageNumber?: number }
    >({
      query: ({ keyword = "", category = "", brand = "", pageNumber = 1 }) => {
        const params = new URLSearchParams({
          keyword,
          category,
          brand,
          pageNumber: pageNumber.toString(),
        });
        return `/?${params.toString()}`;
      },
      providesTags: ["Products"],
    }),

    // ✅ GET single product by ID
    getProductById: builder.query<Product, string>({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),

    // ✅ CREATE new product
    addProduct: builder.mutation<Product, FormData>({
      query: (formData) => ({
        url: `/`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Products"],
    }),

    // ✅ UPDATE product
    updateProduct: builder.mutation<Product, { id: string; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [
        "Products",
        { type: "Product", id },
      ],
    }),

    // ✅ DELETE product
    deleteProduct: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        "Products",
        { type: "Product", id },
      ],
    }),

    // ✅ GET top rated products
    getTopProducts: builder.query<Product[], void>({
      query: () => `/top`,
      providesTags: ["Products"],
    }),
  }),
});

// ✅ Export hooks
export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetTopProductsQuery,
} = productsApi;
