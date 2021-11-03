import ConfigurationPage from "./configurations/configuration.vue";
import Layout from "../Layouts/internal/layout/layout.vue";

const ConfigurationRoutes = {
    component: Layout,
    children: [
        {
            path: "/",
            name: "configuration",
            component: ConfigurationPage,
        },
    ],
};

export default ConfigurationRoutes;