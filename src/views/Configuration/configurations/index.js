import Api from "../../../services/apiService/apiService";
import CategoriesTable from "../../Category/categoriesTable/categoriesTable.vue"
import SubcategoryTable from "../../Subcategory/subcategoryTable/subcategoryTable.vue";


export default {
    components: {
        CategoriesTable,
        SubcategoryTable,
    },
    
    created() {
        
    },

    data: () => ({
        apiService: Api,
        tab: null,
    }),

    methods: {
        
    },
};