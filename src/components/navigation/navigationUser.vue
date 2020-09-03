<template>
  <header>
    <section class='nav'>
      <div>
        <!-- <div class="logo-wrap"><i class="material-icons"> near_me </i>	</div> -->
      
      </div>
      <div class='row rowStyle'>
              
          <div class="menu-item" >
          <router-link to="/addBrewDay">Add Brew Day</router-link>
        </div>
         
           <div class="menu-item" >
              <router-link to="/calendar">Calendar</router-link>
            </div>
            <div class="menu-item" >
              <router-link to="/brews">Brews</router-link>
            </div>
            <div class="menu-item last">
              <a @click="logout">Logout</a>
            </div>
      
   
      
      </div>
    </section>
  </header>
</template>

<script>


export default {
  data: function () {
    return {
    };
  },
 
  methods: {
    
    logout() {
      this.$store.dispatch('logout')
    },
  },
};
</script>

<style scoped>
section {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
}
.rowStyle {
  align-items:center;
}
.nav {
  top: 39px;
    left: 0;
    right: 0;
    position: fixed;
    background: #f5f5f5;
    z-index: 100;
}
.nav-menu {
  padding: 0 15px;
  /* background-color: #f7f7f7; */
  width: 120px;
  font-size: 1.2rem;
}
.menu {
  position: absolute;
  /* padding-top: 15px; */
  /* background-color: #f7f7f7; */
  width: inherit;

  box-shadow: 1px 1px 3px 1px rgba(57, 57, 57, 0.2);
}
/* .selected-menu-class {    
} */
.menu-item {
  font-size: 1.1rem;
  padding: 5px 15px;
}
.menu-item.last {
  padding: 5px 0 5px 15px;
}
.col {
  display: flex;
  margin: 0 10px;
}
a {
  color: #a75a19;
  font-size: .9rem;
  cursor:pointer;
  text-decoration: none;
}

a.router-link-exact-active {
  color: #ceb193;
}
/* ul {
    display: flex;
    list-style-type: none;
    justify-content: center;
    align-items: center;
}
    li {
            margin-top: 4px;
            margin-left: 6px;
            
        }
    a {
                display: block;
                padding: 5px;
                text-decoration: none;
            } */

</style>