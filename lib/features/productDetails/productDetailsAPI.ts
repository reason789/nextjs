import axios from 'axios';

const API_URL = 'https://api.foodvela.com/api/v1/product'; 

export default async function getProductDetails(id) {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data.product;
}
  
