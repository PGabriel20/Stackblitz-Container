import { createContext, useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import { parseCookies, destroyCookie } from 'nookies';
import { useNavigate } from 'react-router-dom';
import { getUser, signIn } from '../service/api';
import { Session } from '../types';

interface IAuthContext {
  children: React.ReactNode;
}

interface IAuthContextData {
  handleSignIn(username: string, password: string): Promise<void>;
  handleSignOut(): void;
  session: Session | null;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

export const AuthProvider: React.FC<IAuthContext> = ({ children }) => {
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getSession = async () => {
      const cookies = parseCookies();

      const sessionToken = cookies['session_token'];

      if (sessionToken && !session) {
        const response = await getUser();
        setSession(response.data);
      }

      setIsLoading(false);
    };

    getSession();
  }, [session]);

  const handleSignIn = async (username: string, password: string) => {
    try {
      const response = await signIn(username, password);
      setSession(response.data);

      navigate('/');
    } catch (error) {
      console.log({ error });
    }
  };

  const handleSignOut = () => {
    destroyCookie(null, 'session_token');
    setSession(null);
    navigate('/');
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <AuthContext.Provider value={{ session, handleSignIn, handleSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
