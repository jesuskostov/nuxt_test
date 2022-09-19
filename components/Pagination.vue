<template>
  <ul class="w-full flex justify-center">
    <li v-if="pagination.current_page > 1">
      <a
        href="javascript:void(0)"
        aria-label="Previous"
        v-on:click.prevent="changePage(pagination.current_page - 1)"
      >
        <span aria-hidden="true">«</span>
      </a>
    </li>
    <li
      v-for="(page, i) in pagesNumber"
      :class="{ 'bg-blue-300': page == pagination.current_page }"
      :key="i"
      class="bg-red-400 p-2 flex items-center justify-center"
    >
      <a href="javascript:void(0)" v-on:click.prevent="changePage(page)">{{
        page
      }}</a>
    </li>
    <li v-if="pagination.current_page < pagination.last_page">
      <a
        href="javascript:void(0)"
        aria-label="Next"
        v-on:click.prevent="changePage(pagination.current_page + 1)"
      >
        <span aria-hidden="true">»</span>
      </a>
    </li>
  </ul>
</template>
<script>
export default {
  props: {
    pagination: {
      type: Object,
      required: true,
    },
    offset: {
      type: Number,
      default: 4,
    },
  },
  computed: {
    pagesNumber() {
      if (!this.pagination.to) {
        return [];
      }
      let from = this.pagination.current_page - this.offset;
      if (from < 1) {
        from = 1;
      }
      let to = from + this.offset * 2;
      if (to >= this.pagination.last_page) {
        to = this.pagination.last_page;
      }
      let pagesArray = [];
      for (let page = from; page <= to; page++) {
        pagesArray.push(page);
      }
      return pagesArray;
    },
    token() {
      return this.$store.state.user_token;
    },
  },
  methods: {
    changePage(page) {
      this.$emit("paginate", page);
    },
  },
};
</script>
