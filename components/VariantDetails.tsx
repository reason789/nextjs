// import React from "react";

// const VariantDetails = ({ variant }) => {
//   const details = [];
//   for (const key in variant) {
//     if (
//       variant[key] !== null &&
//       key !== "_id" &&
//       key !== "product" &&
//       key !== "__v" &&
//       key !== "createdAt" &&
//       key !== "sku" &&
//       key !== "price" &&
//       key !== "discountPrice"
//     ) {
//       details.push(
//         <p className="text-muted-foreground text-xs" key={key}>
//           {key.charAt(0).toUpperCase() + key.slice(1)}:{" "}
//           <span className="bg-gray-200 p-[2px] rounded-sm">{variant[key]}</span>
//         </p>
//       );
//     }
//   }
//   return details;
// };

// export default VariantDetails;

import React from "react";

const VariantDetails = ({ variant }) => {
  const details = [];
  for (const key in variant) {
    if (
      variant[key] !== null &&
      key !== "_id" &&
      key !== "product" &&
      key !== "__v" &&
      key !== "createdAt" &&
      key !== "sku" &&
      key !== "price" &&
      key !== "discountPrice"
    ) {
      // Check for the weight and unit keys
      if (key === "weight") {
        const unit = variant.unit ? ` ${variant.unit}` : "";
        details.push(
          <p className="text-muted-foreground text-xs w-max mb-1" key={key}>
            {key.charAt(0).toUpperCase() + key.slice(1)}:{" "}
            <span className="bg-gray-200 p-[2px] rounded-sm">
              {variant[key]}
              {unit}
            </span>
          </p>
        );
      } else if (key !== "unit") {
        details.push(
          <p className="text-muted-foreground text-xs w-max mb-1" key={key}>
            {key.charAt(0).toUpperCase() + key.slice(1)}:{" "}
            <span className="bg-gray-200 p-[2px] rounded-sm">
              {variant[key]}
            </span>
          </p>
        );
      }
    }
  }
  return details;
};

export default VariantDetails;
