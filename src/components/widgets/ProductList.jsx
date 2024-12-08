// src/components/ProductList.js
const ProductList = () => {
  const products = [
    {
      name: "HP 15 Laptop",
      category: "Electronics",
      brand: "HP",
      price: 55000,
      rating: 4,
    },
    {
      name: "Good Life MP",
      category: "Groceries",
      brand: "Good Life",
      price: 250,
      rating: 5,
    },
    {
      name: "Aashirvaad Flour",
      category: "Groceries",
      brand: "Aashirvaad",
      price: 270,
      rating: 4.5,
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
        Best Selling Products
      </h3>
      <table className="w-full text-left border-collapse dark:bg-gray-800 text-black dark:text-gray-300">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-700 text-black dark:text-gray-300">
            <th className="p-2">Product</th>
            <th className="p-2">Category</th>
            <th className="p-2">Brand</th>
            <th className="p-2">Price</th>
            <th className="p-2">Rating</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr
              key={index}
              className="border-b hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <td className="p-2">{product.name}</td>
              <td className="p-2">{product.category}</td>
              <td className="p-2">{product.brand}</td>
              <td className="p-2">Rs {product.price}</td>
              <td className="p-2">{product.rating}⭐</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
