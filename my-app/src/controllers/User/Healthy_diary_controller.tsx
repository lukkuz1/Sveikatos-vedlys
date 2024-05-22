import { GetDiaryData, Diary } from "../../models/Diary";
import { getDatabase, ref, get, update } from "firebase/database";
import { Record } from "../../models/Record";

export const FetchDiaryData = async (
  setDiaries: Function,
  setShowAddDiary: Function,
  setError: Function
) => {
  try {
    const diariesData = await GetDiaryData();
    setDiaries(diariesData);
    setShowAddDiary(diariesData.length === 0);
    setError("");
  } catch (err) {
    setError("Failed to fetch diaries. Please try again.");
  }
};

export const AnalyzeData = async (id: string) => {
  await IfThereAreFoodData(id);
  await IfThereAreSleepData(id);
  await IfThereAreWeightData(id);
};

export const IfThereAreFoodData = async (id: string) => {
  try {
    const db = getDatabase();
    const diaryRef = ref(db, `diaries/${id}`);
    const diarySnapshot = await get(diaryRef);
    const diaryData = diarySnapshot.val();
    if (diaryData && typeof diaryData.records === "object") {
      const hasDietData = Object.values(diaryData.records).some(
        (record: any) => record.diet && Object.keys(record.diet).length > 0
      );
      if (hasDietData) {
        await calculateAverageCalorieIntake(id);
        await calculateAverageMealCount(id);
      }
    }
  } catch (error) {
    console.error("Error checking food data:", error);
  }
};

export const IfThereAreWeightData = async (id: string) => {
  try {
    const db = getDatabase();
    const diaryRef = ref(db, `diaries/${id}`);
    const diarySnapshot = await get(diaryRef);
    const diaryData = diarySnapshot.val();
    if (diaryData && typeof diaryData.records === "object") {
      for (const recordId in diaryData.records) {
        const record = diaryData.records[recordId];
        if (record.weight) {
          await calculateWeight(id);
        }
      }
    }
  } catch (error) {
    console.error("Error checking weight data:", error);
  }
};

export const IfThereAreSleepData = async (id: string) => {
  try {
    const db = getDatabase();
    const diaryRef = ref(db, `diaries/${id}`);
    const diarySnapshot = await get(diaryRef);
    const diaryData = diarySnapshot.val();
    if (diaryData && diaryData.records) {
      const recordsArray = Object.values(diaryData.records);
      const hasSleepData = recordsArray.some(
        (record: any) => record.sleep_time && record.bedtime
      );
      if (hasSleepData) {
        await calculateAverageSleepTime(id);
        await calculateAverageSleepDuration(id);
      }
    }
  } catch (error) {
    console.error("Error checking sleep data:", error);
  }
};

export const calculateAverageSleepTime = async (id: string) => {
  try {
    const db = getDatabase();
    const diaryRef = ref(db, `diaries/${id}`);
    const diarySnapshot = await get(diaryRef);
    const diaryData = diarySnapshot.val();
    if (diaryData && diaryData.records) {
      const recordsArray = Object.values(diaryData.records);
      const sleepTimes = recordsArray
        .map((record: any) => parseFloat(record.sleep_time))
        .filter((sleepTime: number) => !isNaN(sleepTime));

      if (sleepTimes.length > 0) {
        const totalSleepTime = sleepTimes.reduce(
          (acc: number, sleepTime: number) => acc + sleepTime,
          0
        );
        const averageSleepTime = totalSleepTime / sleepTimes.length;
        await update(diaryRef, { average_sleep_time: averageSleepTime });
      }
    }
  } catch (error) {
    console.error("Error calculating average sleep time:", error);
  }
};

export const calculateAverageSleepDuration = async (id: string) => {
  try {
    const db = getDatabase();
    const diaryRef = ref(db, `diaries/${id}`);
    const diarySnapshot = await get(diaryRef);
    const diaryData = diarySnapshot.val();
    if (diaryData && diaryData.records) {
      const recordsArray = Object.values(diaryData.records);
      const sleepDurations = recordsArray
        .map((record: any) => {
          const sleepTime = parseFloat(record.sleep_time);
          const bedtime = parseFloat(record.bedtime);
          if (!isNaN(sleepTime) && !isNaN(bedtime)) {
            return sleepTime - bedtime;
          }
          return NaN;
        })
        .filter((duration: number) => !isNaN(duration));
      if (sleepDurations.length > 0) {
        const totalSleepDuration = sleepDurations.reduce(
          (acc: number, duration: number) => acc + duration,
          0
        );
        const averageSleepDuration = totalSleepDuration / sleepDurations.length;
        await update(diaryRef, {
          average_sleep_duration: averageSleepDuration,
        });
      }
    }
  } catch (error) {
    console.error("Error calculating average sleep duration:", error);
  }
};

export const calculateAverageCalorieIntake = async (id: string) => {
  try {
    const db = getDatabase();
    const diaryRef = ref(db, `diaries/${id}`);
    const diarySnapshot = await get(diaryRef);
    const diaryData = diarySnapshot.val();
    if (diaryData && typeof diaryData.records === "object") {
      let totalCalories = 0;
      let totalMeals = 0;
      for (const recordId in diaryData.records) {
        const record = diaryData.records[recordId];
        if (record.diet) {
          for (const dietRecordKey in record.diet) {
            const dietRecord = record.diet[dietRecordKey];
            const calories = parseFloat(dietRecord.calories);
            if (!isNaN(calories)) {
              totalCalories += calories;
              totalMeals++;
            }
          }
        }
      }
      const averageCalorieIntake = totalCalories / totalMeals;
      await update(diaryRef, { average_calorie_count: averageCalorieIntake });
    }
  } catch (error) {
    console.error("Error calculating average calorie intake:", error);
  }
};

export const calculateAverageMealCount = async (id: string) => {
  try {
    const db = getDatabase();
    const diaryRef = ref(db, `diaries/${id}`);
    const diarySnapshot = await get(diaryRef);
    const diaryData = diarySnapshot.val();
    if (diaryData && typeof diaryData.records === "object") {
      let totalMeals = 0;
      for (const recordId in diaryData.records) {
        const record = diaryData.records[recordId];
        if (record.diet) {
          for (const dietRecordKey in record.diet) {
            totalMeals++;
          }
        }
      }
      const averageMealCount =
        totalMeals / Object.keys(diaryData.records).length;
      await update(diaryRef, { eat_count: averageMealCount });
    }
  } catch (error) {
    console.error("Error calculating average meal count:", error);
  }
};

const calculateWeight = async (id: string) => {
  try {
    const db = getDatabase();
    const diaryRef = ref(db, `diaries/${id}`);
    const diarySnapshot = await get(diaryRef);
    const diaryData = diarySnapshot.val();
    if (diaryData && typeof diaryData.records === "object") {
      let lowestWeight = Infinity;
      for (const recordId in diaryData.records) {
        const record = diaryData.records[recordId];
        if (record.weight) {
          const weight = parseFloat(record.weight);
          if (!isNaN(weight) && weight < lowestWeight) {
            lowestWeight = weight;
          }
        }
      }
      if (isFinite(lowestWeight)) {
        const initialWeight = parseFloat(diaryData.weight || "0");
        const weightChange = lowestWeight - initialWeight;
        await update(diaryRef, { weight_change: weightChange });
      } else {
        console.log("No weight data found to calculate weight change.");
      }
    }
  } catch (error) {
    console.error("Error calculating weight change:", error);
  }
};

const Healthy_diary_controller = {
  FetchDiaryData: FetchDiaryData,
  AnalyzeData: AnalyzeData,
};

export default Healthy_diary_controller;
