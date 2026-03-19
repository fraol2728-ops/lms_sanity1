// Barrel export for all server actions

export { toggleCourseCompletion } from "./courses";
export { deleteImage, uploadImage } from "./images";
export {
  getUserProgress,
  saveLessonProgress,
  toggleLessonCompletion,
} from "./lessons";
export { getMuxSignedToken, getMuxSignedTokens } from "./mux";
