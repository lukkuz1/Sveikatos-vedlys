import React, { useContext } from "react";
import { MealContext } from "../../hooks/MealContext";

export const Closest_shop_page: React.FC = () => {
  const data = useContext(MealContext)

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 30 }}>
      <div>
        <h1>Closest Shop</h1>
        <p>Shop: {data.bestShop.store.name}</p>
        <p>Address: {data.bestShop.store.location}</p>
        <p>Distance to the shop: {data.bestShop.store.distanceTo / 1000} km</p>
        <p>Products bought: {data.bestShop.products.join(', ')}</p>
        <p>Best price found: {data.bestShop.price.toFixed(2)} Eur</p>
      </div>
    </div>
  )
}

export default Closest_shop_page;
