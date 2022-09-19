<template>
  <div class="flex h-screen">
    <Navigation />
    <section class="container mx-auto p-6 font-mono">
      <div class="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
        <div class="w-full overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr
                class="text-sm font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600"
              >
                <th class="px-4 py-3">Име</th>
                <th class="px-4 py-3">Рег. номер</th>
                <th class="px-4 py-3">Тел. номер</th>
                <th class="px-4 py-3">Категория</th>
                <th class="px-4 py-3">Трайност (м.)</th>
                <th class="px-4 py-3">Дата на прегледа</th>
                <th class="px-4 py-3">Опции</th>
              </tr>
            </thead>
            <tbody v-if="clients" class="bg-white">
              <tr
                v-for="(client, i) in clients.data"
                :key="i"
                class="text-gray-700"
              >
                <td class="px-4 py-3 border">
                  <div class="flex items-center text-sm">
                    <div>
                      <p class="font-semibold text-black uppercase">
                        {{ client.name }}
                      </p>
                    </div>
                  </div>
                </td>
                <td class="px-4 py-3 text-ms font-semibold border">
                  {{ client.plate }}
                </td>
                <td class="px-4 py-3 text-xs border">{{ client.phone }}</td>
                <td class="px-4 py-3 text-sm border">{{ client.category }}</td>
                <td class="px-4 py-3 text-sm border">
                  {{ client.durability }} Месеца
                </td>
                <td class="px-4 py-3 text-sm border">
                  {{ new Date(`${client.date}`).toISOString().substr(0, 10) }}г.
                </td>
                <td class="px-4 py-3 text-sm border">
                  <!-- Edit button -->
                  <button @click="editClient(client.id)">E</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div v-if="clients">
        <Pagination
          :pagination="clients"
          @paginate="getClients($event, token)"
          :offset="4"
        />
      </div>
    </section>
  </div>
</template>

<script>
import Navigation from "../components/Navigation.vue";
import Pagination from "../components/Pagination.vue";

export default {
  components: {
    Navigation,
    Pagination,
  },
  data() {
    return {
      clients: {},
    };
  },
  computed: {
    token() {
      return this.$store.state.user_token;
    },
  },
  methods: {
    async getClients(page, token) {
      console.log(page, token);
      await this.$store.dispatch("getClients", { page, token });
      this.clients = this.$store.state.clients;
    },
    editClient(id) {
      setTimeout(() => {
        this.$router.push({ name: "add-client", params: { id } });
      }, 100);
    },
  },
  async beforeMount() {
    await this.$store.dispatch("checkAuth");
    const user_token = await this.$store.state.user_token;
    if (!user_token) {
      this.$router.push("/");
      return;
    }
    this.getClients(1, user_token);
  },
};
</script>
