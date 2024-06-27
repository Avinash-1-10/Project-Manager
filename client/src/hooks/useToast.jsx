import { useState, useCallback, useEffect } from 'react';

const useToast = () => {
    const [toasts, setToasts] = useState([]);
  
    const addToast = useCallback((message, type = 'info') => {
      const id = Date.now();
      setToasts((prevToasts) => [
        ...prevToasts,
        { id, message, type },
      ]);
    }, []);
  
    const removeToast = useCallback((id) => {
      setToasts((prevToasts) => prevToasts.filter(toast => toast.id !== id));
    }, []);
  
    // Handle automatic closing of toasts
    useEffect(() => {
      const timeoutIds = toasts.map((toast) =>
        setTimeout(() => removeToast(toast.id), 2500) // 2.5 seconds
      );
  
      // Cleanup function to clear timeouts when component unmounts
      return () => timeoutIds.forEach((id) => clearTimeout(id));
    }, [toasts, removeToast]);
  
    return { toasts, addToast, removeToast };
  };
  
  export default useToast;
