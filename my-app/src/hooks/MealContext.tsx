import React, { createContext, useState } from "react";

export type IMeal = {
  breakfast: string;
  lunch: string;
  dinner: string;
  products: string[];
  totalCalories: number;
  totalCarbs: number;
  totalProtein: number;
}

type IMealContext = { meals: IMeal[], setMeals: React.Dispatch<React.SetStateAction<IMeal[]>>, bestShop: any, setBestShop: React.Dispatch<React.SetStateAction<any>> };

const MealContext = createContext<IMealContext>({ meals: [], setMeals: () => null, bestShop: {}, setBestShop: () => null });

const MealProvider = (props: any) => {
  const [meals, setMeals] = useState<IMeal[]>([]);
  const [bestShop, setBestShop] = useState<any>({});

  return (
    <MealContext.Provider
      value={{ meals, setMeals, bestShop, setBestShop }}
    >
      {props.children}
    </MealContext.Provider>
  );
};

export { MealProvider, MealContext };
