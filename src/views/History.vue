<template>
  <div class="hisotry">
    <div class="container-fluid">
      <Collapse />
      <NavbarFood type="history"/>
      <div class="row">
        <Sidebar />
        <div class="col p-4">
          <div class="row shadow">
            <div class="col-12 col-md-6 col-lg-4 mb-3 ">
              <div class="card shadow1">
                <div class="card-body">
                  Todays Income
                  <h4 class="income">RP. 1000.000</h4>
                  <p>+2% Yesterday</p>
                </div>
                <div class="circle1"></div>
                <div class="circle2"></div>
                <div class="circle3"></div>
              </div>
            </div>

            <div class="col-12 col-md-6 col-lg-4 mb-3">
              <div class="card shadow2">
                <div class="card-body">
                  Orders
                  <h4 class="income">3.270</h4>
                  <p>+5% Last Week</p>
                  <div class="circle1"></div>
                  <div class="circle2"></div>
                  <div class="circle3"></div>
                </div>
              </div>
            </div>

            <div class="col-12 col-md-6 col-lg-4 mb-3">
              <div class="card shadow3">
                <div class="card-body">
                  This Year Income
                  <h4 class="income">RP. 100.000.000.000</h4>
                  <p>+10% Last Year</p>
                  <div class="circle1"></div>
                  <div class="circle2"></div>
                  <div class="circle3"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="row mt-5 shadow ">
            <div class="col-lg-12 col-md-6 col-sm-6 col-12  chart">
                <h4>Revenue Line</h4>
              <chart class="table-responsive"
                :options="chartOptionsLine"
              style="width:100%"></chart>
            </div>
            <div class="col-lg-12 col-md-6 col-sm-6 col-12  chart">
                <h4>Revenue Bar</h4>
              <chart class="table-responsive"
                :options="chartOptionsBar"
              style="width:100%"></chart>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col mt-3 shadow">
              <h4>Tabel</h4>
              <table class="table">
                <thead>
                  <tr>
                    {{history_detail}}
                    <th scope="col">No</th>
                    <th scope="col">Invoice</th>
                    <th scope="col">Cashier</th>
                    <th scope="col">Date</th>
                    <th scope="col">Orders</th>
                    <th scope="col">Amount</th>
                  </tr>
                </thead>
                <tbody v-for="(history, index) in historys" :key="index">
                  <tr>
                    <th scope="row">{{index+1}}</th>
                    <td>{{history.invoice}}</td>
                    <td>{{history.cashier_name}}</td>
                    <td>{{history.orders_date}}</td>
                    <td>
                      <router-link to="/DetailHistory" class="btn btn-primary btn-sm">Detail Order</router-link>
                    </td>
                    <td>Rp. {{history.amount}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footers/>
  </div>
</template>

<script>
import { Bar, mixins } from 'vue-chartjs'
import Collapse from '../components/Collapse'
import NavbarFood from '../components/NavbarFood'
import Sidebar from '../components/Sidebar'
import footers from '../components/footer'
// import Card from '../components/Card'
// import Checkout from '../components/Checkout'
// import ModalAdd from '../components/ModalAdd'
// import ModalCheckout from '../components/ModalCheckout'
// import ModalAddProduct from '../components/ModalAddProduct'
// import ModalEditData from '../components/ModalEditData'
import axios from 'axios'
export default {
  mixins: [mixins.reactiveData],
  extends: Bar,
  name: 'History',
  components: {
    Collapse,
    NavbarFood,
    Sidebar,
    footers
  },
  data: () => ({
    chartOptionsBar: null,
    historys: [],
    joinHistory: [],
    name: null

  }),

  methods: {
    setHistory (data) {
      this.historys = data
    },
    setJoin (data) {
      this.joinHistory = data
    },
    async getData () {
      try {
        const result = await axios.get('http://localhost:3000/history/getAll')
        this.setHistory(result.data.data)
        const response = result.data.data
        const newData = response.map((e) => {
          return e.amount
        })
        const orderDate = response.map((e) => {
          return e.orders_date
        })

        // Line
        this.chartOptionsLine = {
          xAxis: {
            data: orderDate
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              type: 'line',
              data: newData
            }
          ],
          title: {
            text: 'Income every month',
            x: 'center',
            textStyle: {
              fontSize: 24
            }
          },
          color: ['#127ac2']
        }

        // Bar
        this.chartOptionsBar = {
          xAxis: {
            // ['01', '02', '03', '04', '05', '06', '07', '08', '019', '10', '11', '12']
            data: orderDate
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              type: 'bar',
              data: newData
            }
          ],
          title: {
            text: 'Income every month',
            x: 'center',
            textStyle: {
              fontSize: 24
            }
          },
          color: ['#127ac2']
        }
      } catch (error) {
        console.log(error)
      }
    },
    async getJoin () {
      try {
        const result = await axios.get('http://localhost:3000/history/getJoin')
        this.setJoin(result.data.data)
        const x = result.data.data.map((e) => {
          return e.name_product
        })
        this.name = x
        // console.log(x)
      } catch (error) {
        console.log(error)
      }
    }
  },
  mounted () {
    this.getData()
    this.getJoin()
  }
}
</script>

}
<style>
/* Income */
.card.shadow1 {
  position: relative;
  background: linear-gradient(
    278.29deg,
    #fbb2b4 30.05%,
    rgba(255, 143, 178, 0) 133.19%
  );

  filter: drop-shadow(10px 15px 10px rgba(255, 143, 178, 0.25));
  font-family: "airnbBold";
  border-radius: 10px;
}
.card.shadow2 {
  position: relative;
  font-family: "airnbBold";
  border-radius: 10px;
  border-radius: 10px;
  background: linear-gradient(
    278.29deg,
    #29dfff 30.05%,
    rgba(41, 223, 255, 0) 133.19%
  );
}

.card.shadow3 {
  position: relative;
  font-family: "airnbBold";
  background: linear-gradient(
    278.29deg,
    #ab84c8 30.05%,
    rgba(241, 201, 236, 0) 133.19%
  );
  filter: drop-shadow(10px 15px 10px rgba(241, 201, 236, 0.25));
  border-radius: 10px;
}
.circle1 {
  position: absolute;
  width: 70px;
  height: 70px;
  background-color: blueviolet;
  border-radius: 50%;
  top: 10%;
  right: 20%;
  background: rgba(253, 211, 228, 0.3);
}

.circle2 {
  position: absolute;
  width: 70px;
  height: 70px;
  background-color: blueviolet;
  border-radius: 50%;
  top: 20%;
  right: 30%;
  background: rgba(253, 211, 228, 0.3);
}

.circle3 {
  position: absolute;
  width: 70px;
  height: 70px;
  background-color: blueviolet;
  border-radius: 50%;
  top: 20px;
  right: 40px;
  background: rgba(253, 211, 228, 0.3);
}
.shadow h4 {
  font-weight: 700;
}
.chart{
  width: 100%;
  height: 100%;

}
.echarts {
  width: 100%;
  height: 100%;
}

/* .chart-wrapper {
  width: 100%;
  height: 700px;
} */
</style>
