import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useAppSelector } from './reduxHooks';

export const useAuthGuard = () => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const router = useRouter();

  const requireAuth = (message: string = '🔒 Увійдіть, щоб виконати цю дію'): boolean => {
    if (!isAuthenticated) {
      toast.info(message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      
      router.push('/login');
      return false;
    }
    return true;
  };

  return { 
    isAuthenticated, 
    user, 
    requireAuth 
  };
};