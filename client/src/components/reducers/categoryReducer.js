const initialState = {
  personal: {},
  educationInfo: [],
  experienceInfo: [],
  skillsInfo: [],
  projectsInfo: [],
  certificatesInfo: [],
  achievementsInfo: [],
  languagesInfo: [],
  interestsInfo: [],
  referencesInfo: [],
  photo: null, // Added photo state
};

// Action Creator for updating photo
export const updatePhoto = (photo) => ({
  type: "UPDATE_PHOTO",
  payload: photo,
});

const categoryReducer = (state = initialState, action) => {
  console.log(`Action Type: ${action.type}`, "Payload:", action.payload || "No Payload");

  switch (action.type) {
    case "UPDATE_PERSONAL_INFO":
      return { ...state, personal: action.payload ?? {} };

    case "UPDATE_EDUCATION":
      return {
        ...state,
        educationInfo: state.educationInfo.some(e => e.id === action.payload?.id)
          ? state.educationInfo.map(e => (e.id === action.payload?.id ? action.payload : e))
          : [...state.educationInfo, action.payload ?? {}],
      };

    case "UPDATE_EXPERIENCE":
      return {
        ...state,
        experienceInfo: state.experienceInfo.some(e => e.id === action.payload?.id)
          ? state.experienceInfo.map(e => (e.id === action.payload?.id ? action.payload : e))
          : [...state.experienceInfo, action.payload ?? {}],
      };

    case "UPDATE_SKILLS":
      return {
        ...state,
        skillsInfo: Array.isArray(action.payload)
          ? action.payload.map(skill => (typeof skill === "string" ? skill : skill?.skill || ""))
          : [...state.skillsInfo, typeof action.payload === "string" ? action.payload : action.payload?.skill || ""],
      };

    case "UPDATE_PROJECTS":
      return { ...state, projectsInfo: [...state.projectsInfo, action.payload ?? {}] };

    case "UPDATE_CERTIFICATES":
      return { ...state, certificatesInfo: [...state.certificatesInfo, action.payload ?? {}] };

    case "UPDATE_ACHIEVEMENTS":
      return { ...state, achievementsInfo: [...state.achievementsInfo, action.payload ?? {}] };

    case "UPDATE_LANGUAGES":
      return { ...state, languagesInfo: [...state.languagesInfo, action.payload ?? {}] };

    case "UPDATE_INTERESTS":
      return { ...state, interestsInfo: [...state.interestsInfo, action.payload ?? {}] };

    case "UPDATE_REFERENCES":
      return { ...state, referencesInfo: [...state.referencesInfo, action.payload ?? {}] };

    case "UPDATE_PHOTO":
      return { ...state, photo: action.payload }; // ✅ Handling photo update

    case "RESET_RESUME":
      return { ...initialState };

    default:
      return state;
  }
};

export default categoryReducer;
