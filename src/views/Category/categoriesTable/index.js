import Api from "../../../services/apiService/apiService";

export default {
    components: {
    },
    
    created() {
        this.getCategories();
    },

    data: () => ({
        apiService: Api,
        loading: false,
        filterVisible: false,
        page: 1,
        totalPages: 1,
        pageSize: 10,
        sizes: [10, 20, 40, 80, 160],
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
        editCategory(category) {
            this.currentCategory = category;
        },

        deleteCategory(category) {
            this.currentCategory = category;
        },

        async getCategories() {
            this.loading = true;

            await this.apiService.get("category/getAll")
                .then((response) => {
                    this.categories = response.data.content
                });

                this.loading = false;
        }
    },
};