<template>
  <v-app dark>
    <v-app-bar
      fixed
      app
      hide-on-scroll
      height="86px"
      flat
      color="#FFFFFF"
      style="border-bottom: 1px solid #f0f0f0;"
    >
      <v-container grid-list-xs>
        <v-layout row wrap justify-center align-center>
          <nuxt-link class="linkCustom" to="/">
            <v-toolbar-title v-text="title" />
          </nuxt-link>
          <v-spacer />
          <v-btn
            :disabled="!allowFavorite"
            icon
            @click="toFavorite"
          >
            <template v-if="!isEmptyObj(feedback) && feedback.favorite != undefined && feedback.favorite != 0">
              <v-badge
                :value="feedback.favorite"
                :content="feedback.favorite"
                color="pink"
              >
                <v-icon>mdi-heart</v-icon>
              </v-badge>
            </template>
            <v-icon v-else>
              mdi-heart
            </v-icon>
          </v-btn>
        </v-layout>
      </v-container>
    </v-app-bar>
    <v-content>
      <nuxt />
    </v-content>
    <v-overlay :value="isLoading">
      <v-progress-circular indeterminate size="64" />
    </v-overlay>
  </v-app>
</template>

<script>
import { isObject } from '@/plugins/utils'

export default {
  data: () => ({
    title: 'rdfariz'
  }),
  computed: {
    feedback () {
      return this.$store.getters.feedback
    },
    isLoading () {
      return this.$store.getters.isLoading
    },
    allowFavorite () {
      return this.$store.getters.allowFavorite
    }
  },
  methods: {
    isEmptyObj (obj) {
      return isObject(obj)
    },
    toFavorite () {
      return this.$store.dispatch('toFavorite')
    }
  }
}
</script>
