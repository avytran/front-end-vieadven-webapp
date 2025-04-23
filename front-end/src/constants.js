import { adventure, game, logout, milestone, onlineLearning, rank, review, trekking, logo } from "./assets/images/navbar-icons"

export const navbarContents = [
    { id: "navbar-discovery", to: "/", icon: onlineLearning, label: "Khám phá" },
    { id: "navbar-leaderboard", to: "/leaderboard", icon: rank, label: "Bảng xếp hạng" },
    { id: "navbar-practice", to: "/practice", icon: trekking, label: "Phòng luyện tập" },
    { id: "navbar-mission", to: "/mission", icon: milestone, label: "Nhiệm vụ" },
    { id: "navbar-profile", to: "/profile", icon: adventure, label: "Hồ sơ" },
];

export const UPLOAD_PRESET = "first_upload";
export const CLOUD_NAME = "dgqolusci";