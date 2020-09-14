<template>
  <div class="food_order">
      <div class="container-fluid">
          <Collapse/>
          <NavbarFood/>
          <div class="row">
              <Sidebar/>
                <div class="container">
                  <div class="row mt-3">
                    <h2>food order {{id}}</h2>
                  </div>
                  <div class="row mb-2">
                    <div class="col-md-4">
                      <img :src="`http://localhost:3000/${product.image}`" class="img-fluid shadow" width="">
                    </div>
                    <div class="col-md-5 food-order">
                      <h2>{{product.product_name}}</h2>
                      <h4>Harga : <strong>Rp. {{product.price}}</strong></h4>
                      <h5>Category : <strong>{{product.category_name}}</strong></h5>
                       <p>Quantity:
                         <button class="btn-min">-</button>
                         <input type="number" placeholder="1" class="text-center number-text" size="2" v-model="qty" value="1">
                         <button class="btn-plus">+</button></p>
                         <p>Amount : {{product.price*qty}}</p>
                    </div>
                    <div class="col-md-3">
                      <div class="row">
                        <div class="col">
                          <h2>*Keterangan</h2>
                      <hr>
                      <h5>Makanan yang sudah dipesan tidak dapat di cancel</h5>
                      <h5><strong>Selamat menikmati makanan anda...</strong></h5>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row mb-2">
                    <div class="col-md-4">
                      <img src="../assets/img/kentang-goreng.jpg" class="img-fluid shadow" width="">
                    </div>
                    <div class="col-md-5">
                      <h2>Nama Makanna</h2>
                      <h4>Harga 20000</h4>
                    </div>
                  </div>
                  <div class="row mb-2">
                    <div class="col-md-4">
                      <img src="../assets/img/kentang-goreng.jpg" class="img-fluid shadow" width="">
                    </div>
                    <div class="col-md-5">
                      <h2>Nama Makanna</h2>
                      <h4>Harga 20000</h4>
                    </div>
                  </div>
                </div>
          </div>
      </div>
  </div>
</template>

<script>
import Collapse from '../components/Collapse'
import NavbarFood from '../components/NavbarFood'
import Sidebar from '../components/Sidebar'
import axios from 'axios'
export default {
  name: 'FoodOrder',
  components: {
    Collapse,
    NavbarFood,
    Sidebar
  },
  data () {
    return {
      id: this.$route.params.id,
      product: {},
      qty: ''
    }
  },
  methods: {
    setProduct (data) {
      this.product = data
    },
    async getDetail () {
      try {
        const result = await axios.get(`http://localhost:3000/product/getDetail/${this.id}`)
        this.setProduct(result.data.data[0])
        console.log(result.data.data[0])
      } catch (error) {
        console.log(error)
      }
    }
  },
  mounted () {
    this.getDetail()
  }
}
</script>

<style>
.img-fluid {
  margin-left: -13px;
  border-radius: 10px;
}

.food-order{
  text-transform: capitalize;
}

.btn-plus,.btn-min{
  background-color: chartreuse;
  width: 35px;
}
.number-text{
  width: 150px;
}
</style>
