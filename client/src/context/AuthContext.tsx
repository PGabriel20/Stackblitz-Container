import { createContext } from 'react';
import { parseCookies, destroyCookie } from 'nookies';
import { useNavigate } from 'react-router-dom';
import { getUser, signIn } from '../service/api';
import { Session } from '../types';
import { useQueryClient, useMutation, useQuery } from 'react-query';

interface IAuthContext {
  children: React.ReactNode;
}

interface IAuthContextData {
  handleSignIn({ username, password }: { username: string; password: string }): void;
  handleSignOut(): void;
  session: Session | null | undefined;
  isAdmin: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

export const AuthProvider: React.FC<IAuthContext> = ({ children }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const cookies = parseCookies();

  const { data: session, isLoading: isSessionLoading } = useQuery('session', getUser, {
    retry: 0,
    refetchOnWindowFocus: false,
    enabled: !!cookies['session_token'],
    onError() {
      handleSignOut();
    },
  });

  const isAdmin = !!session && session.user.role === 'admin';

  const { isLoading, mutate: handleSignIn } = useMutation(signIn, {
    onSuccess: () => {
      navigate('/', { replace: true });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleSignOut = () => {
    destroyCookie(null, 'session_token');
    queryClient.removeQueries('session');
    navigate('/');
  };

  if (isSessionLoading) {
    return <p>Loading...</p>;
  }

  return (
    <AuthContext.Provider value={{ session, isAdmin, handleSignIn, handleSignOut, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
