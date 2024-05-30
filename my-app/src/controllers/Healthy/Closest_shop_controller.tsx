import React, { useContext } from "react";
import { MealContext } from "../../hooks/MealContext";

export const Closest_shop_controller = () => {

  const VerifyCriteriaData = (criteria: any) => {
    return ValidateCriteriaData(criteria);
  };

  const ValidateCriteriaData = (criteria: any) => {
    try {
      if (criteria.distance <= 0) {
        throw new Error("Max distance must be greater than 0");
      }
      if (criteria.price <= 0) {
        throw new Error("Max price must be greater than 0");
      }
    } catch (error: any) {
      console.error("Error", error);
      return error;
    }
  };

  const VerifyAPIData = (stores: any, prices: any, meals: any, criteria: any) => {
    return ValidateAPIData(stores, prices, meals, criteria);
  }

  const ValidateAPIData = (stores: any, prices: any, meals: any, criteria: any) => {
    try {
      if (stores.length > 0) {
        return CalculateBestShops(stores, prices, meals, criteria)
      }
      else {
        throw new Error("No stores found with your selected criteria");
      }
    }
    catch (error: any) {
      return error.message;
    }
  }

  const CalculateBestShops = (stores: any, prices: any, meal: any, criteria: any) => {
    let minPrice = Infinity;
    let index = -1;
    for (let j = 0; j < prices.length; j++) {
      let totalPrice = 0;
      for (let i = 0; i < meal.products.length; i++) {
        for (let productName in prices[j].products) {
          if (meal.products[i] == productName)
            totalPrice += prices[j].products[productName];
        }
      }
      if (minPrice > totalPrice && totalPrice < criteria.price) {
        minPrice = totalPrice;
        index = j;
      }
    }

    try {
      if (index != -1) {
        return { price: minPrice, store: stores[index], products: meal.products }
      }
      else {
        throw new Error("Price is too low, no results found")
      }
    }
    catch (error: any) {
      return error.message
    }

  }

  return {
    VerifyCriteriaData,
    VerifyAPIData
  };
}

export default Closest_shop_controller;
