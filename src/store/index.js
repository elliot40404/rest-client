import { createStore } from 'vuex';
import VuexPersistence from 'vuex-persist';

const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
});

const store = createStore({
    state: {
        name: '',
        id: '',
        businesses: [],
        customers: [],
        orders: [],
        products: [],
        stats: {},
        product: {},
    },
    mutations: {
        setName(state, name) {
            state.name = name;
        },
        setId(state, id) {
            state.id = id;
        },
        setBusinesses(state, businesses) {
            state.businesses = businesses;
        },
        setCustomers(state, customers) {
            state.customers = customers;
        },
        setOrders(state, orders) {
            state.orders = orders;
        },
        setProducts(state, products) {
            state.products = products;
        },
        setStats(state, stats) {
            state.stats = stats;
        },
        setProduct(state, product) {
            state.product = product;
        },
    },
    actions: {
        setName({ commit }, name) {
            commit('setName', name);
        },
        setId({ commit }, id) {
            commit('setId', id);
        },
        setBusinesses({ commit }, businesses) {
            commit('setBusinesses', businesses);
        },
        setCustomers({ commit }, customers) {
            commit('setCustomers', customers);
        },
        setOrders({ commit }, orders) {
            commit('setOrders', orders);
        },
        setProducts({ commit }, products) {
            commit('setProducts', products);
        },
        setStats({ commit }, stats) {
            commit('setStats', stats);
        },
        setProduct({ commit }, product) {
            commit('setProduct', product);
        },
    },
    getters: {
        name(state) {
            return state.name;
        },
        id(state) {
            return state.id;
        },
        businesses(state) {
            return state.businesses;
        },
        customers(state) {
            return state.customers;
        },
        orders(state) {
            return state.orders;
        },
        products(state) {
            return state.products;
        },
        getBusinessById(state) {
            return (id) => {
                return state.businesses.find(business => business._id === id);
            };
        },
        getCustomerById(state) {
            return (id) => {
                return state.customers.find(customer => customer._id === id);
            };
        },
        getOrderById(state) {
            return (id) => {
                return state.orders.find(order => order._id === id);
            };
        },
        getProductById(state) {
            return (id) => {
                return state.products.find(product => product._id === id);
            };
        },
        stats(state) {
            return state.stats;
        },
        product(state) {
            return state.product;
        },
    },
    plugins: [vuexLocal.plugin],
});

export default store;
