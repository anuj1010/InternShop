import React, { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import "./Card.css";

const Card = ({ product }) => {
  // console.log("card", product);
  const { addToCart } = useContext(UserContext);

  const {
    title,
    description,
    price,
    discountPercentage,
    rating,
    stock,
    brand,
    category,
    thumbnail,
  } = product;

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="product-card">
      <div className="product-thumbnail">
        <img src={thumbnail} alt={title} />
      </div>
      <div className="product-details">
        <h2>{title}</h2>
        <p>{description}</p>
        <p>
          <strong>Price:</strong> ${price}
        </p>
        <p>
          <strong>Discount:</strong> {discountPercentage}%
        </p>
        <p>
          <strong>Rating:</strong> {rating}
        </p>
        <p>
          <strong>Stock:</strong> {stock}
        </p>
        <p>
          <strong>Brand:</strong> {brand}
        </p>
        <p>
          <strong>Category:</strong> {category}
        </p>
        <button onClick={handleAddToCart}>Add To Cart</button>
      </div>
    </div>
  );
};

export default Card;
