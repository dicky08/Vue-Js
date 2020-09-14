<template>
  <div>
    <div v-if="type === 'foods'">
    <div class="menu">
      <div class="row menu-header">
        <div class="col-lg-1">
          <div class="menu text-center">
            <img src="../assets/img/list.svg" alt />
          </div>
        </div>
        <div class="col-lg-8">
          <div class="row">
            <div class="col-lg-12">
              <div class="text-header text-center">
                <h4>Food Items</h4>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-3">
          <div class="cart-header text-center">
            <h4>
              Cart
              <b-icon-cart3></b-icon-cart3>
              <span v-if="cart === 0">
                <span class="badge badge-danger ml-2"> {{ cart }} </span>
              </span>
              <span v-else>
                <span class="badge badge-success ml-2"> {{ cart }} </span>
              </span>
            </h4>
          </div>
        </div>
      </div>
    </div>
  </div>
    <div v-else-if="type === 'history'">
      <div class="menu">
        <div class="row menu-header">

          <div class="col-lg-1">
            <div class="menu text-center">
              <img src="../assets/img/list.svg" alt />
            </div>
          </div>

          <div class="col-lg-8">
            <div class="row">
              <div class="col-lg-12">
                <div class="text-header text-center">
                  <h4>History</h4>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    <div v-else-if="type==='detail_history'">
      <div class="menu">
        <div class="row menu-header">

          <div class="col-lg-1">
            <div class="menu text-center">
              <img src="../assets/img/list.svg" alt />
            </div>
          </div>

          <div class="col-lg-8">
            <div class="row">
              <div class="col-lg-12">
                <div class="text-header text-center">
                  <h4>Detail History</h4>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'NavbarFood',
  props: ['cart', 'type']
}
</script>

<style>
/* Menu Header */
.menu-header {
  /* background-color: darkcyan; */
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  height: 60px;
  font-family: "airnbBold";
}

.menu,
.text-header h4,
.cart-header h4,
.search {
  line-height: 60px;
}

.search {
  padding: 10px;
}
</style>
