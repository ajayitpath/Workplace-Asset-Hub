import { useMemo } from "react"
import URLS from "../constants/urls"
import Login from "../containers/auth/login"
import Signup from "../containers/auth/signup"
import ForgotPassword from "../containers/auth/ForgotPassword"
import ResetPassword from "../containers/auth/ResetPassword"
import OtpVerification from "../containers/auth/OtpVerification"
import Dashboard from "../containers/Admin/Dashboard"
import AssetManegement from "../containers/Admin/AssetManegement";
import Home from "../components/Home";

const useRoutes = () => {
    const allRoutes = useMemo(() => [
        {
            id:"root",
            path:URLS.INITIAL,
            element: <Home/>,
            isAuth:true,
        },
        {
            id:"login",
            path:URLS.LOGIN,
            element: <Login />,
            isAuth:true,
        },
        {
            id:"signup",
            path:URLS.SIGNUP,
            element: <Signup />,
            isAuth:true,
        },
        {
            id:"forgotPassword",
            path:URLS.FORGOT_PASSWORD,
            element: <ForgotPassword />,
            isAuth:true,
        },
        {
            id:"resetPassword",
            path:URLS.RESET_PASSWORD,
            element: <ResetPassword />,
            isAuth:true,
        },
        {
            id:"verifyEmail",
            path:URLS.VERIFY_EMAIL,
            element: <OtpVerification />,
            isAuth:true,
        },
        {
            id:"dashboard",
            path:URLS.DASHBOARD,
            element: <Dashboard/>,
            isPrivate:true,
        },
        {
            id:"asset-management",
            path:URLS.ASSETMANAGE,
            element: <AssetManegement/>,
            isPrivate:true,
        },
        {
            id:"profile",
            path:URLS.PROFILE,
            element: <div>Profile</div>,
            isPrivate:true,
        },
        {
            id:"settings",
            path:URLS.SETTINGS,
            element: <div>Settings</div>,
            isPrivate:true,
        },
        {
            id:"help",
            path:URLS.HELP,
            element: <div>Help</div>,
            isPrivate:true,
        },
        {
            id:"notFound",
            path:URLS.NOT_FOUND,
            element: <div>404 Not Found</div>,
            isPrivate:false,
        }
    ], []);
    const authRoutes = useMemo(() => {
        return allRoutes.filter(route => route.isAuth)
    }, [allRoutes])
    const privateRoutes = useMemo(() => {
        return allRoutes.filter(route => route.isPrivate)
    }, [allRoutes])

    return {allRoutes, authRoutes, privateRoutes}
}
export default useRoutes;