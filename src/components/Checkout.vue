<template>
  <div class="checkOut">
    <div class="d-flex h-50 ml-4">
        <div class="img-checkouts">
            <img src="../assets/img/cehckout.svg" alt="">
            <div class="text-checkouts">
                <h3>Your Cart is Empty</h3>
               <p class="text-muted">Please add some items from the menu</p>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Checkout'
}
</script>

<style>
/* Checkout */
.cart-checkout{
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.img-checkouts{
  margin-left: 130px;
}
.text-checkouts {
    margin-top: -30px;
}
.text-checkouts h3{
    font-weight: 700;
    font-family: 'airnbBold';
}
.text-checkouts p{
font-size: 12px;
}

</style>
