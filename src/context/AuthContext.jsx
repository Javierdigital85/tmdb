// import { createContext, useState } from "react";

// //Definimos un initialState para nuestro contexto
// const initialState = {
//   name: null,
//   lastName: null,
//   email: null,
//   // user: null, //info del usuario
//   // isAuthenticated: false, //si esta o no logueado
//   toggleAuth: () => null, //funcion para actualizar el contexto
// };

// export const AuthContext = createContext(initialState);

// //componente Provider
// const AuthContextProvider = ({ children }) => {
//   const [userData, setUserData] = useState({
//     name: null,
//     lastName: null,
//     email: null,
//     // isAuthenticated: false,
//   });

//   const toggleAuth = (user) => {
//     setUserData(user);
//   };

//   return (
//     <AuthContext.Provider value={{ ...userData, toggleAuth }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContextProvider;
