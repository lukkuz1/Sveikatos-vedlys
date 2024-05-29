import React, { useState } from "react";
import Diet_plan_controller from "../../controllers/Healthy/Diet_plan_controller";

export const Diet_plan_criteria_page: React.FC = () => {
  const [criteria, setCriteria] = useState({
    tipas: "",
    duration: "",
    carbsCount: 0,
    proteinCount: 0,
    avoidLactose: false,
    avoidGluten: false,
    id: "",
    dailyPlans: []
});

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = event.target;
    const inputValue = type === "checkbox" ? (event.target as HTMLInputElement).checked : value;
    setCriteria((prevCriteria) => ({
      ...prevCriteria,
      [name]: inputValue,
    }));
  };

  const DietPlanGeneration = async () => {
    try {
      // await Diet_plan_controller.VerifyDietPlanCriteria()
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 30 }}>
      <h1>Enter Diet Plan Criteria</h1>
      <label>
        Tipas:
        <input type="text" name="tipas" value={criteria.tipas} onChange={handleInputChange} />
      </label>
      <label>
        id:
        <input type="text" name="id" value={criteria.id} onChange={handleInputChange} />
      </label>
      <label>
        Duration:
        <select name="duration" value={criteria.duration} onChange={handleInputChange}>
          <option value="day">Day</option>
          <option value="week">Week</option>
        </select>
      </label>
      <label>
        Carbs Count:
        <input type="number" name="carbsCount" value={criteria.carbsCount} onChange={handleInputChange} />
      </label>
      <label>
        Protein Count:
        <input type="number" name="proteinCount" value={criteria.proteinCount} onChange={handleInputChange} />
      </label>
      <label>
        Avoid Lactose:
        <input type="checkbox" name="avoidLactose" checked={criteria.avoidLactose} onChange={handleInputChange} />
      </label>
      <label>
        Avoid Gluten:
        <input type="checkbox" name="avoidGluten" checked={criteria.avoidGluten} onChange={handleInputChange} />
      </label>
      <button onClick={DietPlanGeneration}>Generate Diet Plan</button>
    </div>
  );
};

export default Diet_plan_criteria_page;
