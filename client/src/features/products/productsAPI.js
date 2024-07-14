export const fetchProductsFromAPI = async (page) => {
    // Fetch data from the JSONPlaceholder API
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`);
    //const response = await fetch(`http://localhost:5000/?page=${page}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
  
    // Mock product images
    return data.map((product, index) => ({
      ...product,
      imageUrl: `https://via.placeholder.com/150?text=Product+${product.id}`,
    }));
  };