import axios from 'axios';

const API_URL = 'https://api.foodvela.com/api/v1/products/related'; 

export default async function getRelatedProducts(id) {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data.relatedProducts;
}
  
