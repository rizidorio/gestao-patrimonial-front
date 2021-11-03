import Categories from "./categories/categories.vue";
import Menu from "../Layouts/internal/menu/menu.vue";

const CategoriesRouter = {
    component: Menu,
    children: [
        {
            path: "/",
            name: "categories",
            component: Categories,
        },
    ],
};

export default CategoriesRouter;