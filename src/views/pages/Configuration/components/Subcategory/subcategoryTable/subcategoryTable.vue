<template>
    <v-main class="pa-0">
        <v-toolbar flat>
            <v-toolbar-title>
                <v-icon color="black" large class="mr-5">mdi-file-tree</v-icon>
                Subcategorias
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
                class="white--text text-button"
                color="#077173"
                @click="newSubcategory"
            >
                Adicionar
            </v-btn>
            <v-btn
                class="white--text text-button ml-4"
                color="#94D2BD"
                @click="filterVisible = !filterVisible"
            >
                Filtros
            </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <v-row class="pa-3 mt-5" v-show="filterVisible">
            <v-col cols="12" sm="4" md="4" lg="4">
                <v-text-field
                    label="Subcategoria"
                    color="#0A9396"
                    v-model="name"
                >
                </v-text-field>
            </v-col>
            <v-col cols="12" sm="4" md="4" lg="4">
                <v-autocomplete
                    color="#0A9396"
                    label="Categoria"
                    :items="categories"
                    item-text="name"
                    item-value="id"
                    :loading="categoryLoading"
                    v-model="categoryId"
                ></v-autocomplete>
            </v-col>
            <v-col cols="12" sm="4" md="4" lg="4">
                <v-btn
                    class="white--text text-button"
                    color="#EE9B00"
                    @click="filterTable"
                >
                    Filtrar
                </v-btn>
                <v-btn
                    color="#BB3E03"
                    class="white--text ml-4 text-button"
                    @click="resetFilter"
                >
                    Limpar
                </v-btn>
            </v-col>
        </v-row>      
        <v-row class="my-0 py-0">
            <v-col cols="12">
                <v-data-table
                    :loading="loading"
                    loading-text="Carregando subcategorias"
                    no-data-text="Nenhuma subcategoria encontrada"
                    :headers="headers"
                    :header-props="headerProps"
                    :items="subcategories"
                    :items-per-page="pageSize"
                    hide-default-footer
                >
                    <template v-slot:item.name="{ item }"> 
                        {{ item.name }}
                    </template>
                    <template v-slot:item.category="{ item }"> 
                        {{ getCategoryName(item.categoryId) }}
                    </template>
                    <template v-slot:item.actions="{ item }">
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                    color="#077173"
                                    v-on="on"
                                    v-bind="attrs"
                                    small
                                    @click.stop="editSubcategory(item)"
                                >
                                    <v-icon small color="#fff">mdi-pencil</v-icon>
                                </v-btn>
                            </template>
                            <span>Editar</span>
                        </v-tooltip>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                    color="#AE2012"
                                    class="ml-4"
                                    v-on="on"
                                    v-bind="attrs"
                                    small
                                    @click.stop="deleteSubcategory(item)"
                                >
                                    <v-icon small color="#fff">mdi-delete</v-icon>
                                </v-btn>
                            </template>
                            <span>Apagar</span>
                        </v-tooltip>
                    </template>
                </v-data-table>
            </v-col>
        </v-row>
        <v-row class="my-0 text-center d-flex" justify="center" align="center">
            <v-menu bottom offset-y>
                <template v-slot:activator="{ on, attrs}">
                    <v-btn
                        style="position: absolute; left: 0"
                        v-bind="attrs"
                        v-on="on"
                        color="#0BAAAD"
                        class="white--text"
                    >
                        Qtde: {{ pageSize }}
                        <v-icon class="ml-1">mdi-chevron-down</v-icon>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item
                        v-for="(size, i) in sizes"
                        :key="i"
                        @click="pageSize = size"
                    >
                        <v-list-item-title>{{ size }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>

            <v-pagination
                v-model="page"
                :length="totalPages"
                :total-visible="5"
                color="#0BAAAD"
            >
            </v-pagination>
        </v-row>

        <v-dialog v-model="createDialog" max-width="600">
            <ManageSubcategory title="Nova subcategoria" @close="closeModal" :key="dialogKey" />
        </v-dialog>

        <v-dialog v-model="editDialog" max-width="600">
            <ManageSubcategory title="Editar subcategoria" :subcategory="currentSubcategory" @close="closeModal" :key="dialogKey" />
        </v-dialog>

         <v-dialog v-model="deleteDialog" max-width="300">
            <v-sheet
                class="px-7 pt-7 pb-4 mx-auto text-center d-inline-block"
                color="blue-grey darken-3"
                dark
            >
                <div class="grey--text text--lighten-1 text-body-2 mb-4">
                    Tem certeza em remover esta subcategoria?
                </div>

                <v-btn class="ma-1" color="grey" text @click="deleteDialog = false">
                    Não
                </v-btn>

                <v-btn class="ma-1" color="#9B2226" text @click="removeSubcategory" :loading="deleteLoading">
                    Sim
                </v-btn>
            </v-sheet>
        </v-dialog>
    </v-main>
</template>

<style scoped>
.text-button {
    letter-spacing: initial !important;
}
</style>

<script src="./index.js"></script>