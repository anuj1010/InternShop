import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Card from "../Card/Card";
import "./Home.css";
import { UserContext } from "../Context/UserContext";
import { Navigate } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const { loggedIn } = useContext(UserContext);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get("https://dummyjson.com/products");
      setProducts(response.data.products);
    };
    fetchProducts();
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterMinPrice = (event) => {
    const value = event.target.value.trim();
    setMinPrice(value === "" || isNaN(Number(value)) ? 0 : parseInt(value));
  };

  const handleFilterMaxPrice = (event) => {
    const value = event.target.value.trim();
    setMaxPrice(value === "" || isNaN(Number(value)) ? 0 : parseInt(value));
  };

  const filteredProducts = products.filter((product) => {
    return (
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      product.price >= minPrice &&
      product.price <= maxPrice
    );
  });

  if (!loggedIn) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      {loggedIn && (
        <div className="container">
          <div className="search-filter">
            <div className="filterDiv">
              <label htmlFor="search">Search:</label>
              <input type="text" value={searchQuery} onChange={handleSearch} />
            </div>
            <div className="filterDiv">
              <label htmlFor="minPrice"> Min Price:</label>
              <input
                type="number"
                placeholder="Enter min price"
                value={minPrice}
                onChange={handleFilterMinPrice}
              />
            </div>
            <div className="filterDiv">
              <label htmlFor="maxPrice"> Max Price:</label>
              <input
                type="number"
                placeholder="Enter max price"
                value={maxPrice}
                onChange={handleFilterMaxPrice}
              />
            </div>
          </div>
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <Card key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
