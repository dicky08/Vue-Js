<template>
  <div class="foods">
    <ModalAdd />
          <div v-for="(cart, index) in carts" :key="index">
            <ModalCheckout
             :idCart="cart.id"
             :products="products"
              :cart="carts"
              :amount="amount"
              :kali="cart.price * cart.qty"
            />
          </div>
          <ModalAddProduct :products="products" />
          <ModalEditData
            :category="categorys"
            :products="products"
            :p_id="p_id"
            :p_cd="p_cd"
            :p_name="p_name"
            :p_price="p_price"
            :p_stock="p_stock"
            :p_img="p_img"
          />
    <div class="container-fluid">
      <Collapse />
      <div class="search-mobile mt-4">
        <div class="row">
          <div class="col">
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
              <div class="col-md-4 col-sm-5 col-12 order">
                <select class="form-control" @change="orderBy" v-model="select">
                  <option disabled value>Select by category</option>
                  <option value>All Category</option>
                  <option v-for="(ca, index) in categorys" :key="index">{{
                    ca.category_name
                  }}</option>
                </select>
              </div>

              <div class="col-md">
                <select class="form-control" @change="limit" v-model="count">
                  <option disabled value>Select Count</option>
                  <option>5</option>
                  <option>10</option>
                  <option>15</option>
                  <option>20</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <NavbarFood :cart="carts.length" type="foods" />
      <div class="row">
        <Sidebar />
        <div
          class="col-lg-7 col-12 card-page"
          style="background: rgba(190, 195, 202, 0.3);"
        >
          <div class="row mt-4">
            <div class="col-md-5 mb-2">
              <div class="input-group">
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
              </div>
            </div>
            <div class="col-md-4 mb-2">
              <select
                class="form-control nameCategory"
                @change="orderBy"
                v-model="select"
              >
                <option disabled value>Select by category</option>
                <option value>All Category</option>
                <option v-for="(ca, index) in categorys" :key="index">{{
                  ca.category_name
                }}</option>
              </select>
            </div>
            <div class="col-md-3">
              <select
                class="form-control select-limit"
                @change="limit"
                v-model="count"
              >
                <option disabled value>Select Count</option>
                <option>5</option>
                <option>10</option>
                <option>15</option>
                <option>20</option>
              </select>
            </div>
          </div>
`       <div class="cart-order rounded-circle">
            <i class="fa fa-shopping-cart shop">X</i>
          </div>
          <div v-if="products.length === 0">
            <img src="../assets/img/loading.gif" class="loading" />
          </div>

          <div class="row mb-3 cards" v-else>
            <div
              class="col-lg-4 col-md-4 col-sm-6 col-12"
              v-for="(product, index) in products"
              :key="index"
            >
              <Card
                v-on:emitOrder="onOrder(product.id)"
                v-on:emitDelete="onDelete(product.id)"
                :product="product"
                @editdata="edit"
                :index="index"
              />
            </div>
          </div>
        </div>
        <div class="col mt-3 cart-checkout carts">
          <div v-if="carts.length === 0">
            <Checkout />
          </div>
          <div v-for="(cart, index) in carts" :key="index">
            <div class="row mt-3 box-cart">
              <div class="col-md-5">
                <img
                  :src="`http://localhost:3000/${cart.image}`"
                  class="checkout-img mt-5"
                />
              </div>
              <div class="col-md-7 mt-5 name-product">
                <h4>
                  <strong>{{ cart.product_name }}</strong>
                </h4>
                <div class="row">
                  <div class="col-md-7 btns">
                    <button @click="kurang(index)" class="btn-min">-</button>
                    <input
                      type="text"
                      size="5"
                      :value="cart.qty"
                      class="text-center"
                      readonly
                    />
                    <button @click="tambah(index)" class="btn-plus">+</button>
                  </div>
                  <div class="col price">
                    <h5>
                      <strong>Rp. {{ cart.price * cart.qty }}</strong>
                    </h5>
                  </div>
                </div>
                <div class="row mt-2">
                  <div class="col ml-5 trash">
                    <button class="btn btn-danger text-center btn-sm">
                      <b-icon-trash @click="deleteCart(indexDelete)"></b-icon-trash>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr>
          <div v-if="carts.length > 0">
            <div class="checkout-amount mt-5 checkout2">
              <div class="row checkout">
                <div class="col-md-8">
                  <h2>Total</h2>
                </div>
                <div class="col-md-4">
                  <h4>
                    <strong>Rp. {{ amount }}</strong>
                  </h4>
                </div>
                <div class="row">
                  <div class="col ml-3">
                    <h5>*Belum termasuk PPN</h5>
                  </div>
                </div>
              </div>
              <div class="btn-checkout">
                <div class="row  mb-2">
                  <div class="col checkouts ">
                    <span
                      class="btn btn-block"
                      data-toggle="modal"
                      data-target="#ModalCheckout"
                    >
                      Checkout
                    </span>
                  </div>
                </div>
                <div class="row ">
                  <div class="col cancels">
                    <span class="btn  btn-block">Cancel</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <footers />
      </div>
    </div>
  </div>
</template>

<script>
import Collapse from '../components/Collapse'
import NavbarFood from '../components/NavbarFood'
import Sidebar from '../components/Sidebar'
import Card from '../components/Card'
import Checkout from '../components/Checkout'
import ModalAdd from '../components/ModalAdd'
import ModalCheckout from '../components/ModalCheckout'
import ModalAddProduct from '../components/ModalAddProduct'
import ModalEditData from '../components/ModalEditData'
import footers from '../components/footer'
import axios from 'axios'

export default {
  name: 'Foods',
  components: {
    Collapse,
    NavbarFood,
    Sidebar,
    Card,
    Checkout,
    ModalAdd,
    ModalCheckout,
    ModalAddProduct,
    ModalEditData,
    footers
  },
  data () {
    return {
      products: [],
      categorys: {},
      search: '',
      select: '',
      count: '',
      category: '',
      carts: [],
      amount: 0,
      idDelete: null,
      // Data Modal edit
      p_id: null,
      p_cd: null,
      p_name: null,
      p_price: null,
      p_stock: null,
      p_img: null
    }
  },
  watch: {
    carts (cart) {
      this.amount = cart.reduce((items, data) => {
        return items + data.price * data.qty
      }, 0)
    }
  },
  methods: {
    setProduct (data) {
      this.products = data
    },
    setCategory (data) {
      this.categorys = data
    },
    // Get Produk
    getProduct () {
      setTimeout(() => {
        axios
          .get('http://localhost:3000/product/getAll')
          .then(response => {
            this.setProduct(response.data.data)
          })
          .catch(error => {
            console.log(error)
          })
      }, 500)
    },
    // Get Category
    getCategory () {
      axios
        .get('http://localhost:3000/category/getAll')
        .then(response => {
          this.setCategory(response.data.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    // Limit Data
    async limit () {
      try {
        const limitData = await axios.get(
          'http://localhost:3000/product/getAll?limit=' + this.count
        )
        this.setProduct(limitData.data.data)
      } catch (error) {
        console.log(error)
      }
    },
    // Cari Data
    async searchProduct () {
      try {
        const results = await axios.get(
          `http://localhost:3000/product/getAll?name=${this.search}`
        )
        this.setProduct(results.data.data)
      } catch (error) {
        console.log(error)
      }
    },
    // Grouping
    async orderBy () {
      try {
        const results = await axios.get(
          `http://localhost:3000/product/getAll?where=category_name&name=${this.select}&orderBy=product_name&sort=ASC`
        )

        // console.log(results.data.data.length)
        this.setProduct(results.data.data)
      } catch (error) {
        console.log(error)
      }
    },
    // Order Data
    onOrder (idOrder) {
      // console.log(this.products)
      const cart = this.carts.filter(e => e.id === idOrder)
      // Jika Cart kosong tambahkan
      if (cart.length === 0) {
        const data = this.products.filter(e => e.id === idOrder)
        data[0].qty = 1
        this.carts = [...this.carts, data[0]]
        // console.log(this.carts)
      } else {
        const newData = this.carts.map(e => {
          if (e.id === idOrder) {
            e.qty += 1
          }
          return e
        })
        this.carts = newData
      }
    },
    tambah (index) {
      const idCart = this.carts[index].id
      const a = this.carts.filter(e => {
        if (idCart === e.id) {
          e.qty += 1
        }
        return e
      })
      this.carts = a
    },
    kurang (index) {
      const idCart = this.carts[index].id
      const a = this.carts.filter(e => {
        if (idCart === e.id) {
          e.qty -= 1
        }
        if (e.qty < 1) {
          e.qty = 1
        }
        return e
      })
      this.carts = a
    },
    edit (id, index) {
      this.p_id = this.products[index].id
      this.p_cd = this.products[index].category_id
      this.p_name = this.products[index].product_name
      this.p_price = this.products[index].price
      this.p_stock = this.products[index].stock
      this.p_img = this.products[index].image
    },
    deleteCart (indexDelete) {
      this.carts.splice(indexDelete, 1)
    },
    // Delete Data
    onDelete (id) {
      if (confirm('are you sure the data you want to delete?')) {
        axios
          .delete('http://localhost:3000/product/delete/' + id)
          .then(res => {
            this.$toast.success('Product data has been successfully deleted.', {
              type: 'success',
              position: 'top',
              duration: 3000,
              dismisable: true
            })
            this.getProduct()
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  },
  mounted () {
    this.getProduct()
    this.getCategory()
  }
}

</script>

<style>
img.checkout-img {
  margin-top: 400px;
  border-radius: 10px;
  width: 200px;
  margin-left: -10px;
}
.nameCategory {
  text-transform: capitalize;
}
.name-product {
  margin-left: -20px;
}
.name-product h3 {
  margin-left: -20px;
}

.btn-plus,
.btn-min {
  text-align: center;
  background-color: chartreuse;
  width: 35px;
}
.btn-checkout {
  padding: 10px;
}
.checkouts:hover {
  background-color: #9aeaf1;
  transition: all .5s;
}
.checkouts {
  background: #57CAD5;;
}
.cancels:hover {
  background-color: #f094b6;
  transition: all .5s;
}
.cancels {
  background: #F24F8A;
}
.nameCategory,
.select-limit:hover {
  cursor: pointer;
}
</style>
