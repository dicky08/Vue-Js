<template>
  <div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Add Category</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form >
              <div class="modal-body">
              <div class="row">
                  <div class="col-md-6">
                      <label for="category_name" >Category name</label>
                  </div>
                   <div class="col-md-6">
                     <input type="text" class="form-form-control" v-model="pesan.category_name">
                  </div>
              </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn " data-dismiss="modal">Close</button>
            <button type="submit" class="btn " @click="add">Save changes</button>
          </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'ModalAdd',
  data () {
    return {
      products: {},
      pesan: {}
    }
  },
  methods: {
    setProduct (data) {
      this.products = data
    },
    async add () {
      if (this.pesan.category_name) {
        axios.post('http://localhost:3000/category/insert', this.pesan)
          .then(() => {
            this.$toast.success('Data Category berhasil di insert.', {
              type: 'success',
              position: 'top',
              duration: 3000,
              dismisable: true
            })
          })
          .catch((err) => {
            console.log(err)
          })
      } else {
        this.$toast.error('Data Category harus diisi.', {
          type: 'error',
          position: 'top',
          duration: 3000,
          dismisable: true
        })
      }
    }
  },
  mounted () {
    axios
      .get('http://localhost:3000/product/getAll')
      .then((response) => {
        // handle success
        this.setProduct(response.data.data)
      })
      .catch((error) => {
        // handle error
        console.log(error)
      })
  }
}
</script>

<style>
.modal-title {
  font-weight: 700;
}

</style>
