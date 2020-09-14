<template>
  <div class="card mt-4 ml-1 card-product shadow">
    <img :src="`http://localhost:3000/${product.image}`" class="card-img-top" />
    <div class="card-body">
      <h5 class="card-title">{{product.product_name}}</h5>
      <hr />
      <p class="card-text">
        Harga :
        <strong>Rp. {{product.price}}</strong>
      </p>
      <div class="row buton mt-3">
        <div class="col-md-4 mb-2">
          <a
            href="#"
            @click="$emit('editdata', product.id,index)"
            class="btn btn-primary btn-sm btn-block"
            data-toggle="modal"
            data-target="#modalEdit"
          >
            <b-icon-pencil></b-icon-pencil>
          </a>
        </div>
        <!-- <div class="col-md-4 mb-2">
          <a href="#" class="btn btn-primary btn-sm btn-block" @click="hapus" data-toggle="tooltip" data-placement="top" title="Tooltip on top">
            <b-icon-pencil-square></b-icon-pencil-square>
          </a>
        </div> -->
        <div class="col-md-4 mb-2">
          <button @click="OrderFood" class="btn btn-primary btn-sm btn-block">
            <b-icon-cart4></b-icon-cart4>
          </button>
        </div>
        <div class="col-md-4">
          <button @click="deleted" class="btn btn-primary btn-sm btn-block">
            <b-icon-trash></b-icon-trash>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: ['product', 'index'],
  methods: {
    OrderFood () {
      this.$emit('emitOrder')
    },
    deleted () {
      this.$emit('emitDelete')
    },
    hapus () {
      if (confirm('yakin?')) {
        alert('iya')
      }
    }
  }
}
</script>

<style>
.card-text,
.card-title {
  margin-top: -10px;
  font-family: "Grandstander", cursive;
  font-weight: normal;
}
.buton {
  margin-top: -10px;
}
/* Phone Card */
@media (max-width: 600px) {
  .card {
    width: 450px;
  }
}
</style>
