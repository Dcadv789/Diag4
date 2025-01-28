export function useStorage() {
  const uploadFile = async (file: File, path: string) => {
    console.log('File upload will be implemented with Firebase');
    return '';
  };

  const deleteFile = async (path: string) => {
    console.log('File deletion will be implemented with Firebase');
  };

  return {
    uploadFile,
    deleteFile
  };
}