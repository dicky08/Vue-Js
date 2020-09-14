<template>
  <div class="foods">
    <div class="container-fluid">
      <Collapse />
      <div class="search-mobile mt-4">
        <div class="row ">
          <div class="col ">
            <div class="input-group mb-3">
              <input
               v-model="search"
                type="text"
                class="form-control"
                placeholder="Search by food name ..."
                aria-label="Search by food name"
                aria-describedby="basic-addon1"
                @keyup="searchProduct"
              />
               <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">
                    <b-icon-search></b-icon-search>
                </span>
              </div>
              <div class="col-md-4 col-sm-5 col-12 order  ">
              <select class="form-control  " @change="order" v-model="select">
                <option disabled value="">Select by category</option>
                <option value="">All Category</option>
                <option v-for="(ca,index) in categorys" :key="index">{{ca.category_name}}</option>
              </select>
            </div>
            </div>
          </div>
        </div>
      </div>
      <NavbarFood />
      <div class="row">
        <Sidebar />
        <div class="col-lg-7 col-12">
          <div class="input-group mt-3 search-desktop">
              <input
               v-model="search"
                type="text"
                class="form-control"
                placeholder="Search by food name ..."
                aria-label="Search by food name"
                aria-describedby="basic-addon1"
                @keyup="searchProduct"
              />
               <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">
                    <b-icon-search></b-icon-search>
                </span>
              </div>
            <div class="col-md-4">
              <select class="form-control nameCategory" @change="order" v-model="select">
                <option disabled value="">Select by category</option>
                <option value="">All Category</option>
                <option  v-for="(ca,index) in categorys" :key="index">{{ca.category_name}}</option>
              </select>
            </div>
            </div>
            <div v-if="products.length===0">
              <img src="../assets/img/loading.gif" class="loading">
            </div>

          <div class="row mb-3 cards" v-else>
            <div class="col-lg-4 col-md-4 col-sm-6 col-12" v-for="product in products" :key="product.id">
              <Card :product="product"/>
            </div>
          </div>
        </div>
        <div class="col mt-3">
          <CheckoutDetail />
          <ModalAdd />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Collapse from '../components/Collapse'
import NavbarFood from '../components/NavbarFood'
import Sidebar from '../components/Sidebar'
import Card from '../components/Card'
import CheckoutDetail from '../components/CheckoutDetail'
import ModalAdd from '../components/ModalAdd'
import axios from 'axios'
export default {
  name: 'Foods',
  components: {
    Collapse,
    NavbarFood,
    Sidebar,
    Card,
    CheckoutDetail,
    ModalAdd
  },
  data () {
    return {
      products: [],
      //   product: [],
      categorys: {},
      search: '',
      select: '',
      category: '',
      id: this.$route.params.id
    }
  },
  methods: {
    setProduct (data) {
      this.products = data
    //   this.product = data
    },
    setCategory (data) {
      this.categorys = data
    },
    getProduct () {
      setTimeout(() => {
        axios
          .get('http://localhost:3000/product/getAll')
          .then((response) => {
          // handle success
            this.setProduct(response.data.data)
            console.log(response.data.data)
          })
          .catch((error) => {
            // handle error
            console.log(error)
          })
      }, 500)
    },
    getCategory () {
      axios
        .get('http://localhost:3000/category/getAll')
        .then((response) => {
        // handle success
          this.setCategory(response.data.data)
        })
        .catch((error) => {
        // handle error
          console.log(error)
        })
    },
    // async getDetail () {
    //   try {
    //     const result = await axios.get(`http://localhost:3000/product/getDetail/${this.id}`)
    //     this.setProduct(result.data.data[0])
    //     console.log(result.data.data[0])
    //   } catch (error) {
    //     console.log(error)
    //   }
    // },
    async searchProduct () {
      try {
        const results = await axios.get(`http://localhost:3000/product/getAll?name=${this.search}`)
        this.setProduct(results.data.data)
      } catch (error) {
        console.log(error)
      }
    },
    async order () {
      try {
        const results = await axios.get(`http://localhost:3000/product/getAll?where=category_name&name=${this.select}&orderBy=product_name&sort=ASC`)

        // console.log(results.data.data.length)
        this.setProduct(results.data.data)
      } catch (error) {
        console.log(error)
      }
    }
  },
  mounted () {
    this.getProduct()
    this.getCategory()
    // this.getDetail()
  }
}

</script>

<style>
.nameCategory{
  text-transform: capitalize;
}
</style>
