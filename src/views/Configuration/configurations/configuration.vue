<template>
    <v-main>
        <v-toolbar flat color="#264653">
            <v-toolbar-title class="white--text">
                <v-icon dark large class="mx-5">
                    mdi-cogs
                </v-icon>
                Configurações
            </v-toolbar-title>
        </v-toolbar>
        <v-tabs
            v-model="tab"
            class="ma-5"
        >
            <v-tabs-slider color="#000"></v-tabs-slider>
            <v-tab href="#tabCategoria">
                Categorias
            </v-tab>
            <v-tab href="#tabTeste">
                Subcategorias
            </v-tab>
            <v-tab href="#tabTeste">
                Endereços
            </v-tab>
        </v-tabs>
    <v-tabs-items
        v-model="tab"
    >
        <v-tab-item value="tabCategoria">
            <v-container>
                <CategoriesTable />
            </v-container>
        </v-tab-item>
    </v-tabs-items>
    </v-main>
</template>

<style scoped>

</style>

<script src="./index.js"></script>