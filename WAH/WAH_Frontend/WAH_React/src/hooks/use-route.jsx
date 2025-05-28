import { useMemo } from "react"
import URLS from "../constants/urls"
import Login from "../containers/auth/login"
import Signup from "../containers/auth/signup"
import ForgotPassword from "../containers/auth/ForgotPassword"
import ResetPassword from "../containers/auth/ResetPassword"
import OtpVerification from "../containers/auth/OtpVerification"

const useRoutes = () => {
    const allRoutes = useMemo(() => [
        {
            id:"root",
            path:URLS.INITIAL,
            element: <div>Initial</div>,
            isPrivate:true,
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
            element: <div>Dashboard</div>,
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