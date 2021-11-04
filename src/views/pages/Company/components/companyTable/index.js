import Api from "../../../../../services/apiService/apiService";

export default {
    components: {
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
        companies: [],
        currentCompany: {},
        headers: [
            {
                text: "Nome Fantasia",
                align: "center",
                class: "item",
                value: "name",
            },
            {
                text: "CNPJ/CPF",
                align: "center",
                class: "item",
                value: "document",
            },
            {
                text: "Responsável",
                align: "center",
                class: "item",
                value: "responsible",
            },
            {
                text: "Celular",
                align: "center",
                class: "item",
                value: "cellPhone",
            },
            {
                text: "E-mail",
                align: "center",
                class: "item",
                value: "email",
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
            this.getCompanies();
        },

        newCompany() {
            this.createDialog = true;
            this.dialogKey = !this.dialogKey;
        },

        editCompany(company) {
            this.currentCompany = company;
            this.editDialog = true;
            this.dialogKey = !this.dialogKey;
        },

        deleteCompany(company) {
            this.currentCompany = company;
            this.deleteDialog = true;
        },

        filterTable() {
            this.filter.page = this.page;
            this.filter.pageSize = this.pageSize;
            this.filter.name = this.name;

            this.getCompanies();
        },

        resetFilter() {
            this.filter = {
                page: 1,
                pageSize: 10,
                name: "",
            };
            this.name = "";

            this.getCompanies();
        },

        async getCompanies() {
            this.loading = true;

            await this.apiService.post("company/getAll", this.filter)
                .then((response) => {
                    this.totalPages = response.data.content.totalPages;
                    this.companies = response.data.content.objects;
                }).catch((err) => {
                    console.log(err)
                });

            this.loading = false;
        },

        async removeCompany() {
            this.deleteLoading = true;

            const companyId = this.currentCompany.id;

            await this.apiService.delete(`company/delete/${companyId}`)
                .then(() => {
                })
                .catch((err) => {
                    console.log(err)
                });
            
            this.deleteLoading = false;
            this.deleteDialog = false;
            this.getCompanies();
        }
    },

    watch: {
        pageSize() {
            this.filter.pageSize = this.pageSize;
            this.filter.page = 1;
            this.getCompanies();
        },

        page() {
            this.filter.page = this.page;
            this.getCompanies();
        }
    },
};