import {
    GetHealthMissionsData,
    JoinHealthMissionData,
    Health_mission
} from "../../models/Health_mission";


export default function Healthy_controller() {
    const GetHealthMissions = async (): Promise<Health_mission[]> => {
        return await GetHealthMissionsData();
    };
    const GetEndedMissions = (): string => {
        return 'įvykdyta';
    };

    const GetActiveMissions = (): string => {
        return 'vykdoma';
    };

    const GetUncompletedMissions = (): string => {
        return 'neįvykdyta';
    };

    const JoinHealthMission = async (missionId: string): Promise<void> => {
        return await JoinHealthMissionData(missionId);
    };
    return {
        GetHealthMissions,
        JoinHealthMission,
        GetEndedMissions,
        GetActiveMissions,
        GetUncompletedMissions
    };
}
