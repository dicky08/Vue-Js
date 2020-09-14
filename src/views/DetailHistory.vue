<template>
  <div class="hisotry">
    <div class="container-fluid">
      <Collapse />
      <NavbarFood type="detail_history"/>
      <div class="row">
        <Sidebar />
        <div class="col p-4">
          <div class="row mt-4">
            <div class="col mt-3 shadow">
              <h4>Tabel Detail</h4>
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Product Id</th>
                    <th scope="col">Product name</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Price</th>
                  </tr>
                </thead>
                <tbody v-for="(detail, index) in history_detail" :key="index">
                  <tr>
                    <th scope="row">{{index+1}}</th>
                    <td>{{detail.product_id}}</td>
                    <td>{{detail.name_product}}</td>
                    <td>{{detail.qty}}</td>
                    <td>{{detail.price}}</td>
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
import Collapse from '../components/Collapse'
import NavbarFood from '../components/NavbarFood'
import Sidebar from '../components/Sidebar'
import footers from '../components/footer'
import axios from 'axios'
export default {
  components: {
    Collapse,
    NavbarFood,
    Sidebar,
    footers
  },
  data () {
    return {
      history_detail: []
    }
  },
  methods: {
    coba () {
      console.log(this.history_detail)
    },
    sethistory_detail (data) {
      this.history_detail = data
    },
    async getHistory () {
      try {
        const result = await axios.get('http://localhost:3000/history_detail/getAll')
        this.sethistory_detail(result.data.data)
        // console.log(result)
      } catch (error) {
        console.log(error)
      }
    }
  },
  mounted () {
    this.getHistory()
  }
}
</script>

<style></style>
