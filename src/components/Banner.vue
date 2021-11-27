<template>
  <section class="section is-main-section">
    <!-- <div v-for="(banner, index) in allBanner" :key="index" class="card">
			<div class="card-image">
				<figure class="image is-4by3">
					<img
						src="https://bulma.io/images/placeholders/1280x960.png"
						alt="Placeholder image"
					/>
				</figure>
			</div>
		</div> -->
    <div class="columns is-multiline">
      <div
        v-for="(banner, index) in allBanner"
        :key="index"
        class="column is-one-quarter-desktop is-half-tablet"
      >
        <figure className="image is-4by3">
          <a
            style="text-decoration: none"
            :href="banner.link_banner"
            target="_blank"
          >
            <img
              :src="banner.img_banner"
              :alt="banner.name_banner"
            >
          </a>
        </figure>
      </div>
    </div>
  </section>
  <!-- <section class="section is-main-section">
		<article
			class="media notification has-background-white box"
			v-for="banner in allBanner"
			:key="banner.code_banner"
		>
			<div class="media-content">
				<div class="content">
					<h1 class="title is-size-4 has-text-black">
						<a
							style="text-decoration: none"
							:href="banner.link_banner"
							target="_blank"
							>{{ banner.name_banner }}</a
						>
					</h1>
					<figure class="image">
						<img :src="banner.img_banner" :alt="banner.name_banner" />
					</figure>
				</div>
			</div>
		</article>
	</section> -->
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
	methods: {
		...mapActions(['fetchBanner']),
	},
	computed: mapGetters(['allBanner']),
	created() {
		this.fetchBanner();
	},
};
</script>