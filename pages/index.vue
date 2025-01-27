<script setup>
import Chart from "chart.js/auto";
const { locale, locales } = useI18n();

const alert = ref(true)

const statistic = ref()
const total_active_vehicles = ref("0")
const total_inactive_vehicles = ref("0")
const documents_by_month_labels = ref([])
const documents_by_month_data = ref([])
const documents_by_month = ref([])

async function initialize(){
  const { data  } = await $fetch(`${baseURL()}/dashboard/statistic`,{
    headers:{
      Authorization: `Bearer ${token()}`,
      lang: locale.value
    },
  })
      statistic.value = data;
      total_active_vehicles.value = data.total_active_vehicles;
      total_inactive_vehicles.value = data.total_inactive_vehicles;
      documents_by_month_labels.value = data.documents_by_month.map((item) => item.month_name)
      documents_by_month_data.value = data.documents_by_month.map((item) => item.counter)
      documents_by_month.value = data.documents_by_month
      DoughnutChart();
      LineChart();
  }

function DoughnutChart() {
  const ctx = document.getElementById("DoughnutChart");
  const myChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["مركبات غير فعالة" , "مركبات فعالة" ],
      datasets: [
        {
          data: [total_inactive_vehicles.value, total_active_vehicles.value],
          backgroundColor: ["#58595B" , "#3BA55B",],
          hoverOffset: 4,
          borderWidth: 2,
          borderColor: "white",
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          display: false,
        },
        y: {
          display: false,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
      cutout: 80,
      spacing: 10,
      borderRadius: 15
    },
  });
}

function fillMissingMonths() {
  const allMonths = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const monthMappings = {
    January: 'Jan',
    February: 'Feb',
    March: 'Mar',
    April: 'Apr',
    May: 'May',
    June: 'Jun',
    July: 'Jul',
    August: 'Aug',
    September: 'Sep',
    October: 'Oct',
    November: 'Nov',
    December: 'Dec'
  };
  const filledMonths = allMonths.map(month => {
    const foundMonth = documents_by_month.value.find(m => m.month_name === month);
    const shorthandMonth = monthMappings[month];
    if (foundMonth !== undefined) {
      return { month_name: shorthandMonth, counter: foundMonth.counter };
    } else {
      return { month_name: shorthandMonth, counter: 0 };
    }
  });
  return filledMonths;
}

async function LineChart() {
  const ctx = document.getElementById("LineChart");
  const myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: fillMissingMonths().map(month => month.month_name),
      datasets: [
        {
          label: '',
          data: fillMissingMonths().map(month => month.counter),
          backgroundColor: ['#3BA55B'],
          borderColor: ['#3BA55B'],
          borderWidth: 1,
          borderRadius: 8
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          display: false,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  });
}
let permissions = ref([])
onMounted(async () => {
  setTimeout(() => {
    alert.value = false;
  }, 15000);
  
  initialize()
  // DoughnutChart();
  // LineChart();
  const { data } = await $fetch(`${baseURL()}/dashboard/user/permissions`,{
      headers:{
        Authorization: `Bearer ${token()}`
      }
    })
      let all_permissions = data.permissions
      for( let permission of all_permissions ){
        permissions.value.push(permission)
      }
  })
  const hasPermission = (permission) => {
    return permissions.value.includes(permission);
  }
</script>

<template>
  <div class="mx-auto" style="width: 90%">
    <div v-if="user().price_list && user().price_list.error == true">
      <v-alert
        v-model="alert"
        border="start"
        close-label="Close Alert"
        :color="user().price_list.error == true ? 'error' : 'success' "
        variant="tonal"
        closable
        :dir="locale == 'ar' ? 'rtl' : 'ltr'"
      >
        {{ user().price_list?.message }}
      </v-alert>
    </div>
    <!-- Cards -->
    <div class="dashboard-cards">
      <div class="first-dashboard-card">
        <div class="card-section">
          <div>
          <v-icon>mdi-truck</v-icon>          
            <p> {{ $t("total no. of vehicles")}} </p>
           
          </div>
          <p v-if="user().super_user == 1 || hasPermission('statistic.index')"> {{ statistic?.total_vehicles_month }}</p>
        </div>
      </div>
      <div class="second-dashboard-card">
        <div class="card-section">
          <div>
          <v-icon>mdi-account-group</v-icon>
            <p>{{ $t("total no. of drivers")}}</p>
            
          </div>
          <p v-if="user().super_user == 1 || hasPermission('statistic.index')">{{ statistic?.total_drivers }}</p>
        </div>
      </div>

      <div class="third-dashboard-card">
        <div class="card-section">
          <div>
             <v-icon>mdi-file</v-icon>
            <p> {{ $t("total no. of Customers")}} </p>
          </div>
          <p v-if="user().super_user == 1 || hasPermission('statistic.index')">{{ statistic?.total_customers }}  </p>
        </div>
      </div>
    </div>

    <div class="dashboard-cards">
      <div class="third-dashboard-card">
        <div class="card-section">
          <div>
           <v-icon>mdi-file</v-icon>
            <p> {{ $t("total no. of current Customers")}} </p>
          </div>
          <p v-if="user().super_user == 1 || hasPermission('statistic.index')">{{ statistic?.total_customers_month }}  </p>
        </div>
      </div>

      <div class="second-dashboard-card">
        <div class="card-section">
          <div>
            <v-icon>mdi-file</v-icon>
            <p> {{ $t("total no. of transport document")}} </p>
          </div>
          <p v-if="user().super_user == 1 || hasPermission('statistic.index')">{{ statistic?.total_documents_today }} </p>
        </div>
      </div>

   
      


      <div class="first-dashboard-card">
        <div class="card-section">
          <div>
            <v-icon>mdi-file</v-icon>
            <p> {{ $t("total no. of month document")}} </p>
          </div>
          <p v-if="user().super_user == 1 || hasPermission('statistic.index')">{{ statistic?.documents_by_month.length }}</p>
        </div>
      </div>

    </div>

    <!-- Charts -->
    <div class="chart-section">
      <!-- Doughnut Chart -->
      <div class="vehicales-chart">
        <h3>{{ $t("number of vehicles") }}</h3>
        <canvas id="DoughnutChart" height="100" width="100"></canvas>
        <div class="d-flex mt-5">
          <div class="active-dot"></div>
          <p v-if="user().super_user == 1 || hasPermission('statistic.index')">{{ total_active_vehicles }}  {{ $t("active vehicles") }}</p>
        </div>

        <div class="d-flex">
          <div class="non-active-dot"></div>
          <p v-if="user().super_user == 1 || hasPermission('statistic.index')"> {{ total_inactive_vehicles }} {{ $t("non-active vehicles") }}</p>
        </div>
      </div>

      <!-- Bar Chart -->
      <div class="transport-chart">
        <h3 class="mb-4"> {{ $t("number of documents (per month)")}} </h3>
        <canvas id="LineChart" height="100" width="100" v-if="user().super_user == 1 || hasPermission('statistic.index')"></canvas>
      </div>
    </div>

   

  </div>
</template>

<style lang="scss">
.dashboard-cards{
  display: flex;
  justify-content: space-between;
  text-align: center;
  flex-wrap: nowrap;
  margin: 3rem 0px;
  .card-section{
    position: absolute;
    top: 20%;
    div{
      display: flex;
      justify-content: center;
      align-items: center;
      .v-icon{
        font-size: 60px;
        color: white;
        margin-right: 10px
      }
      p{
        font-size: 24px;
        margin-right: 10px;
        text-align: right;
        font-weight: 400;
      }
    }
    p{
      font-size: 38px;
      color: white;
      font-weight: 700;
    }
  }
}

%chart-shared{
  border-radius: 21px;
  background-color: white;
  padding: 20px;
}
.chart-section{
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
  .vehicales-chart{
    @extend %chart-shared; 
    height: 409px;
    width: 29%;
    #DoughnutChart{
      width: 100% !important;
      height: 250px !important;
    }
  }
  .transport-chart{
    @extend %chart-shared; 
    height: 409px;
    width: 69%;
    #LineChart{
      height: 300px !important;
      width: 75% !important;
      margin: auto;
    }
  }
}

%active-shared{
  width: 27.61px;
  height: 18.61px;
  border-radius: 9px;
  margin-left: 15px;
}

.active-dot{
  @extend %active-shared;
  background: $main-color
}
.non-active-dot{
  @extend %active-shared;
  background: $page-header-color
}

.second-header{
  color: $head-color
}

%bars{
  display: flex;
  align-items: center;
  height:109px;
  border-radius: 15px;
  background: white;
  padding: 10px;
  p{
    margin-right: 20px;
  }
}

.dashboard-firstBar{
  @extend %bars;
}

.dashboard-secondBar{
  @extend %bars;
}

%before-bars{
  content: '';
  width: 23.89px;
  height: 109px;
  border-radius: 0px 15px 15px 0px !important;
  margin-right: -10px;
}

.dashboard-firstBar::before{
  @extend %before-bars;
  background: $main-color;
}

.dashboard-secondBar::before{
  @extend %before-bars;
  background: $second-color;
}

</style>