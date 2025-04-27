export const getLandMarkGameplay = (gameplay, id) => {
    return gameplay.find(landmark => landmark.landmark_id === id);
}