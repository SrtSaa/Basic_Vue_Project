<template>
  <div class="card">
    <div class="card-title">
      {{ product.name }}
    </div>
    <div class="card-body">
      <i class="icofont-10x icofont-{{ product.icon }}"></i>
      <form>
        <div class="row">
          <div class="cell">
            <label>Type:</label>
          </div>
          <div class="cell">
            <em>{{ product.type }}</em>
          </div>
        </div>
        <div class="row">
          <div class="cell">
            <label>Price:</label>
          </div>
          <div class="cell">${{ product.price.USD }}</div>
        </div>
        <div class="row">
          <div class="cell">
            <label>Quantity:</label>
          </div>
          <div class="cell">
            <!-- <input type="number" min="0" v-model="product.quantity" /> -->
            <input type="number" min="0" v-model="quantity" />
          </div>
        </div>
      </form>
    </div>
    <div class="card-footer">
      <button @click="addToCart(product.name, product.price.USD, quantity)" class="btn btn-light">
        Add to cart
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['product', 'addToCart'],
  data () {
    return {
      quantity: 0
    }
  }
}
</script>
