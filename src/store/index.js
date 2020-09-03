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
  router.push("/");
})

export default new Vuex.Store({
  state: {
    // USER DATA BINDS
    currentUser: null,
    userProfile: {},

    // BREWS
    brewsState: [],
    restDatesState: [],
    dryHopDatesState: [],
    coldCrashDatesState: [],
    brightTankDatesState: [],
    packageDatesState: []
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
    brewsMutate(state, val) {
      state.brewsState = val
    },
    restDatesMutate(state, val) {
      state.restDatesState = val
    },
    dryHopDatesMutate(state, val) {
      state.dryHopDatesState = val
    },
    coldCrashDatesMutate(state, val) {
      state.coldCrashDatesState = val
    },
    brightTankDatesMutate(state, val) {
      state.brightTankDatesState = val
    },
    packageDatesMutate(state, val) {
      state.packageDatesState = val
    },
  },
  getters: {
    allBrewsGetter: state => {
      function formatDate(dff) {
        let dd = new Date(Date.parse(dff))
         //am/pm
         let hours = dd.getHours();
         let flipper = " AM";
         if (hours >= 12) {
           if (hours > 12) {
             hours = hours - 12;
           }
           flipper = " PM";
         }
         if (hours == 0) {
           hours = 12;
         }
         let m = dd.getMinutes();
         m = m < 10 ? "0" + m : m;
 
         let newFormat =
           dd.toLocaleString("default", {
             month: "long"
           }) +
           " " +
           dd.getDate() + " " +
           dd.getFullYear() +
           ", " +
           hours +
           ":" +
           m +
           flipper;
        return newFormat
      }
      let brewIDs = []
      let allBrews =[]
      state.brewsState.forEach(day => {
        brewIDs.push(day.id)
      }) 
      brewIDs.forEach(id => {
        let tmp = state.brewsState.find(x => x.id === id);
         tmp.brewDate = formatDate(state.brewsState.find(x => x.id === id).startDate)
        tmp.rest = state.restDatesState.find(x => x.brewID === id).startDate;
        tmp.dryHop = state.dryHopDatesState.find(x => x.brewID === id).startDate;
        tmp.coldCrash = state.coldCrashDatesState.find(x => x.brewID === id).startDate;
        tmp.brightTank = state.brightTankDatesState.find(x => x.brewID === id).startDate;
        tmp.package = state.packageDatesState.find(x => x.brewID === id).startDate;
        allBrews.push(tmp)
      })
      return allBrews
    }
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
    },

    // BREW DAYS
    initAllBrewData: () => {
      // let data = []
      // realtime firebase connection
fb.db.collection('brews').orderBy('startDate', 'desc').onSnapshot(snapshot => {
  console.log("Brews data snapshot")
  let daysArray = []
  snapshot.forEach(doc => {
    let post = doc.data()
    post.id = String(doc.id)
    post.startDate = new Date(doc.data().startDate.seconds * 1000)
    daysArray.push(post)
  })
  console.log("Brew Days Array", daysArray)
  store.commit('brewsMutate', daysArray)
})

fb.db.collection('restDates').orderBy('startDate', 'desc').onSnapshot(snapshot => {
  console.log("Rest data snapshot")
  let daysArray = []
  snapshot.forEach(doc => {
    let post = doc.data()
    post.id = String(doc.id)
    post.startDate = new Date(doc.data().startDate.seconds * 1000)
    daysArray.push(post)
  })
  console.log("Rest Days Array", daysArray)
  store.commit('restDatesMutate', daysArray)
})

fb.db.collection('dryHopDates').orderBy('startDate', 'desc').onSnapshot(snapshot => {
  let daysArray = []
  snapshot.forEach(doc => {
    let post = doc.data()
    post.id = String(doc.id)
    post.startDate = new Date(doc.data().startDate.seconds * 1000)
    daysArray.push(post)
  })
  console.log("Hop Days Array", daysArray)
  store.commit('dryHopDatesMutate', daysArray)
})

fb.db.collection('coldCrashDates').orderBy('startDate', 'desc').onSnapshot(snapshot => {
  let daysArray = []
  snapshot.forEach(doc => {
    let post = doc.data()
    post.id = String(doc.id)
    post.startDate = new Date(doc.data().startDate.seconds * 1000)
    daysArray.push(post)
  })
  console.log("Crash Days Array", daysArray)
  store.commit('coldCrashDatesMutate', daysArray)
})

fb.db.collection('brightTankDates').orderBy('startDate', 'desc').onSnapshot(snapshot => {
  let daysArray = []
  snapshot.forEach(doc => {
    let post = doc.data()
    post.id = String(doc.id)
    post.startDate = new Date(doc.data().startDate.seconds * 1000)
    daysArray.push(post)
  })
  console.log("Tan Days Array", daysArray)
  store.commit('brightTankDatesMutate', daysArray)
})

fb.db.collection('packageDates').orderBy('startDate', 'desc').onSnapshot(snapshot => {
  let daysArray = []
  snapshot.forEach(doc => {
    let post = doc.data()
    post.id = String(doc.id)
    post.startDate = new Date(doc.data().startDate.seconds * 1000)
    daysArray.push(post)
  })
  console.log("Package Days Array", daysArray)
  store.commit('packageDatesMutate', daysArray)
})
    },
    addBrewDayAction: function (context, data) {
      console.log('save brew')
      fb.db.collection('brews').add({
        brewers: data.brewers,
        volume: data.volume,
        startDate: data.date,
        title: "Brew day: " + data.brewName,
        brewName: data.brewName,
        ABV: data.ABV,
        IBU: data.IBU,
        description: data.description,
        style: 'background-color:' + String(data.color)
      }).then(doc => {
        let saves = []
        console.log('brew added: ', doc.id)
        // Need the brew ID
        // TODO: tracking yeasts
      saves.push(fb.db.collection('yeasts').add({
        startDate: data.date,
        title: "Using " + data.yeast + " for " + data.brewName,
        style: 'background-color:' + String(data.color),
        brewID: doc.id
      }))
      saves.push(fb.db.collection('packageDates').add({
        title: 'Packaging ' + data.brewName,
        startDate: data.brewPackageDate,
        style: 'background-color:' + String(data.color),
        brewID: doc.id
      }))
      saves.push(fb.db.collection('brightTankDates').add({
        title: 'Bright tank ' + data.brewName,
        startDate: data.brewBrightTankDate,
        style: 'background-color:' + String(data.color),
        brewID: doc.id
      }))
      saves.push(fb.db.collection('coldCrashDates').add({
        title: 'Cold crash ' + data.brewName,
        startDate: data.brewColdCrashDate,
        style: 'background-color:' + String(data.color),
        brewID: doc.id
      }))
      saves.push(fb.db.collection('dryHopDates').add({
        title: 'Dry hop ' + data.brewName + " with " + data.hops,
        startDate: data.brewDryHopDate,
        style: 'background-color:' + String(data.color),
        brewID: doc.id
      }))
      saves.push(fb.db.collection('restDates').add({
        title: 'Rest ' + data.brewName,
        startDate: data.brewRestDate,
        style: 'background-color:' + String(data.color),
        brewID: doc.id
      }))

      // TODO: Equipment

      //  fermentors: this.fermentors,
      // brightTanks: this.brightTanks,
      // system:this.system

      return saves
      })
    }
  }
})
