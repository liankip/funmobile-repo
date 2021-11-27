<template>
  <article
    v-for="info in allInfo"
    :key="info.code_info"
    class="media notification has-background-white box"
  >
    <div class="media-content">
      <div class="content">
        <h1 class="title is-size-4 has-text-black">
          {{ info.name_info }}
        </h1>
        <p class="subtitle is-size-6 has-text-black">
          {{ info.desc_info }}
        </p>
      </div>
    </div>
  </article>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
	methods: {
		...mapActions(['fetchInfo']),
	},
	computed: mapGetters(['allInfo']),
	created() {
		this.fetchInfo();
	},
};
</script>