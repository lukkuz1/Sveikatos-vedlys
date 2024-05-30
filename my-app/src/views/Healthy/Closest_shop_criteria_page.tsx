import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Closest_shop_controller from "../../controllers/Healthy/Closest_shop_controller";
import { MealContext } from "../../hooks/MealContext";
import axios from "axios";

export const Closest_shop_criteria_page: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const { id }: any = useParams<{ id: string }>();

  const [criteria, setCriteria] = useState({
    distance: 0,
    price: 0
  });

  const mealData = useContext(MealContext);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = event.target;
    const inputValue = type === "checkbox" ? (event.target as HTMLInputElement).checked : value;
    setCriteria((prevCriteria) => ({
      ...prevCriteria,
      [name]: inputValue,
    }));
  };

  const SubmitUserConfirmation = () => {
    if (window.confirm("Do you agree to share your location?")) {
      return true;
    } else {
      return false;
    }
  }

  const SendUserLocation = () => {
    return prompt("Enter your location:", "Varnių g. 34");
  }

  const SubmitCriteriaForShops = async () => {
    const status = Closest_shop_controller().VerifyCriteriaData(criteria);
    if (status != undefined) {
      setError(status.message);
    } else {
      setError("");
      if (SubmitUserConfirmation()) {
        try {
          let location = SendUserLocation();


          const SendClosestShopLocationListRequest = async () => {
            const response: any = await axios({ method: 'post', url: 'http://localhost:3001/api/googlemaps/getdistance', headers: {}, data: { location: location, criteria: criteria } });
            return response.data;
          }

          const data = await SendClosestShopLocationListRequest();

          const SendShopPricesListRequest = async () => {
            const response: any = await axios({ method: 'post', url: 'http://localhost:3001/api/shops/getshopinformation', headers: {}, data: { stores: data } });
            return response.data;
          }

          const data2 = await SendShopPricesListRequest();
          const status = Closest_shop_controller().VerifyAPIData(data, data2, mealData.meals[parseInt(id)], criteria);
          if (status != undefined) {
            if (typeof status === "object") {
              console.log(status)
              mealData.setBestShop(status);
              navigate(`/diet_plan/closest_shop_page/`)
            } else {
              setError(status)
            }
          }
        }
        catch (error: any) {
        }

      }
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 30 }}>
      <h1 style={{ alignSelf: "center", color: 'red' }}>{error}</h1>
      <h1>Enter Closest Shop Finder Criteria</h1>
      <label>
        Max distance (km):
        <input type="number" name="distance" value={criteria.distance} onChange={handleInputChange} />
      </label>
      <label>
        Max price (Eur):
        <input type="number" name="price" value={criteria.price} onChange={handleInputChange} />
      </label>
      <button onClick={SubmitCriteriaForShops} style={{ marginTop: 10 }}>Generate Diet Plan</button>
    </div>
  );
};

export default Closest_shop_criteria_page;
