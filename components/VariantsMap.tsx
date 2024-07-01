import React from "react";
import { Button } from "./ui/button";

const VariantsMap = ({
  product,

  selectedWeight,
  setSelectedWeight,
  selectedColor,
  setSelectedColor,
  selectedSize,
  selectedShape,
  setSelectedShape,
  setSelectedSize,
}) => {
  const renderVariantButtons = (
    variantType,
    selectedVariantType,
    setSelectedVariantType,
    unit = ""
  ) => {
    const uniqueVariants = Array.from(
      new Set(product.variants.map((variant) => variant[variantType]))
    );

    return uniqueVariants.map(
      (variantValue, index) =>
        variantValue && (
          <Button
            key={index}
            variant={
              selectedVariantType === variantValue ? "default" : "outline"
            }
            onClick={() => setSelectedVariantType(variantValue)}
          >
            {variantValue}
            {unit}
          </Button>
        )
    );
  };

  return (
    <div>
      {product?.variants?.some((variant) => variant.weight) && (
        <div className="mt-6">
          <p>Weight</p>
          <div className="flex gap-2 mt-3">
            {renderVariantButtons(
              "weight",
              selectedWeight,
              setSelectedWeight,
              product.variants.find((variant) => variant.weight)?.unit
            )}
          </div>
        </div>
      )}
      {product?.variants?.some((variant) => variant.color) && (
        <div className="mt-6">
          <p>Color</p>
          <div className="flex gap-2 mt-3">
            {renderVariantButtons("color", selectedColor, setSelectedColor)}
          </div>
        </div>
      )}
      {product?.variants?.some((variant) => variant.size) && (
        <div className="mt-6">
          <p>Size</p>
          <div className="flex gap-2 mt-3">
            {renderVariantButtons(
              "size",
              selectedSize,
              setSelectedSize,
              product.variants.find((variant) => variant.size)?.unit
            )}
          </div>
        </div>
      )}
      {product?.variants?.some((variant) => variant.shape) && (
        <div className="mt-6">
          <p>Shape</p>
          <div className="flex gap-2 mt-3">
            {renderVariantButtons("shape", selectedShape, setSelectedShape)}
          </div>
        </div>
      )}
    </div>
  );
};

export default VariantsMap;
