import { toast } from 'react-toastify';

export const useCustomToast = () => {
  const showToast = (message: string, options = {}) => {
    toast(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      ...options,
    });
  };

  return { showToast };
};