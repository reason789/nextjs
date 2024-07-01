"use client";

import RelatedProducts from "@/components/RelatedProducts";
import ProductDisplay from "@/components/ProductDisplay";
import BreadLink from "@/components/BreadLink";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { useEffect } from "react";
import { fetchProductDetails } from "@/lib/features/productDetails/productDetailsSlice";
import { fetchRelatedProducts } from "@/lib/features/relatedProducts/relatedProductsSlice";
import LoadingOverlay from "@/components/LoadingOverlay"; // Import the LoadingOverlay component

const ProductDetailsPage = ({ params }) => {
  const { slug } = params;

  const dispatch = useDispatch();
  const { product, status, error } = useSelector(
    (state: RootState) => state.productDetails
  );
  const {
    products,
    status: relatedProductsStatus,
    error: relatedProductsError,
  } = useSelector((state: RootState) => state.relatedProducts);

  useEffect(() => {
    dispatch(fetchProductDetails(slug));
    dispatch(fetchRelatedProducts(slug));
  }, [dispatch, slug]);

  if (status === "loading" || relatedProductsStatus === "loading") {
    return <LoadingOverlay />;
  }

  return (
    <div className="px-4 md:px-8 lg:px-16 m-auto relative max-w-screen-xl mt-12 mb-12">
      <BreadLink name={product.name} category={product.category} />
      {<ProductDisplay product={product} />}
      <div className="mt-20">
        <h2 className="font-semibold text-xl mb-4">RELATED PRODUCTS</h2>
        <RelatedProducts carousel={true} products={products} />
      </div>
    </div>
  );
};

export default ProductDetailsPage;
