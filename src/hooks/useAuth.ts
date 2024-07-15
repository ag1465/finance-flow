import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const useAuth = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  return isAuthenticated;
};

export default useAuth;
