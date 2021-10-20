//import Api from "../../../services/apiService/apiService";

export default {
    created() {
        this.userLogged = JSON.parse(localStorage.getItem("userLogged"))
    },

    data: () => ({
        group: null,
        userLogged: {},
        items: [
            { title: 'Painel', icon: 'mdi-chart-tree' },
            { title: 'Empresas', icon: 'mdi-city' },
            { title: 'Filiais', icon: 'mdi-store-outline' },
            { title: 'Setores', icon: 'mdi-sitemap' },
            { title: 'Bens', icon: 'mdi-package-variant-closed' },
            { title: 'Usuários', icon: 'mdi-account-multiple-outline' },
            { title: 'Configurações', icon: 'mdi-cogs' },
          ],
    }),

    methods: {
        
    },
};