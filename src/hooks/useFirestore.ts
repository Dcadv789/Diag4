export function useFirestore(collectionName: string) {
  const getAll = async () => {
    return [];
  };

  const getById = async (id: string) => {
    return null;
  };

  const add = async (data: any) => {
    return 'mock-id';
  };

  const update = async (id: string, data: any) => {
    console.log('Update will be implemented with Firebase');
  };

  const remove = async (id: string) => {
    console.log('Remove will be implemented with Firebase');
  };

  const queryDocuments = async (...queryConstraints: any[]) => {
    return [];
  };

  return {
    getAll,
    getById,
    add,
    update,
    remove,
    queryDocuments,
    where: () => {},
    orderBy: () => {}
  };
}