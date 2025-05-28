import { useMemo } from "react"
import URLS from "../constants/urls"
import Dashboard from "../components/Admin/Dashboard/Dashboard"
import AssetManegement from "../components/Admin/AssetManegement/AssetManegement";
import Home from "../components/Home/Home";

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
            element: <Dashboard/>,
            isAuth:true,
        },
        {
            id:"asset-management",
            path:URLS.ASSETMANAGE,
            element: <AssetManegement/>,
            isAuth:true,
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