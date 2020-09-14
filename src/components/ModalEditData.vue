<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="modalEdit"
    tabindex="-1"
    aria-labelledby="modalEditLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <form enctype="multipart/form-data">
          <div class="modal-header">
            <h5 class="modal-title" id="modalEditLabel">Edit Product</h5>
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
            <div class="row">
              <div class="col-md-5">
                <img
                  :src="`http://localhost:3000/${p_img}`"
                  height="250px"
                  width="300px"
                  class="shadow img-edit"
                />
              </div>
              <div class="col">
                <div class="row mb-3">
                  <div
                    class="col-md-7"
                    v-for="(c, index) in category"
                    :key="index"
                    :value="c.id"
                    hidden
                  ></div>
                </div>
                <div class="row mb-3">
                  <div class="col-md-5">
                    <h4>Product name</h4>
                  </div>
                  <div class="col-md-7">
                    <input type="text" class="form-control" v-model="p_name" />
                  </div>
                </div>

                <div class="row mb-3">
                  <div class="col-md-5">
                    <h4>Price</h4>
                  </div>
                  <div class="col-md-7">
                    <input type="text" class="form-control" v-model="p_price" />
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
                    <!-- @change="onSelectFile($event)" -->
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- <button @click.prevent="doang">Klik</button> -->
          <div class="modal-footer">
            <div class="cancel">
              <button type="button" class="btn btn" data-dismiss="modal">
                Cancel
              </button>
            </div>
            <div class="update">
              <button type="submit" class="btn btn" @click.prevent="updateData">
                Update
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
  name: 'ModalEdit',
  props: ['category', 'products', 'p_id', 'p_cd', 'p_name', 'p_price', 'p_img'],
  data () {
    return {
      product_name: null,
      price: null,
      image: null,
      dataLama: null
    }
  },
  methods: {
    onSelectFile (event) {
      this.image = event.target.files[0]
    },
    setProduct (data) {
      this.products = data
    },

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
    // Update Data
    updateData () {
      const fd = new FormData()
      fd.append('category_id', this.p_cd)
      fd.append('product_name', this.p_name)
      fd.append('price', this.p_price)
      fd.append('image', this.image)
      if (this.p_cd && this.p_name && this.p_price) {
        axios
        // Pesan Success
          .put('http://localhost:3000/product/update/' + this.p_id, fd)
          .then(result => {
            this.$toast.success('Product data updated successfully.', {
              type: 'success',
              position: 'top',
              duration: 1000,
              dismisable: false
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
        // Pesan Error
        this.$toast.error('Product data is required.', {
          type: 'error',
          position: 'top',
          duration: 3000,
          dismisable: true
        })
      }
    }
  }
}
</script>

<style>
.img-edit {
  border-radius: 10px;
}

.modal-footer {
  padding: 10px;
}
.update:hover {
  background-color: #9aeaf1;
  transition: all 0.5s;
}
.update {
  background: #57cad5;
}
.cancel:hover {
  background-color: #f094b6;
  transition: all 0.5s;
}
.cancel {
  background: #f24f8a;
}
</style>
