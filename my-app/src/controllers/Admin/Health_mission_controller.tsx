import {
  GetHealthMissionsData,
  GetHealthMissionData,
  AddHealthMission,
  DeleteHealthMissionData,
  EditHealthMissionData,
  Health_mission
} from "../../models/Health_mission";

export default function Health_mission_controller() {
  const GetHealthMissions = async (): Promise<Health_mission[]> => {
    return await GetHealthMissionsData();
  };

  const GetHealthMission = async (id: string): Promise<Health_mission | null> => {
    return await GetHealthMissionData(id);
  };

  const VerifyHealthMissionData = (missionData: Health_mission): number => {
    return ValidateHealthMissionData(missionData);
  };

  const ValidateHealthMissionData = (missionData: Health_mission): number => {
    if (missionData.missionDescription === "") {
      return 1;
    } else {
      return 0;
    }
  }

  const DeleteHealthMission = (id: string) => {
    DeleteHealthMissionData(id);
  }

  return {
    GetHealthMissions,
    GetHealthMission,
    VerifyHealthMissionData,
    DeleteHealthMission
  };
}
