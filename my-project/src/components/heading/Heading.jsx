import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useDispatch,  } from "react-redux"
import { LOGOUT } from "../../constants/actionTypes"
import decode from 'jwt-decode';

const Heading = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const navigateTo = useNavigate();

  console.log(user)

  const logout = () => {
    dispatch({ type: LOGOUT });

    navigateTo('/auth');

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  return (
    <div className="section-padding h-24 flex justify-between border-b border-zinc-300 items-center">
        <Link to={'/'} className="logo font-bold text-2xl">
          Chatboard
        </Link>

        <div className="text-[14px] capitalize flex items-center gap-2 sm:gap-4 justify-end ">
         {user ? ( <>
              <div className="rounded-full text-white bg-green-700 p-2 h-8 w-8 flex items-center justify-center">
                <p>{user?.result.name[0]}</p>
              </div>
              <div>
                <p className=" font-semibold">{user?.result.name}</p>
              </div>
            </>
          ) : null}

          {!user ? <Link to={'/auth'} className="rounded-full text-white bg-green-700 py-2   px-8 ">
            {'Sign In'}
          </Link> : 
          <div onClick={logout}
          className="rounded-full text-white bg-green-700 py-2   px-8 ">
            {'Sign Out'}
          </div>}
          
        </div>
      </div>

  )
}

export default Heading