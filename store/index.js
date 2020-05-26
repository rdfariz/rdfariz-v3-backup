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
  isError: false,
  myWorkCategory: [],
  myExperienceCategory: []
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
  },
  myWorkCategory: (state) => {
    return state.myWorkCategory
  },
  myExperienceCategory: (state) => {
    return state.myExperienceCategory
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
  },
  setMyWorkCategory (state, payload) {
    state.myWorkCategory = payload
  },
  setMyExperienceCategory (state, payload) {
    state.myExperienceCategory = payload
  }
}
export const actions = {
  async nuxtServerInit({ dispatch, commit }, { res }) {
    await dispatch('getStatic')
    await dispatch('getMyWork')
    await dispatch('getMyExperience')
    await dispatch('getFeedback')
  },
  async getStatic ({ commit, state }) {
    const ref = this.$fireStore.collection('static').doc('data')
    try {
      if (isObject(state.static)) {
        await ref.onSnapshot(async (doc) => {
          commit('setStatic', doc.data())

          const staticData = await doc.data()
          if (staticData.categoryList !== undefined) {
            const categoryList = staticData.categoryList
            if (categoryList !== undefined && Array.isArray(categoryList.portfolio) && categoryList.portfolio.length > 0) {
              commit('setMyWorkCategory', categoryList.portfolio)
            }
            if (categoryList !== undefined && Array.isArray(categoryList.experience) && categoryList.experience.length > 0) {
              commit('setMyExperienceCategory', categoryList.experience)
            }
          }
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
      const promise = data.docs.map(async el => {
        return await el.data()
      })
      const payload = await Promise.all(promise)
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
      const promise = data.docs.map(async el => {
        return await el.data()
      })
      const payload = await Promise.all(promise)
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
