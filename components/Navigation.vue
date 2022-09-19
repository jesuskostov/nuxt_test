<template>
  <div class="w-1/5 h-screen">
    <!-- Create offline/online overlay -->
    <div
      style="opacity: 40%"
      class="fixed inset-0 bg-black flex items-center justify-center"
      v-if="!onLine"
    >
      <p>You are offline</p>
      <p>You can't use the application</p>
    </div>
    <!-- Create offline/online overlay -->
    <!-- <div class="online-overlay" v-if="showBackOnline">
      <div class="online-overlay__content">
        <div class="online-overlay__content__icon">
          <i class="fa fa-wifi"></i>
        </div>
        <div class="online-overlay__content__text">
          <p>You are online</p>
          <p>You can now use the application</p>
        </div>
      </div>
    </div> -->
    <!-- <h1>
        {{
          !onLine
            ? "You are Offline..."
            : showBackOnline
            ? "Back Online..."
            : message
        }}
      </h1> -->
    <div v-if="user">
      <span
        class="absolute text-white text-4xl top-5 left-4 cursor-pointer"
        onclick="openSidebar()"
      >
        <i class="bi bi-filter-left px-2 bg-gray-900 rounded-md"></i>
      </span>
      <div class="sidebar p-2 h-screen overflow-y-auto text-center bg-gray-900">
        <div class="text-gray-100 text-xl">
          <div class="p-2.5 mt-1 flex items-center">
            <h1 class="font-bold text-gray-200 text-[15px] ml-3">
              {{ user.name }}
            </h1>
            <i
              class="bi bi-x cursor-pointer ml-28 lg:hidden"
              onclick="openSidebar()"
            ></i>
          </div>
          <div class="my-2 bg-gray-600 h-[1px]"></div>
        </div>
        <router-link
          to="/add-client"
          class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
          :class="{ 'bg-blue-600': active === 'add-client' }"
        >
          <i class="bi bi-house-door-fill"></i>
          <span class="text-[15px] ml-4 text-gray-200 font-bold"
            >Добави клиент</span
          >
        </router-link>
        <router-link
          to="/clients"
          class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
          :class="{ 'bg-blue-600': active === 'clients' }"
        >
          <i class="bi bi-bookmark-fill"></i>
          <span class="text-[15px] ml-4 text-gray-200 font-bold"
            >Всички клиенти</span
          >
        </router-link>
        <div class="my-4 bg-gray-600 h-px"></div>
        <div
          @click="logout"
          class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-red-600 text-white"
        >
          <i class="bi bi-box-arrow-in-right"></i>
          <span class="text-[15px] ml-4 text-gray-200 font-bold">ИЗЛЕЗ</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sidenav",
  data() {
    return {
      active: "",
      message: "Welcome to Vue!",
      onLine: "",
      showBackOnline: false,
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  watch: {
    onLine(v) {
      if (v) {
        this.showBackOnline = true;
        setTimeout(() => {
          this.showBackOnline = false;
        }, 1000);
      }
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/");
    },
    updateOnlineStatus(e) {
      const { type } = e;
      this.onLine = type === "online";
    },
  },
  mounted() {
    window.addEventListener("online", this.updateOnlineStatus);
    window.addEventListener("offline", this.updateOnlineStatus);
    this.onLine = navigator.onLine;
  },
  beforeDestroy() {
    window.removeEventListener("online", this.updateOnlineStatus);
    window.removeEventListener("offline", this.updateOnlineStatus);
  },
  beforeMount() {
    this.active = this.$nuxt.$route.path.split("/")[1];
  },
};
</script>
