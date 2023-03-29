import { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useLocation, Navigate } from "react-router-dom";
import { loginServices } from "../services/auth.js";
import { login } from "../store/User/User";
import { stateUser } from "../store/User/User";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const userState = useSelector(stateUser);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  //   useEffect(() => {
  //     userRef.current.focus();
  //   }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    loginServices(user, pwd)
      .then((res) => {
        console.log(res);
        var roles =
          res?.username === "kminchelle" ? ["admin"] : ["user"];
        dispatch(
          login({
            user: res,
            roles: roles,
          })
        );
        setUser("");
        setPwd("");
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.log(err);
        if (!err?.response) {
          setErrMsg("No Server Response");
        } else if (err.response?.status === 400) {
          setErrMsg("Missing Username or Password");
        } else if (err.response?.status === 401) {
          setErrMsg("Unauthorized");
        } else {
          setErrMsg("Login Failed");
        }
        errRef.current.focus();
      });
  };

  //     try {
  //         const response = await axios.post(LOGIN_URL,
  //             JSON.stringify({ user, pwd }),
  //             {
  //                 headers: { 'Content-Type': 'application/json' },
  //                 withCredentials: true
  //             }
  //         );
  //         console.log(JSON.stringify(response?.data));
  //         //console.log(JSON.stringify(response));
  //         const accessToken = response?.data?.accessToken;
  //         const roles = response?.data?.roles;
  //         setAuth({ user, pwd, roles, accessToken });
  //         setUser('');
  //         setPwd('');
  //         navigate(from, { replace: true });
  //     } catch (err) {
  //         if (!err?.response) {
  //             setErrMsg('No Server Response');
  //         } else if (err.response?.status === 400) {
  //             setErrMsg('Missing Username or Password');
  //         } else if (err.response?.status === 401) {
  //             setErrMsg('Unauthorized');
  //         } else {
  //             setErrMsg('Login Failed');
  //         }
  //         errRef.current.focus();
  //     }
  // }

  return (
    <>
      {!userState.user ? (
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
            <button>Sign In</button>
          </form>
          {/* <p>
            Need an Account?
            <br />
            <span className="line">
              <Link to="/register">Sign Up</Link>
            </span>
          </p> */}
        </section>
      ) : (
        <Navigate to="/" state={{ from: location }} replace />
      )}
    </>
  );
};

export default Login;
