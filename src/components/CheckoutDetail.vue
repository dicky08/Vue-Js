<template>
  <div class="mt-3 checkout-detail">
    <div class="d-flex">
      <div class="img-checkout mt-5">
        <img src="../assets/img/1.jpg" />
      </div>
      <div class="text-checkout mt-5 ml-2">
        <p>Nama</p>
        <button class="btn-minus">-</button>
        <input type="text" placeholder="1" size="3" class="text-center" />
        <button class="btn-plus">+</button>
      </div>
      <div class="price mt-5 ml-3">
        <h2>Rp. 20000</h2>
      </div>
    </div>
    <div class="d-flex">
      <div class="img-checkout mt-5">
        <img src="../assets/img/1.jpg" />
      </div>
      <div class="text-checkout mt-5 ml-2">
        <p>Nama</p>
        <button class="btn-minus">-</button>
        <input type="text" placeholder="1" size="3" class="text-center" />
        <button class="btn-plus">+</button>
      </div>
      <div class="price mt-5 ml-3">
        <h2>Rp. 20000</h2>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-md-6">
        <h2>Total :</h2>
      </div>
      <div class="col-md-6">
        <h3>
          <strong>Rp. 20000</strong>
        </h3>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <p>*Belum termasuk PPN</p>
      </div>
    </div>
    <div class="row btn-checkout mb-2">
      <div class="col-12">
        <button class="btn btn-info btn-block">Checkout</button>
      </div>
    </div>
    <div class="row">
      <div class="col">
          <button class="btn btn-danger btn-block">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckoutDetail'
//   props: ['product']
}
</script>

<style>
/* Checkout */
.img-checkout img {
  margin-left: -10px;
  width: 150px;
  border-radius: 10px;
}
.text-checkout {
  margin-top: -30px;
}
.text-checkout h3 {
  font-weight: 700;
  font-family: "airnbBold";
}
.text-checkout p {
  font-size: 24px;
}
.btn-plus,
.btn-minus {
  text-align: center;
  background-color: chartreuse;
  width: 35px;
}
.price h2 {
  margin-top: 58px;
  font-size: 20px;
}
</style>
