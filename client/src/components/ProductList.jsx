import React, { useEffect, useRef, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, incrementPage } from '../features/products/productsSlice';

const ProductList = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.products.items);
  const page = useSelector((state) => state.products.page);
  const hasMore = useSelector((state) => state.products.hasMore);
  const observer = useRef();
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    if (isFirstLoad) {
      dispatch(fetchProducts({ page: 1 }));
      setIsFirstLoad(false);
    }
  }, [dispatch, isFirstLoad]);

  const lastItemRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          dispatch(incrementPage());
        }
      });
      if (node) observer.current.observe(node);
    },
    [dispatch, hasMore]
  );

  useEffect(() => {
    // Fetch more products when page changes
    if (page > 1) {
      dispatch(fetchProducts({ page }));
    }
  }, [dispatch, page]);

  return (
    <div className="container mx-auto p-4 dark:bg-black dark:text-white">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((item, index) => (
          <li key={item.id} className="p-4 bg-gray-200 dark:bg-gray-700 rounded">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-32 object-cover mb-2 rounded"
            />
            <h2 className="text-lg font-semibold">{item.title}</h2>
          </li>
        ))}
        {hasMore && (
          <li ref={lastItemRef} className="p-4 bg-gray-200 dark:bg-gray-700 rounded">
            <div className="animate-pulse">
              <div className="bg-gray-300 dark:bg-gray-600 h-32 w-full mb-2 rounded"></div>
              <div className="bg-gray-300 dark:bg-gray-600 h-4 w-3/4 mb-2 rounded"></div>
            </div>
          </li>
        )}
      </ul>
    </div>
  );
};

export default ProductList;