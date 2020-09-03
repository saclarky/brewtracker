<template>
    <div :class='offset'>
        <div class='main'>
            <div class='bar'>
                <div>   
        Welcome!
        </div>
        <div class='subhead'>
            Log-in or use the navigation bar to view the schedule and add beers.
        </div>
            </div>
        </div>
        
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    computed: {
        offset: function() {
            if(this.currentUser) {
                return {navOffset:true}
            } else {
                return {minOffset: true}
            }
        },
        ...mapState(['currentUser'])
    }
}
</script>

<style scoped>
.main {
    height: 100%;   
    background-image: url('../assets/barrels_bw_desktop.jpg');
    background-position: center;
  background-repeat: no-repeat;  
  background-size: cover;
    /* padding: 25px 0; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    color: white;
    font-size: 2rem;
}
.bar {
    background-color:rgb(138 76 0 / 75%);
    padding: 50px 25px;
}
.subhead {
    font-size: 1.5rem;
}
</style>