<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="ModalAddProduct"
    tabindex="-1"
    aria-labelledby="ModalAddProductLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-md">
      <div class="modal-content">
        <form enctype="multipart/form-data">
          <div class="modal-header">
            <h5 class="modal-title" id="ModalAddProductLabel">Add Product</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row mb-3">
              <div class="col-md-5">
                <h4>Category name</h4>
              </div>
              <div class="col-md-7">
                <select class="form-control nameCategory" v-model="c_id">
                  <option disabled value>Select category</option>
                  <option
                    v-for="(c, index) in categorys"
                    :key="index"
                    :value="c.id"
                    >{{ c.category_name }}</option
                  >
                </select>
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-md-5">
                <h4>Product name</h4>
              </div>
              <div class="col-md-7">
                <input
                  type="text"
                  class="form-control"
                  v-model="product_name"
                />
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-md-5">
                <h4>Price</h4>
              </div>
              <div class="col-md-7">
                <input type="text" class="form-control" v-model="price" />
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-md-5">
                <h4>Images</h4>
              </div>
              <div class="col-md-7">
                <input
                  type="file"
                  class="form-control"
                  @change="onSelectFile($event)"
                />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="close-btn">
              <button type="button" class="btn" data-dismiss="modal">
                Close
              </button>
            </div>
            <div class="save-btn">
              <button type="submit" class="btn" @click.prevent="insertData">
                Add Product
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'AddProduct',
  props: ['products'],
  data () {
    return {
      categorys: {},
      addData: {},
      c_id: '',
      product_name: null,
      price: null,
      image: null,
      kosong: ''
    }
  },
  methods: {
    setProduct (data) {
      this.products = data
    },
    setCategory (data) {
      this.categorys = data
    },
    onSelectFile (event) {
      this.image = event.target.files[0]
      console.log(this.image)
    },
    // Get Data
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
          // handle success
          console.log(response.data.data)
          this.setCategory(response.data.data)
        })
        .catch(error => {
          // handle error
          console.log(error)
        })
    },
    // SImpan Data
    insertData () {
      const fd = new FormData()
      fd.append('category_id', this.c_id)
      fd.append('product_name', this.product_name)
      fd.append('price', this.price)
      fd.append('image', this.image)

      if (this.c_id && this.product_name && this.price && this.image) {
        axios
          .post('http://localhost:3000/product/insert', fd)
          .then(() => {
            this.$toast.success('Product data saved successfully.', {
              type: 'success',
              position: 'top',
              duration: 3000,
              dismisable: true
            })
            setTimeout(() => {
              this.getProduct()
              location.reload(true)
            }, 1000)
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        this.$toast.error('Product data is required.', {
          type: 'error',
          position: 'top',
          duration: 3000,
          dismisable: true
        })
      }
    }
  },
  mounted () {
    this.getCategory()
  }
}
</script>

<style>
.modal-body h4 {
  font-size: 18px;
}
.modal-footer {
  padding: 10px;
}
.save-btn:hover {
  background-color: #9aeaf1;
  transition: all 0.5s;
}
.save-btn {
  background: #57cad5;
}
.close-btn:hover {
  background-color: #f094b6;
  transition: all 0.5s;
}
.close-btn {
  background: #f24f8a;
}
</style>
