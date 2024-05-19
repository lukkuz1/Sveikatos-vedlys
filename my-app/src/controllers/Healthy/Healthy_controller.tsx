import {
    GetHealthMissionsData,
    // JoinHealthMission,
    Health_mission
} from "../../models/Health_mission";


export default function Healthy_controller() {
    const GetHealthMissions = async (): Promise<Health_mission[]> => {
        return await GetHealthMissionsData();
    };

    // const JoinHealthMission = async (id: string): Promise<Health_mission | null> => {
    //     return await JoinHealthMission(id);
    // };

    // const GetEndedMissions = async (id: string): Promise<Health_mission | null> => {
    //     return await GetConsultationReviews(id);
    // };
    // const GetActiveMissions = async (id: string): Promise<Health_mission | null> => {
    //     return await GetConsultationReviews(id);
    // };

    return {
        GetHealthMissions,
        // JoinHealthMission,
        // GetEndedMissions,
        // GetActiveMissions
    };
}
