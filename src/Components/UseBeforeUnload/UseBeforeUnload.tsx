import { useEffect } from 'react';

const useBeforeUnload = (shouldWarn: boolean): void => {
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (shouldWarn) {
        const warningMessage = "You have unsaved changes. Are you sure you want to leave?";
        event.returnValue = warningMessage; 
        return warningMessage; 
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [shouldWarn]);
};

export default useBeforeUnload;
