import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from 'firebase/storage';
import { storage } from '../config/firebase';

export function useStorage() {
  const uploadFile = async (file: File, path: string) => {
    try {
      const storageRef = ref(storage, path);
      const snapshot = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(snapshot.ref);
      return url;
    } catch (error) {
      throw error;
    }
  };

  const deleteFile = async (path: string) => {
    try {
      const storageRef = ref(storage, path);
      await deleteObject(storageRef);
    } catch (error) {
      throw error;
    }
  };

  return {
    uploadFile,
    deleteFile
  };
}