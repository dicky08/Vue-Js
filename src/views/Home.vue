<template>
  <div class="home">
    <Navbar />
    <div class="container">
      <Content/>
      <div class="row mt-5">
        <div class="col">
          <h2>Bestselling <strong>Food</strong></h2>
        </div>
        <div class="col">
          <router-link to="/foods" class="btn btn-info float-right"><b-icon-eye> </b-icon-eye> See more</router-link>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 col-sm-6 col-lg-4" v-for="product in products" :key="product.id">
          <!-- Lempar data ke component Card -->
          <Card :product="product"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import Navbar from '@/components/NavbarHome'
import Content from '../components/ContentHome'
import Card from '../components/Card'
import axios from 'axios'

export default {
  name: 'Home',
  components: {
    Navbar,
    Content,
    Card
  },
  data () {
    return {
      products: {}
    }
  },
  methods: {
    async getProduct () {
      try {
        const results = await axios.get('http://localhost:3000/product/best-product')
        this.products = results.data.data
      } catch (error) {
        console.log(error)
      }
    }
  },
  mounted () {
    this.getProduct()
  }
}
</script>
