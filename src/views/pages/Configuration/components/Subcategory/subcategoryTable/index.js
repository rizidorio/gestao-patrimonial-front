import Api from "../../../../../../services/apiService/apiService";
import ManageSubcategory from "../manageSubcategory/manageSubcategory.vue";

export default {
    components: {
        ManageSubcategory,
    },
    
    created() {
        this.getCategories();
        this.getSubcategories();
    },

    data: () => ({
        apiService: Api,
        loading: false,
        deleteLoading: false,
        categoryLoading: false,
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
            categoryId: 0,
        },
        name: "",
        categoryId: 0,
        categories: [],
        subcategories: [],
        currentSubcategory: {},
        headers: [
            {
                text: "Subcategoria",
                align: "center",
                class: "item",
                value: "name",
            },
            {
                text: "Categoria",
                align: "center",
                class: "item",
                value: "category",
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
            this.getSubcategories();
        },

        newSubcategory() {
            this.createDialog = true;
            this.dialogKey = !this.dialogKey;
        },

        editSubcategory(subcategory) {
            this.currentSubcategory = subcategory;
            this.editDialog = true;
            this.dialogKey = !this.dialogKey;
        },

        deleteSubcategory(subcategory) {
            this.currentSubcategory = subcategory;
            this.deleteDialog = true;
        },

        filterTable() {
            this.filter.page = this.page;
            this.filter.pageSize = this.pageSize;
            this.filter.name = this.name;
            this.filter.categoryId = this.categoryId;

            this.getSubcategories();
        },

        getCategoryName(categoryId) {
            if (this.categories) {
                return this.categories.find(x => x.id === categoryId).name;
            }
        },

        resetFilter() {
            this.filter = {
                page: 1,
                pageSize: 10,
                name: "",
                categoryId: 0,
            };
            this.name = "";
            this.categoryId = 0;

            this.getSubcategories();
        },

        async getSubcategories() {
            this.loading = true;

            await this.apiService.post("subcategory/getAll", this.filter)
                .then((response) => {
                    this.totalPages = response.data.content.totalPages;
                    this.subcategories = response.data.content.objects;
                }).catch((err) => {
                    console.log(err)
                });

            this.loading = false;
        },

        async getCategories() {
            this.categoryLoading = true;

            await this.apiService.get("category/getAll")
                .then((response) => {
                    this.categories = response.data.content;
                }).catch((err) => {
                    console.log(err)
                });

            this.categoryLoading = false;
        },

        async removeSubcategory() {
            this.deleteLoading = true;

            const subcategoryId = this.currentSubcategory.id;

            await this.apiService.delete(`subcategory/delete/${subcategoryId}`)
                .then(() => {
                })
                .catch((err) => {
                    console.log(err)
                });
            
            this.deleteLoading = false;
            this.deleteDialog = false;
            this.getSubcategories();
        }
    },

    watch: {
        pageSize() {
            this.filter.pageSize = this.pageSize;
            this.filter.page = 1;
            this.getSubcategories();
        },

        page() {
            this.filter.page = this.page;
            this.getSubcategories();
        }
    },
};