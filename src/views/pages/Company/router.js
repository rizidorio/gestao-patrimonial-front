import CompanyPage from "./company/company.vue";
import Layout from "../../Layouts/internal/layout/layout.vue"

const CompanyRoutes = {
    component: Layout,
    children: [
        {
            path: "/",
            name: "company",
            component: CompanyPage,
        },
    ],
};

export default CompanyRoutes;