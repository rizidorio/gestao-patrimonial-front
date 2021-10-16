import Login from "./Login/login.vue";
import Layout from "../Layouts/external/layout.vue";

const AuthRoutes = {
    component: Layout,
    children: [
        {
            path: "",
            name: "login",
            component: Login,
        },
    ],
};

export default AuthRoutes;