let app = Vue.createApp({
    data() {
        return {
            showsidebar: false,
            noItem: 0,
            inventory: [],
            cart: {},
            price: {
                carrots: 4.82,
                pineapples: 1.62,
                cherries: 1.04
            }
        }
    },
    methods: {
        addToCart(name, index){
            if (!this.cart[name]){
                this.cart[name] = 0;
            }
            this.cart[name] = {
                price: this.inventory[index].price.USD,
                quantity: this.inventory[index].quantity
            };
            if (this.cart[name].quantity <= 0){
                delete this.cart[name];
                delete this.inventory[index].quantity;
            }
            this.noItem = 0;
            Object.keys(this.cart).forEach(key => {
                if(this.cart[key].quantity>0){
                    this.noItem+=1;
                }
            });
        },
        removeItem(item){
            delete this.cart[item];
        },
        toggleSidebar(){
            this.showsidebar = !this.showsidebar;
        }
    },
    async mounted() {
        const res = await fetch('./food.json');
        const data = await res.json();
        this.inventory = data;
    }
})

app.component('sidebar',{
    props: ['toggle','cart','inventory','remove'],
    methods: {
        cartTotal() {
            let total = 0;
            Object.values(this.cart).forEach(values => {
                total += values.price * values.quantity;
            })
            return (total).toFixed(2);
        }
    },
    template: `
        <aside class="cart-container">
            <div class="cart">
                <h1 class="cart-title spread">
                    <span>
                        Cart
                        <i class="icofont-cart-alt icofont-1x"></i>
                    </span>
                    <button @click="toggle" class="cart-close">&times;</button>
                </h1>

                <div class="cart-body">
                    <table class="cart-table">
                        <thead>
                            <tr>
                                <th><span class="sr-only">Product Image</span></th>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Qty</th>
                                <th>Total</th>
                                <th><span class="sr-only">Actions</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(info, key, i) in cart" :key="i">
                                <td><i class="icofont-carrot icofont-3x"></i></td>
                                <td>{{ key }}</td>
                                <td>\${{ info.price }}</td>
                                <td class="center">{{ info.quantity }}</td>
                                <td>\${{ (info.quantity*info.price).toFixed(2) }}</td>
                                <td class="center">
                                    <button @click="remove(key)" class="btn btn-light cart-remove">&times;</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <p class="center" v-if="Object.keys(this.cart).length===0"><em>No items in cart</em></p>
                    <div class="spread">
                        <span><strong>Total:</strong> \${{ cartTotal() }}</span>
                        <button class="btn btn-light">Checkout</button>
                    </div>
                </div>
            </div>
        </aside>
    `
})

app.mount('#app')