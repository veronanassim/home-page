<script setup>
import * as XLSX from "xlsx";
import fileSaver from 'file-saver';
const { saveAs } = fileSaver;

const { t } = useI18n({
    useScope: "local",
})
const { locale, locales } = useI18n();
const localePath = useLocalePath()

const users = ref([])

let url = ref([]);
let next_url = ref("");
let prev_url = ref("");
const currentPage = ref("")

//Get Table Data
async function initialize(page=1){
  const { data , links, meta } = await $fetch(`${baseURL()}/dashboard/language?page=${page}`,{
    headers:{
      Authorization: `Bearer ${token()}`,
      lang: locale.value
    },
  })
  users.value = data;
  url.value = meta.links.slice(1, -1);
  next_url.value = links.next?.split("=")[1];
  prev_url.value = links.prev?.split("=")[1];

  currentPage.value = meta.current_page
  return data
}
const headers = [
    { title: t("name") , key: "name" , sortable: false, align: "center" },
    { title: t("language code") , key: "language_code" , sortable: false, align: "center" },
    { title: t("is default") , key: "isDefault" , sortable: false, align: "center"  },
    { title: t("actions"), key: "actions", sortable: false, width: "100" , align: "center"}
]

let permissions = ref([])
onMounted( async() => {
  initialize()
  const { data } = await $fetch(`${baseURL()}/dashboard/user/permissions`,{
    headers:{
      Authorization: `Bearer ${token()}`
    }
  })
  let all_permissions = data.permissions
  for( let permission of all_permissions ){
    permissions.value.push(permission.name)
  }
})
const hasPermission = (permission) => {
  return permissions.value.includes(permission);
}

const exportToExcel = async () => {
  const data = await initialize(currentPage.value);

  const headers = [t("name"), t("language code"), t("is default")]
  const formattedData = data.map((item) => ({
    [t('name')]: item.name,
    [t('language code')]: item.language_code,
    [t('is default')]: item.is_default == 1 ? t('yes') : t('no')
  }));

  const worksheet = XLSX.utils.json_to_sheet(formattedData, { header: headers });

  // Set column width for all columns
  const columnWidth = { wch: 20 };
  const columnCount = headers.length;
  const columnIndexes = Array.from({ length: columnCount }, (_, index) => XLSX.utils.encode_col(index));
  
  columnIndexes.forEach((columnIndex) => {
    worksheet['!cols'] = worksheet['!cols'] || [];
    worksheet['!cols'].push(columnWidth);
  });

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const dataBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(dataBlob, 'Language.xlsx');
}

</script>

<template>
  <div>
    <v-card>
      <div class="page-title">
        
        <span>
          <nuxt-link to="/">
            {{ $t("languages") }}
          </nuxt-link>
        </span> / 
        <span class="active-page">{{ $t("languages management") }}</span>
        
        <h1>{{ $t("languages management") }}</h1>
      </div>

      <v-row class="mt-5">
        <v-col cols="12" md="10">
          <!-- <users-filter-component /> -->
        </v-col>
        <v-col cols="12" md="2">
          <nuxt-link 
            :to="localePath('/languages/create')" 
            v-if="user().super_user == 1 || hasPermission('language.store')"
          >
           <v-btn class="solid-btn">{{ $t("add language") }}</v-btn>
          </nuxt-link>
        </v-col>
      </v-row>

      <v-card-text>
        <div class="export-section">
          <v-btn class="cancel-btn" @click="exportToExcel">{{ $t("export") }}</v-btn>
        </div>

        <v-data-table
          :headers="headers"
          :items="users"
          item-value="id"
          show-select
        >

            <template v-slot:[`item.actions`]="{ item }">
                <v-row>
                  <nuxt-link 
                    :to="localePath(`/languages/${item.selectable.id}`)"
                    v-if="user().super_user == 1 || hasPermission('language.update')"
                  >
                    <v-icon class="table-icons" >mdi-pencil</v-icon>
                  </nuxt-link>
                
                <DeleteItemComponent
                  url="dashboard/language"
                  :id="item.selectable.id"
                  @delete-function="initialize"
                  :name="item.selectable.name"
                  :text="$t('this language')"
                  v-if="user().super_user == 1 || hasPermission('language.destroy')"
                />
                </v-row>
                
          </template>

          <template v-slot:[`item.isDefault`]="{item}">
            <v-col class="active-item" v-if="item.selectable.is_default == 1">{{ $t("yes")}}</v-col>
            <v-col class="non-active-item" v-else>{{ $t("no") }} </v-col>
          </template>

        
        </v-data-table>
        <Pagination
          :initialize="initialize"
          :links="url"
          :next_url="next_url"
          :prev_url="prev_url"
        />
      </v-card-text>
    </v-card>
    
  </div>
</template>

<style lang="scss" scoped>
.mdi-delete{
    color: $error-color;
}
.permission-box{
  display:flex;
   flex-wrap: wrap;
}
.permission-data {
    margin: 0.5rem;
}
.permission-item{
    margin: 1rem;
    border: 1px solid gainsboro;
    width: fit-content;
    margin: 4px auto;
    border-radius: 50px;
    min-width: 250px;
}
</style>