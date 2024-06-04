<template>
  <header class="top-bar spread">
    <nav class="top-bar-nav">
      <router-link to="/" class="top-bar-link">
        <i class="icofont-spoon-and-fork"></i>
        <span>Home</span>
      </router-link>
      <router-link to="/products" class="top-bar-link">
        <span>Products</span>
      </router-link>
      <router-link to="/past-orders" class="top-bar-link">
        <span>Past Orders</span>
      </router-link>
    </nav>
    <div @click="toggleSidebar" class="top-bar-cart-link">
      <i class="icofont-cart-alt icofont-1x"></i>
      <span>Cart ({{ noItem }})</span>
    </div>
  </header>

  <router-view
    :inventory="inventory"
    :addToCart="addToCart"
  />

  <SideBar
    v-if="showSidebar"
    :toggle="toggleSidebar"
    :cart="cart"
    :inventory="inventory"
    :remove="removeItem"
  />
</template>

<script>
import SideBar from '@/components/SideBar.vue'
import food from '@/food.json'

export default {
  components: {
    SideBar
  },
  data () {
    return {
      showSidebar: false,
      noItem: 0,
      inventory: food,
      cart: {}
    }
  },
  methods: {
    addToCart (name, price, quantity) {
      if (!this.cart[name]) {
        this.cart[name] = 0
      }
      this.cart[name] = {
        price: price,
        quantity: quantity
      }
      if (this.cart[name].quantity <= 0) {
        delete this.cart[name]
      }
      this.noItem = 0
      Object.keys(this.cart).forEach((key) => {
        if (this.cart[key].quantity > 0) {
          this.noItem += 1
        }
      })
    },
    removeItem (item) {
      delete this.cart[item]
    },
    toggleSidebar () {
      this.showSidebar = !this.showSidebar
    }
  }
}
</script>

<style>
body {
  margin: 0px;
}
</style>
