import Api from "../../../../../../services/apiService/apiService";

export default {
    props: {
        title: String,
        subcategory: Object,
    },

    created() {
        if (this.subcategory) {
            this.currentSubcategory = this.subcategory;
            this.categoryId = this.subcategory.categoryId;
            this.isEditing = true;
        }

        this.getCategories();
    },

    data: () => ({
        apiService: Api,
        step: 0,
        errorMessage: "",
        successMessage: "",
        loading: false,
        categoryLoading: false,
        valid: true,
        alterDialog: false,
        changeData: false,
        error: false,
        categoryId: 0,
        categories: [],
        currentSubcategory: {
            id: 0,
            name: "",
            categoryId: 0,
        },
        nameRules: [
            (value) => !!value || "Nome da subcategoria é obrigatório",
            (value) => value && value.length <= 100 || "Nome da subcategoria deve ter no máximo 100 caracteres"
        ],
        categoryRules: [
            (value) => !!value || "Categoria é obrigatória",
        ],
    }),

    computed: {
        caption() {
            return this.isEditing ? "Atualização efetuada" : "Cadastrar efetuado";
        },

        buttonText() {
            switch (this.step) {
                case 0:
                    return this.isEditing ? "Atualizar" : "Cadastrar";
                default:
                    return "Fechar";
            }
        }
    },

    methods: {
        closeModal() {
            this.changeData = false;
            this.close();
        },

        close() {
            if (this.changeData) {
                this.alterDialog = true;
            } else {
                this.$emit("close");
            }
        },

        async nextStep() {
            if (this.step === 0) {
                if (this.$refs.form.validate()) {
                    this.submitForm();
                } 
            } else {
                this.closeModal();
            }
        },

        async submitForm() {
            this.loading = true;

            const subcategory = {
                Id: this.currentSubcategory.id,
                Name: this.currentSubcategory.name,
                CategoryId: this.categoryId,
            };

            const url = this.isEditing ? "subcategory/update" : "subcategory/create";

            if (this.isEditing) {
                await this.apiService.put(url, subcategory)
                    .then((response) => {
                        console.log(response.data)
                        this.step++;
                        this.successMessage = response.data.message;
                    })
                    .catch((err) => {
                        console.log(err)
                    });
            } else {
                await this.apiService.post(url, subcategory)
                    .then((response) => {
                        console.log(response.data)
                        this.step++;
                        this.successMessage = response.data.message;
                    })
                    .catch((err) => {
                        console.log(err)
                    });
            }
            
            this.loading = false;
            this.changeData = false;
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
    },

    watch: {
        currentSubcategory: {
            deep: true,
            handler() {
                this.changeData = true;
            },
        }
    },
};