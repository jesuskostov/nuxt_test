<template>
  <div>
    <div
      class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
    >
      <div v-if="!isAuthenticated" class="max-w-md w-full space-y-8">
        <div class="mb-10">
          <h1 class="text-6xl text-center">
            <b>Izti<span class="text-indigo-500 text-7xl">4</span>a.li</b>
          </h1>
          <p
            class="mt-2 text-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            ЩЕ ИЗВЕСТИМ ВСЕКИ ЕДИН!
          </p>
        </div>
        <form class="mt-8 space-y-6" @submit.prevent="login">
          <input type="hidden" name="remember" value="true" />
          <div class="rounded-md shadow-sm -space-y-px">
            <div>
              <label for="email-address" class="sr-only">Email address</label>
              <input
                id="email-address"
                v-model="username"
                name="email"
                type="email"
                autocomplete="email"
                required
                class="text-xl appearance-none rounded-none relative block w-full px-3 py-7 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                placeholder="Потребителско име"
              />
            </div>
            <div>
              <label for="password" class="sr-only">Password</label>
              <input
                id="password"
                v-model="password"
                name="password"
                type="password"
                autocomplete="current-password"
                required
                class="text-xl appearance-none rounded-none relative block w-full px-3 py-7 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                placeholder="Парола"
              />
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="text-sm">
              <a
                href="#"
                class="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Забравил си паролата?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="text-2xl group relative w-full flex justify-center py-8 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              ВХОД
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "IndexPage",
  data() {
    return {
      username: "",
      password: "",
      isAuthenticated: false,
    };
  },
  methods: {
    async login() {
      await this.$store.dispatch("login", {
        email: this.username,
        password: this.password,
      });
      this.checkAuth();
    },
    async checkAuth() {
      await this.$store.dispatch("checkAuth");
      const user_token = await this.$store.state.user_token;
      if (user_token) {
        this.isAuthenticated = true;
        this.$router.push("/add-client");
      } else {
        this.isAuthenticated = false;
        this.$router.push("/");
      }
    },
  },
  beforeMount() {
    this.checkAuth();
  },
};
</script>
