<template>
  <div class="col-lg-1 side-left text-center">
    <div class="row side">

       <div class="col-lg-12 col-md-3 col-sm-3 sides">
        <div class="fork mt-5">
          <router-link to="/" class="nav-link">
            <img src="../assets/img/home.svg" width="45px"/> Home
          </router-link>
        </div>
      </div>
      <div class="col-lg-12 col-md-3 col-sm-3 sides">
        <div class="fork mt-5">
          <router-link to="/foods" class="nav-link">
            <img src="../assets/img/fork.svg" /> Foods
          </router-link>
        </div>
      </div>
      <!-- <div class="col-lg-12 col-md-3 col-sm-3 sides">
        <div class="fork mt-5">
          <router-link to="/food_order" class="nav-link">
            <img src="../assets/img/cart.svg" /> Cart
          </router-link>
        </div>
      </div> -->
      <div class="col-lg-12 col-md-3 col-sm-3">
        <div class="history mt-5">
          <router-link to="/history" class="nav-link">
            <img src="../assets/img/clip.svg" /> History
          </router-link>
        </div>
      </div>

      <div class="col-lg-12 col-md-3 col-sm-3">
        <div class="add mt-5 mb-5">
          <div  class="nav-link">
            <img src="../assets/img/add.svg" data-toggle="modal"
            data-target="#ModalAddProduct" /> Add
          </div>
        </div>
      </div>

      <!-- <div class="col-lg-12 col-md-3 col-sm-3">
        <div class="add mt-5 mb-5">
          <div  class="nav-link">
            <img src="../assets/img/add.svg" data-toggle="modal"
            data-target="#exampleModal" /> Add Category
          </div>
        </div>
      </div> -->

    </div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar'
}
</script>

<style>
/* Sidebar Kiri */
.side-left {
  /* background-color: darkmagenta; */
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.side img:hover{
  cursor: pointer;
}
.nav-link {
  color: rgb(84, 84, 230);
}
/* ===================================================================== */
/* Break-POint */

/* Phone */
@media (max-width: 600px) {
  /* Collapse */
  .side-left {
    display: none;
  }
}
</style>
