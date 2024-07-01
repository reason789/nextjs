// import axios from 'axios';

// const API_URL = 'http://localhost:4000/api/v1'; 

// export default async function getProducts(category='',subCategory='') {
//   if(category == 'all' || category == '' )
//     {
//       const response = await axios.get(`${API_URL}/products`);
//       return response.data.products;
//     } 
//     else {
//       if(subCategory){
//         const response = await axios.get(`${API_URL}/products?category=${category}&subCategories=${subCategory}`);
//       return response.data.products;
//       }

//       const response = await axios.get(`${API_URL}/products?category=${category}`);
//       return response.data.products;

//     }
// }
  

import axios from 'axios';

const API_URL = 'https://api.foodvela.com/api/v1';

export default async function getProducts(category = '', subCategory = '', keyword = '') {
  try {
    const params = {};

    if (category && category !== 'all') {
      params.category = category;
    }

    if (subCategory) {
      params.subCategories = subCategory;
    }

    if (keyword) {
      params.keyword = keyword;
    }


    const response = await axios.get(`${API_URL}/products`, { params });
    return response.data.products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}
