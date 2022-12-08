import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useHistory, useLocation } from "react-router-dom";
import {getExtraData, getUserInfo} from '../service/utils';
import FullScreenTips from '../components/tips/FullScreenTips';
import {getByTenantId} from '../service/auth';

interface AuthContextType {
  // We defined the user type in `index.d.ts`, but it's
  // a simple object with email, name and password.
  user?: any;
  extraData?: any;
  loading: boolean;
  error?: any;
  setUserState: (user: any) => void;
}

const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

// Export the provider as we need to wrap the entire app with it
type AuthProviderProps = {
  children: ReactNode;
}
export const AuthProvider: React.FC<AuthProviderProps> = (props) => {
  const [user, setUser] = useState<any>();
  const [extraData, setExtraData] = useState<any>();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingInitial, setLoadingInitial] = useState<boolean>(true);

  const params = new URLSearchParams(document.location.search);
  // We are using `react-router` for this example,
  // but feel free to omit this or use the
  // router of your choice.
  //const history = useHistory();
  //const location = useLocation();

  // If we change page, reset the error state.
  // useEffect(() => {
  //   if (error) setError(null);
  // }, [location.pathname]);

  // Check if there is a currently active session
  // when the provider is mounted for the first time.
  //
  // If there is an error, it means there is no session.
  //
  // Finally, just signal the component that the initial load
  // is over.
  useEffect(() => {
    // usersApi.getCurrentUser()
    //   .then((user) => setUser(user))
    //   .catch((_error) => {})
    //   .finally(() => setLoadingInitial(false));
    let userInfo = getUserInfo();
    userInfo && setUser(userInfo);

    getByTenantId({tenantId: params.get('tenantId')}).then(async (res: API.Response) => {
      if (res.success && res.data) {
        setExtraData(res.data);
      }

      setLoadingInitial(false);
    })

  // @ts-ignore
  }, []);

  // Flags the component loading state and posts the login
  // data to the server.
  //
  // An error means that the email/password combination is
  // not valid.
  //
  // Finally, just signal the component that loading the
  // loading state is over.
  // function login(email: string, password: string) {
  //   setLoading(true);
  //
  //   sessionsApi.login({ email, password })
  //     .then((user) => {
  //       setUser(user);
  //       history.push("/");
  //     })
  //     .catch((error) => setError(error))
  //     .finally(() => setLoading(false));
  // }

  function setUserState(user: any) {
    setUser(user);
  }

  // Sends sign up details to the server. On success we just apply
  // the created user to the state.
  // function signUp(email: string, name: string, password: string) {
  //   setLoading(true);
  //
  //   usersApi.signUp({ email, name, password })
  //     .then((user) => {
  //       setUser(user);
  //       history.push("/");
  //     })
  //     .catch((error) => setError(error))
  //     .finally(() => setLoading(false));
  // }

  // Call the logout endpoint and then remove the user
  // from the state.
  // function logout() {
  //   sessionsApi.logout().then(() => setUser(undefined));
  // }

  // Make the provider update only when it should.
  // We only want to force re-renders if the user,
  // loading or error states change.
  //
  // Whenever the `value` passed into a provider changes,
  // the whole tree under the provider re-renders, and
  // that can be very costly! Even in this case, where
  // you only get re-renders when logging in and out
  // we want to keep things very performant.
  const memoedValue = useMemo(
    () => ({
      user,
      extraData,
      loading,
      error,
      setUserState,
    }),
    [user,extraData, loading, error]
  );

  // We only want to render the underlying app after we
  // assert for the presence of a current user.
  return (
    <AuthContext.Provider value={memoedValue}>
      {!loadingInitial && props.children}
      {user?.is_snapshotuser === 1 && <FullScreenTips type={'wx-auth'} blur={true}/>}
    </AuthContext.Provider>
  );
}

// Let's only export the `useAuth` hook instead of the context.
// We only want to use the hook directly and never the context component.
export default function useAuth() {
  return useContext(AuthContext);
}
