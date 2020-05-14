import Cookies from 'js-cookie'
import { firebase } from '@/plugins/firebase'
import { isObject } from '@/plugins/utils'

export const state = () => ({
  static: {},
  feedback: {},
  myWork: [],
  myExperience: [],
  isLoading: false,
  allowFavorite: false,
  isError: false
})
export const getters = {
  static: (state) => {
    return state.static
  },
  myWork: (state) => {
    return state.myWork
  },
  myExperience: (state) => {
    return state.myExperience
  },
  isLoading: (state) => {
    return state.isLoading
  },
  feedback: (state) => {
    return state.feedback
  },
  allowFavorite: (state) => {
    return state.allowFavorite
  }
}
export const mutations = {
  setStatic (state, payload) {
    state.static = payload
  },
  setMyWork (state, payload) {
    state.myWork = payload
  },
  setMyExperience (state, payload) {
    state.myExperience = payload
  },
  setLoading (state, payload) {
    state.isLoading = payload
  },
  setFeedback (state, payload) {
    state.feedback = payload
  },
  setAllowFavorite (state, payload) {
    state.allowFavorite = payload
  }
}
export const actions = {
  async getStatic ({ commit, state }) {
    const ref = this.$fireStore.collection('static').doc('data')
    try {
      if (isObject(state.static)) {
        await ref.onSnapshot((doc) => {
          commit('setStatic', doc.data())
        })
      }
    } catch (e) {
      commit('setStatic', {})
    } finally {
    }
  },
  async getFeedback ({ dispatch, commit, state }) {
    const ref = this.$fireStore.collection('feedback').doc('data')
    try {
      if (isObject(state.feedback)) {
        await ref.onSnapshot((doc) => {
          commit('setFeedback', doc.data())
          dispatch('checkAllowFavorite')
        })
      }
    } catch (e) {
      commit('setFeedback', { favorite: 0, oneTime: false })
    } finally {
    }
  },
  async toFavorite ({ dispatch, state }) {
    try {
      dispatch('setLoading', true)
      const ref = this.$fireStore.collection('feedback').doc('data')
      await ref.update({ favorite: firebase.firestore.FieldValue.increment(1) })
    } catch (e) {
    } finally {
      dispatch('setLoading', false)
      if (!isObject(state.feedback) && state.feedback.oneTime === true) {
        dispatch('setAllowFavorite', false)
      } else {
        dispatch('setAllowFavorite', true)
      }
    }
  },
  setAllowFavorite ({ commit }, newState) {
    if (newState === true) {
      Cookies.remove('_allowFavorite')
    } else {
      Cookies.set('_allowFavorite', newState, { expires: 1 })
    }
    commit('setAllowFavorite', newState)
  },
  checkAllowFavorite ({ commit, state }) {
    if (!isObject(state.feedback) && state.feedback.oneTime === true) {
      if (Cookies.get('_allowFavorite') && Cookies.get('_allowFavorite') === 'false') {
        commit('setAllowFavorite', false)
      } else {
        commit('setAllowFavorite', true)
      }
    } else {
      commit('setAllowFavorite', true)
    }
  },
  async getMyWork ({ commit }) {
    const ref = this.$fireStore.collection('portfolio').orderBy('order', 'asc')
    try {
      const data = await ref.get()
      const payload = []
      await data.docs.forEach((el) => {
        payload.push(el.data())
      })
      await commit('setMyWork', payload)
    } catch (e) {
      await commit('setMyWork', [])
    } finally {
    }
  },
  async getMyExperience ({ commit }) {
    const ref = this.$fireStore.collection('experience').orderBy('order', 'asc')
    try {
      const data = await ref.get()
      const payload = []
      await data.docs.forEach((el) => {
        payload.push(el.data())
      })
      await commit('setMyExperience', payload)
    } catch (e) {
      await commit('setMyExperience', [])
    } finally {
    }
  },
  setLoading ({ commit, state }, newState) {
    if (state.isLoading === true) {
      setTimeout(() => {
        commit('setLoading', newState)
      }, 500)
    } else {
      commit('setLoading', newState)
    }
  }
}
