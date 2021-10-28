import Api from "../../../services/apiService/apiService";
import ManageCategory from "../manageCategory/manageCategory.vue";

export default {
    components: {
        ManageCategory,
    },
    
    created() {
        this.getCategories();
    },

    data: () => ({
        apiService: Api,
        loading: false,
        filterVisible: false,
        createDialog: false,
        dialogKey: false,
        page: 1,
        totalPages: 1,
        pageSize: 10,
        sizes: [10, 20, 40, 80, 160],
        filter: {
            page: 1,
            pageSize: 10,
            name: "",
        },
        name: "",
        categories: [],
        currentCategory: {},
        headers: [
            {
                text: "Categoria",
                align: "center",
                class: "item",
                value: "name",
            },
            {
                text: "Ações",
                align: "center",
                class: "item",
                value: "actions",
            },
        ],
        headerProps: {
            sortByText: "Ordenar por",
        },
    }),

    methods: {
        closeModal() {
            this.createDialog = false;
            this.getCategories();
        },

        newCategory() {
            this.createDialog = true;
            this.dialogKey = !this.dialogKey;
        },

        editCategory(category) {
            this.currentCategory = category;
        },

        deleteCategory(category) {
            this.currentCategory = category;
        },

        filterTable() {
            this.filter.page = this.page;
            this.filter.pageSize = this.pageSize;
            this.filter.name = this.name;

            this.getCategories();
        },

        resetFilter() {
            this.filter = {
                page: 1,
                pageSize: 10,
                name: "",
            };
            this.name = "";

            this.getCategories();
        },

        async getCategories() {
            this.loading = true;

            await this.apiService.post("category/getAll", this.filter)
                .then((response) => {
                    console.log(response.data.content)
                    this.totalPages = response.data.content.totalPages;
                    this.categories = response.data.content.objects;
                }).catch((err) => {
                    console.log(err)
                });

            this.loading = false;
        }
    },
};