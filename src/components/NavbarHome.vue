<template>
  <nav class="navbar navbar-expand-lg navbar-light  ">
    <div class="container">
      <a class="navbar-brand " href="#">  <b-icon-cart-4></b-icon-cart-4> Happy Shopping</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="#"> <b-icon-house></b-icon-house> Home</a>
          </li>
          <li class="nav-item">
            <router-link to="/foods" class="nav-link">
                <img src="../assets/img/fork.svg" width="17px"> Foods
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavbarHome'
}
</script>

<style>
</style>
