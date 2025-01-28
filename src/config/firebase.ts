// Temporary mock implementation until Firebase is integrated
export const auth = {
  currentUser: null,
  onAuthStateChanged: (callback: (user: null) => void) => {
    callback(null);
    return () => {};
  }
};

export const db = {
  collection: () => ({})
};

export const storage = {
  ref: () => ({})
};

export default {
  auth,
  db,
  storage
};