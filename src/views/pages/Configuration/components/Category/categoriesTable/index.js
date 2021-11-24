import Api from "../../../../../../services/apiService/apiService";
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
        deleteLoading: false,
        filterVisible: false,
        createDialog: false,
        editDialog: false,
        deleteDialog: false,
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
            this.editDialog = false;
            this.getCategories();
        },

        newCategory() {
            this.createDialog = true;
            this.dialogKey = !this.dialogKey;
        },

        editCategory(category) {
            this.currentCategory = category;
            this.editDialog = true;
            this.dialogKey = !this.dialogKey;
        },

        deleteCategory(category) {
            this.currentCategory = category;
            this.deleteDialog = true;
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
                    this.totalPages = response.data.content.totalPages;
                    this.categories = response.data.content.objects;
                }).catch((err) => {
                    console.log(err)
                });

            this.loading = false;
        },

        async removeCategory() {
            this.deleteLoading = true;

            const categoryId = this.currentCategory.id;

            await this.apiService.delete(`category/delete/${categoryId}`)
                .then(() => {
                })
                .catch((err) => {
                    console.log(err)
                });
            
            this.deleteLoading = false;
            this.deleteDialog = false;
            this.getCategories();
        }
    },

    watch: {
        pageSize() {
            this.filter.pageSize = this.pageSize;
            this.filter.page = 1;
            this.getCategories();
        },

        page() {
            this.filter.page = this.page;
            this.getCategories();
        }
    },
};