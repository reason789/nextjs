export const extractVariantValues = (variant) => {
    const values = [];
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
        values.push(variant[key]);
      }
    }
    return values;
  };
  
  export default extractVariantValues;