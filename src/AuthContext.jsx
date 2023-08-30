import { createContext, useState } from "react";
export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [loginData, setLoginData] = useState("");
  console.log(loginData);
  return (
    <AuthContext.Provider value={[loginData, setLoginData]}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
// export const AuthUserContext = createContext();

// export const AuthUserProvider = ({children}) => {
//     const [isLogin, setIsLogin] = useState(false);
//     const user = (value) => {
//         setIsLogin(value);
//     }
//     return(
//         <AuthUserContext.Provider value={{isLogin, user, setIsLogin}}>
//             {children}
//         </AuthUserContext.Provider>
//     )
// }
