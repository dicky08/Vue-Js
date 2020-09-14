<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="ModalCheckout"
    tabindex="-1"
    aria-labelledby="ModalCheckoutLabel"
    aria-hidden="true"
  >
    <form >
      <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <div class="row d-flex justify-content-between w-100">
            <div class="col-md-5 col-sm-12 col-12">
              <h5 class="modal-title" id="ModalCheckoutLabel">Checkout</h5>
            </div>
            <div class="col-md-7 col-sm-12 col-12">
              <h5 class="modal-title receipt receipt text-muted" id="ModalCheckoutLabel">Receipt no : #12315</h5>
            </div>
          </div>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="row">
              <div class="col-md-6 col-12">
                <!-- <input type="text" :value="orderNumber"> -->
                <h4>Cashier : </h4>
              </div>
              <div class="col-md-6">
                <input type="text" class="form-control" placeholder="Name" v-model="cashier">
            </div>
          </div>
          <div class="row detail-transaksi" v-for="cartDetail in cart" :key="cartDetail.id">
            <div class="col-md-6 detail-transaksi">
              <p>
                <strong >{{cartDetail.product_name}} {{cartDetail.qty}}x</strong>
<!-- {{cart}} -->
              </p>
            </div>
            <div class="col-md-6 text-right detail-transaksi price-mobile">
              <p>
                <strong>Rp. {{cartDetail.price * cartDetail.qty}}</strong>
              </p>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 col-sm-12 ">
              <p>Ppn 10%</p>
            </div>
            <div class="col-md-6 col-sm-12 text-right ppn ">
              <p>
                <strong>Rp. {{amount*0.1}}</strong>
              </p>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <p class="text-right">
                Total :
                <strong>Rp. {{amount+(amount*0.1)}}</strong>
              </p>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <p>Payment Cash</p>
            </div>
          </div>
          <div v-for="c in cart" :key="c.id" :reduce="c.price"></div>
            <div class="row">
              <div class="col">
                <button type="submit" class="btn btn-info btn-block print" @click.prevent="addCheckout">Print</button>
              </div>
            </div>
          <p class="text-center">or</p>
            <div class="row">
              <div class="col">
                <button class="btn btn-danger btn-block email"  >Send Email</button>
              </div>
            </div>

        </div>
      </div>
    </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
export default {
  name: 'ModalCheckout',
  props: ['cart', 'amount', 'products', 'idCart'],
  data () {
    return {
      results: {},
      orderNumber: [],
      cashier: null
    }
  },
  methods: {
    setProduct (data) {
      this.products = data
    },
    addCheckout () {
      this.results = this.cart
      const ppn = 0.1
      const amount = this.amount
      const totalPpn = amount * ppn
      const cashierName = this.cashier
      const amountAll = amount + (amount * ppn)
      // DATETIME
      const date = new Date()
      const time = date.getTime()
      const invoice = `INV - ${time}`
      const tgl = moment(time).format('YYYY:MM:DD H:mm:ss')
      if (this.cashier) {
        axios.post('http://localhost:3000/history/insert', {
          cashier_name: cashierName,
          orders_date: tgl,
          invoice: invoice,
          ppn: totalPpn,
          amount: amountAll
        })
          .then((response) => {
            this.$toast.success('Congratulations, your order is being processed.', {
              type: 'success',
              position: 'top',
              duration: 3000,
              dismisable: true
            })
            const idMaster = response.data.data.insertId
            const newData = this.results.map((e) => {
              return [idMaster, e.id, e.product_name, e.qty, e.price]
            })
            newData.forEach((el) => {
              axios.post('http://localhost:3000/history_detail/insert', {
                history_id: el[0],
                product_id: el[1],
                name_product: el[2],
                qty: el[3],
                price: el[4]
              })
            })
            setTimeout(() => {
              this.getProduct()
              location.reload(true)
            }, 1000)
          })
          .catch((err) => {
            console.log(err + 'gg')
            console.log()
          })
      } else {
        this.$toast.error('Data cannot be empty!', {
          type: 'error',
          position: 'top',
          duration: 3000,
          dismisable: true
        })
      }
    },
    getProduct () {
      axios
        .get('http://localhost:3000/product/getAll')
        .then((response) => {
          // handle success
          console.log(response.data.data)
          this.setProduct(response.data.data)
        })
        .catch((error) => {
          // handle error
          console.log(error)
        })
    }
  },
  mounted () {
    this.getProduct()
  }
}
</script>

<style>
.receipt {
  margin-left: 40px;
}
.modal-body p {
  font-size: 20px;
}
.print {
  margin-top: 45px;
  margin-bottom: -5px;
}
.email {
  margin-top: -15px;
}

</style>
