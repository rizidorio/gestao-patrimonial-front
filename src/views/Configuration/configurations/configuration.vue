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
            <v-tab class="mr-5" href="#tabCategory">
                Categorias
            </v-tab>
            <v-tab class="mr-5" href="#tabSubcategory">
                Subcategorias
            </v-tab>
            <v-tab href="#tabTeste">
                Endereços
            </v-tab>
        </v-tabs>
    <v-tabs-items
        v-model="tab"
    >
        <v-tab-item value="tabCategory">
            <v-container>
                <CategoriesTable />
            </v-container>
        </v-tab-item>
        <v-tab-item value="tabSubcategory">
            <v-container>
                <SubcategoryTable />
            </v-container>
        </v-tab-item>
    </v-tabs-items>
    </v-main>
</template>

<style scoped>

</style>

<script src="./index.js"></script>