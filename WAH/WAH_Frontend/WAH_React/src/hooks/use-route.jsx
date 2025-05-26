import { useMemo } from "react"
import URLS from "../constants/urls"

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
            element: <div>Login</div>,
            isAuth:true,
        },
        {
            id:"signup",
            path:URLS.SIGNUP,
            element: <div>Signup</div>,
            isAuth:true,
        },
        {
            id:"forgotPassword",
            path:URLS.FORGOT_PASSWORD,
            element: <div>Forgot Password</div>,
            isAuth:true,
        },
        {
            id:"resetPassword",
            path:URLS.RESET_PASSWORD,
            element: <div>Reset Password</div>,
            isAuth:true,
        },
        {
            id:"verifyEmail",
            path:URLS.VERIFY_EMAIL,
            element: <div>Verify Email</div>,
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