import Api from "../../../services/apiService/apiService";
import CategoriesTable from "../../Category/categoriesTable/categoriesTable.vue"


export default {
    components: {
        CategoriesTable,
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