<template>
    <v-main>
        <v-toolbar flat color="#264653">
            <v-toolbar-title class="white--text">
                <v-icon dark large class="mx-5">
                    mdi-city
                </v-icon>
                Empresas
            </v-toolbar-title>
        </v-toolbar>
        <v-tabs align-with-title centered v-model="tab" class="ma-5">
            <v-tabs-slider color="#000"></v-tabs-slider>
            <v-tab class="mr-5" href="#tabCompany">
                Matriz
            </v-tab>
            <v-tab class="mr-5" href="#tabBranchOffice">
                Filiais
            </v-tab>
            <v-tab class="mr-5" href="#tabDepertment">
                Setores
            </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
            <v-tab-item value="tabCompany">
                <v-container>
                    <CompanyTable />
                </v-container>
            </v-tab-item>
            <v-tab-item value="tabBranchOffice">
                <!-- <v-container>
                    <SubcategoryTable />
                </v-container> -->
            </v-tab-item>
            <v-tab-item value="tabDepartment">
                <!-- <v-container>
                    <SubcategoryTable />
                </v-container> -->
            </v-tab-item>
        </v-tabs-items>
        
    </v-main>
</template>

<style scoped>

</style>

<script src="./index.js"></script>