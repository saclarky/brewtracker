import Vue from 'vue'
import Vuex from 'vuex'
import store from '../store'
import router from '../router'
const fb = require('../firebaseConfig.js')

Vue.use(Vuex)

// handle page reload... this is also in main.js to slow down vue reloads until signed-in?? Why does this fire first?
fb.auth.onAuthStateChanged(user => {
  // TODO- logout clear data??
  console.log('auth state change triggered index.js')
  if (user) {
    console.log('creation ', user.metadata.creationTime)
    console.log('signin ', user.metadata.lastSignInTime)
    if (user.metadata.creationTime == user.metadata.lastSignInTime) {
      console.log('new user! but do this without ms seems sketchy. Other option have a state object changed when registering?')
      // Don't fetch or commit the currentuser/profile it likely hasn't been saved yet, code in login.vue will do it
      return
    } else {
      console.log('existing user, saving to state')
      store.commit('setCurrentUser', user)
      store.dispatch('fetchUserProfile')
    }
  }
  else {
    console.log('set null? like if I delete someone and this reacts')
    store.commit('setCurrentUser', null);
    store.commit('setUserProfile', {});
  }
})

export default new Vuex.Store({
  state: {
     // USER DATA BINDS
     currentUser: null,
     userProfile: {},
  },
  mutations: {
    // LOGIN // AUTH STUFF
    setCurrentUser(state, val) {
      console.log("commit current user")
      console.log(val)
      state.currentUser = val
    },
    setUserProfile(state, val) {
      console.log('commit user profile')
      console.log(val)
      state.userProfile = val
    },
  },
  actions: {
    logout: function (context) {
      fb.auth
        .signOut()
        .then(() => {
          console.log('then')
          context.dispatch("clearData"); // authStateChange actually can do this?
          router.push("/login");
        })
        .catch((err) => {
          console.log(err);
        });
    },
     // LOGGING IN // AUTH STUFF //
     fetchUserProfile({ commit, state }) {
      console.log('handle empty profiles more elegantly...')
      console.log('dispatch user profile get, TODO ONLY RUN when need it, not on auth state change...? maybe null it on auth change');
      console.log(state.currentUser.uid)
      fb.db.collection('users').doc(state.currentUser.uid).get().then(res => {
        console.log('user profile exists? ', res.exists)
        if (res.exists) {
          console.log('got the profile')
          commit('setUserProfile', res.data())
        } else {
          console.log('no usch profile, just registered? need to reoslve promises...')
          commit('setUserProfile', { 'name': '' })
        }

      }).catch(err => {
        console.log(err)
      })
    },
    clearData({ commit }) {
      commit('setCurrentUser', null);
      commit('setUserProfile', {});
    },
    updateProfile(context, data) {
      let name = data.name

      fb.db.collection('users').doc(context.state.currentUser.uid).update({ name })
        // .then(user => {
        // // update all posts by user to reflect new name
        // fb.postsCollection.where('userId', '==', state.currentUser.uid).get().then(docs => {
        //     docs.forEach(doc => {
        //         fb.postsCollection.doc(doc.id).update({
        //             userName: name
        //         })
        //     })
        // })
        // // update all comments by user to reflect new name
        // fb.commentsCollection.where('userId', '==', state.currentUser.uid).get().then(docs => {
        //     docs.forEach(doc => {
        //         fb.commentsCollection.doc(doc.id).update({
        //             userName: name
        //         })
        //     })
        // })
        // })
        .catch(err => {
          console.log(err)
        })
    }
  }
})
