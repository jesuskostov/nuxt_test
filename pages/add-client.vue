<template>
  <div v-if="user_token !== null" class="flex h-screen">
    <Navigation />
    <section class="container mx-auto font-mono">
      <form class="w-full max-w-lg mx-auto mt-8" @submit.prevent="addClient">
        <div>
          <div>
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="name"
            >
              Имена на клиента
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-5 px-4 mb-3 leading-tight focus:outline-none text-xl"
              id="name"
              v-model="name"
              v-on:keypress="isLetter($event)"
              type="text"
              placeholder="Иван Иванов"
            />
          </div>
          <div>
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="phone"
            >
              Телефон на клиента
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-5 px-4 mb-3 leading-tight focus:outline-none text-xl"
              id="phone"
              v-model="phone"
              type="text"
              @keypress="onlyNumber"
              placeholder="+3591231231234"
            />
          </div>
          <div>
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="plate"
            >
              Регистрационен номер
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-5 px-4 mb-3 leading-tight focus:outline-none text-xl"
              id="plate"
              v-model="plate"
              type="text"
              placeholder="СТ1313РР"
            />
            <!-- @keyup.prevent="plateCyrilization($event)" -->
          </div>
          <div>
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="category"
            >
              Категория
            </label>
            <select
              class="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-5 px-4 mb-3 leading-tight focus:outline-none text-xl"
              id="category"
              v-model="category"
            >
              <option v-for="(item, i) in categories" :key="i">
                {{ item.name }}
              </option>
            </select>
          </div>
          <div>
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="month"
            >
              Трайност (в месеци)
            </label>
            <select
              class="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-5 px-4 mb-3 leading-tight focus:outline-none text-xl"
              id="month"
              v-model="month"
            >
              <option v-for="(month, i) in months" :key="i">
                {{ month }}
              </option>
            </select>
          </div>
          <div>
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="date"
            >
              Дата на технически преглед
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-5 px-4 mb-3 leading-tight focus:outline-none text-xl"
              id="date"
              type="date"
              v-model="date"
            />
          </div>
          <div class="flex gap-x-4 mb-4">
            <button
              v-if="!editUserID"
              type="submit"
              class="text-2xl group relative w-full flex justify-center py-8 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-8"
            >
              ДОБАВИ
            </button>
            <button
              v-if="editUserID"
              @click="editClient"
              type="button"
              class="text-2xl group relative w-full flex justify-center py-8 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-8"
            >
              РЕДАКТИРАЙ
            </button>
            <button
              v-if="editUserID"
              @click="deleteClient"
              type="button"
              class="text-2xl group relative w-full flex justify-center py-8 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mt-8"
            >
              ИЗТРИЙ
            </button>
          </div>
        </div>
      </form>
    </section>
    <!-- <button @click="logout">Logout</button> -->
  </div>
</template>

<script>
import Navigation from "../components/Navigation.vue";

export default {
  components: {
    Navigation,
  },
  data() {
    return {
      name: "",
      plate: "",
      phone: "",
      category: "М1 - МПС до 8 места за сядане",
      categories: [
        { name: "М1 - МПС до 8 места за сядане", defaultMonth: 6 },
        { name: "M1G - МПС до 8 места за сядане", defaultMonth: 6 },
        { name: "М2 - МПС над 8 места за сядане / до 5т.", defaultMonth: 6 },
        { name: "М3 - МПС над 8 места за сядане / над 5т.", defaultMonth: 6 },
        { name: "N1 - МПС за превоз на товари до 3.5 т.", defaultMonth: 6 },
        { name: "N1G - МПС за превоз на товари до 3.5 т.", defaultMonth: 6 },
        {
          name: "N2 - МПС за превоз на товари над 3.5 т. / до 12 т.",
          defaultMonth: 6,
        },
        {
          name: "N2G - МПС за превоз на товари над 3.5 т. / до 12 т.",
          defaultMonth: 6,
        },
        { name: "N3 - МПС за превоз на товари над 12 т.", defaultMonth: 6 },
        { name: "N3G - МПС за превоз на товари над 12 т.", defaultMonth: 6 },
        { name: "O2 - Полуремарке над 0.75 т. / до 3.5 т.", defaultMonth: 6 },
        { name: "O2 - Ремарке над 0.75 т. / до 3.5 т.", defaultMonth: 6 },
        { name: "O3 - Полуремарке над 3.5 т. / до 10 т.", defaultMonth: 6 },
        { name: "O3 - Ремарке над 3.5 т. / до 10 т.", defaultMonth: 6 },
        { name: "О4 - Полуремарке над 10 т.", defaultMonth: 6 },
        { name: "О4 - Ремарке над 10 т.", defaultMonth: 6 },
        { name: "L1 - Мотопед", defaultMonth: 6 },
        { name: "L2 - Триколесно АТВ до 50 куб.см.", defaultMonth: 6 },
        { name: "L3 - Мотоциклет", defaultMonth: 6 },
        { name: "L4 - Мотоциклет с кош", defaultMonth: 6 },
        { name: "L5 - Триколесно АТВ над 50 куб.см.", defaultMonth: 6 },
        { name: "L6 - Четириколесно АТВ до 50 куб.см.", defaultMonth: 6 },
        { name: "L7 - Четириколесно АТВ над 50 куб.см.", defaultMonth: 6 },
      ],
      month: 12,
      months: [3, 6, 12, 18, 24, 36, 48, 60],
      date: new Date().toISOString().substr(0, 10),
      cyr_letters_obj: {},
      editUserID: null,
    };
  },
  computed: {
    user_token() {
      return this.$store.state.user_token;
    },
  },
  watch: {
    category() {
      this.month = this.categories.find(
        (category) => category.name === this.category
      ).defaultMonth;
    },
  },
  methods: {
    async addClient() {
      const data = {
        name: this.name,
        plate: this.plate,
        phone: this.phone,
        date: this.date,
        category: this.category,
        durability: this.month,
      };
      const added = await this.$store.dispatch("addClient", data);
      if (added) {
        this.clearInputs();
      }
    },
    editClient() {
      const data = {
        id: this.editUserID,
        name: this.name,
        plate: this.plate,
        phone: this.phone,
        date: this.date,
        category: this.category,
        durability: this.month,
      };
      let user_token = this.user_token;
      let id = this.editUserID;
      this.$store.dispatch("editClient", { id, data, user_token });
    },
    deleteClient() {
      let user_token = this.user_token;
      let id = this.editUserID;
      this.$store.dispatch("deleteClient", { id, user_token });
      this.clearInputs();
    },
    clearInputs() {
      this.name = "";
      this.plate = "";
      this.phone = "";
      this.month = 6;
      this.category = "М1 - МПС до 8 места за сядане";
      this.date = new Date().toISOString().substr(0, 10);
    },
    isLetter(e) {
      let char = String.fromCharCode(e.keyCode); // Get the character
      if (/^[а-яА-ЯA-Za-z-_\s]+$/.test(char)) return true; // Match with regex
      else e.preventDefault(); // If not match, don't add to input text
    },
    onlyNumber($event) {
      // Only numbers by regex
      let char = String.fromCharCode($event.keyCode); // Get the character
      if (/^[0-9\+]+$/.test(char)) return true; // Match with regex
      else $event.preventDefault(); // If not match, don't add to input text
    },
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/");
    },
  },
  async beforeMount() {
    await this.$store.dispatch("checkAuth");
    const user_token = await this.$store.state.user_token;
    if (!this.user_token) {
      this.user_token = user_token;
      this.$router.push("/");
    }
    this.editUserID = this.$route.params.id;
    if (this.editUserID) {
      const id = this.editUserID;
      const data = await this.$store.dispatch("getClient", {
        id,
        user_token,
      });
      this.name = data.name;
      this.plate = data.plate;
      this.phone = data.phone;
      this.category = data.category;
      this.month = data.durability;
      this.date = new Date(`${data.date}`).toISOString().substr(0, 10);
    }
  },
  mounted() {
    // Make array with the alphabet
    let cyr_letters = [
      "А",
      "Б",
      "В",
      "Г",
      "Д",
      "Е",
      "Ж",
      "З",
      "И",
      "Й",
      "К",
      "Л",
      "М",
      "Н",
      "О",
      "П",
      "Р",
      "С",
      "Т",
      "У",
      "Ф",
      "Х",
      "Ц",
      "Ч",
      "Ш",
      "Щ",
      "Ъ",
      "Ы",
      "Ь",
      "Э",
      "Ю",
      "Я",
    ];
    // Make array with english alphabet
    let en_letters = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ];
    this.cyr_letters_obj = {};
    for (let i = 0; i < cyr_letters.length; i++) {
      this.cyr_letters_obj[en_letters[i]] = cyr_letters[i];
    }
  },
};
</script>
