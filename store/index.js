import axios from "axios";

export const state = () => ({
  user: null,
  user_token: null,
  clients: [],
});

export const mutations = {
  SET_USER(state, { user, token }) {
    console.log(",state", token);
    state.user = user;
    state.user_token = token;
    localStorage.setItem("email", user.email);
    localStorage.setItem("token", token);
  },
  SET_CLIENTS(state, clients) {
    state.clients = clients;
  },
  LOGOUT(state) {
    state.user = null;
    state.user_token = null;
  },
};

export const actions = {
  async login({ commit }, data) {
    // this.$axios.$get("/sanctum/csrf-cookie").then(async () => {
    // });
    // Login user
    const { user, token } = await this.$axios.$post("/api/login", {
      email: data.email,
      password: data.password,
    });
    commit("SET_USER", { user, token });
  },
  async setToken({ commit }, token) {
    this.$axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const data = await this.$axios.$get("/api/user");
    commit("SET_USER", { user: data, token });
  },
  async checkAuth({ commit }) {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    if (token) {
      this.$axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const data = await this.$axios.$get("/api/user");
      commit("SET_USER", { user: data, token });
    }
  },
  async addClient({ commit }, data) {
    // Try catch block
    try {
      await this.$axios.$post("/api/client", {
        name: data.name,
        plate: data.plate,
        phone: data.phone,
        date: data.date,
        category: data.category,
        durability: data.durability,
      });
      this.app.$toast.success(`УСПЕШНО ДОБАВИХТЕ ${data.name}`, {
        timeout: 7000,
      });
      return true;
    } catch (e) {
      Object.keys(e.response.data.errors).forEach((key, i) => {
        this.app.$toast.error(e.response.data.errors[key][0], {
          position: "top-right",
          timeout: (i + 1) * 1800,
          closeOnClick: true,
          pauseOnFocusLoss: true,
          pauseOnHover: true,
          draggable: true,
          draggablePercent: 0.6,
          showCloseButtonOnHover: false,
          hideProgressBar: true,
          closeButton: "button",
          icon: true,
          rtl: false,
        });
      });
      return false;
    }
  },
  // Get clients by token
  async getClients({ commit }, { page, token }) {
    this.$axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const data = await this.$axios.$get(`/api/clients?page=${page}`);
    commit("SET_CLIENTS", data);
  },
  // Get client by id
  async getClient({ commit }, { id, user_token }) {
    console.log(id, user_token);
    this.$axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${user_token}`;
    return await this.$axios.$get(`/api/client/${id}`);
  },
  // Update client
  async editClient({ commit }, { id, data, user_token }) {
    this.$axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${user_token}`;
    console.log(data.name);
    await this.$axios.$put(`/api/client/${id}`, {
      name: data.name,
      plate: data.plate,
      phone: data.phone,
      date: data.date,
      category: data.category,
      durability: data.durability,
    });
    this.app.$toast.success(`УСПЕШНО ОБНОВИХТЕ ${data.name}`, {
      timeout: 7000,
    });
  },
  // Delete client
  async deleteClient({ commit }, { id, user_token }) {
    this.$axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${user_token}`;
    await this.$axios.$delete(`/api/client/${id}`);
    this.app.$toast.success(`УСПЕШНО ИЗТРИХТЕ КЛИЕНТА`, {
      timeout: 7000,
    });
  },
  logout({ commit }) {
    // Logout user
    commit("LOGOUT", { user: null, token: null });
    localStorage.removeItem("email");
    localStorage.removeItem("token");
  },
};
