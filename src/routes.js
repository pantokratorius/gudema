import About from "./pages/About"
import Cart from "./pages/Cart"
import Contacts from "./pages/Contacts"
import Home from "./pages/Home"
import Orders from "./pages/Orders"
import PageNotFound from "./pages/PageNotFound"
import Shop from "./pages/Shop"

export const authRoutes = [
    {
        path: '/',
        Component: Home
    },
    {
        path: '/about',
        Component: About
    },
    {
        path: '/contacts',
        Component: Contacts
    },
    {
        path: '/shop',
        Component: Shop
    },
    {
        path: '/cart',
        Component: Cart
    },
    {
        path: '/orders',
        Component: Orders
    },
    {
        path: '/404',
        Component: PageNotFound
    },
]
