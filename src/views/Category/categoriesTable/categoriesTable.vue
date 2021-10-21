<template>
    <v-main>
        <v-toolbar flat>
            <v-toolbar-title>
                <v-icon color="black" large class="mr-5">mdi-view-list</v-icon>
                Categorias
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
                class="white--text text-button"
                color="#077173"
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
            <v-col cols="12" sm="7" md="7" lg="7">
                <v-text-field
                    label="Categoria"
                    color="#0A9396"
                >
                </v-text-field>
            </v-col>
            <v-col></v-col>
            <v-col cols="12" sm="4" md="4" lg="4">
                <v-btn
                    class="white--text text-button"
                    color="#EE9B00"
                >
                    Filtrar
                </v-btn>
                <v-btn
                    color="#BB3E03"
                    class="white--text ml-4 text-button"
                >
                    Limpar
                </v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-data-table
                    :loading="loading"
                    loading-text="Carregando categorias"
                    no-data-text="Nenhuma categoria encontrada"
                    :headers="headers"
                    :header-props="headerProps"
                    :items="categories"
                    :items-per-page="pageSize"
                    hide-default-footer
                >
                    <template v-slot:item.name="{ item }"> 
                        {{ item.name }}
                    </template>
                    <template v-slot:item.actions="{ item }">
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                    color="#077173"
                                    v-on="on"
                                    v-bind="attrs"
                                    small
                                    @click.stop="editCategory(item)"
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
                                    @click.stop="deleteCategory(item)"
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
        <v-row class="my-5 text-center d-flex" justify="center" align="center">
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
                        <v-icon>mdi-chevron-down</v-icon>
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
    </v-main>
</template>

<style scoped>

</style>

<script src="./index.js"></script>