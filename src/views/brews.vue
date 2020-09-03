<template>
<div class='navOffset'>
    <div class='innerNav'> 
        <form @submit.prevent>
        <div class='row'>
            <span>Search:</span>
            <input type='text'>
            <input type='submit' value='Search' @click='searchBrews'>
        </div>
        </form>
        <div class='row'>Filter:</div>
    </div>
    <div class='layout'>
        
    <div class='section' v-for="brew in allBrewsGetter" :key='brew.id'>
        <div class='brewTitle'>{{brew.brewName}}</div>
        <div class='column'>
            <div class='row rowStyle'><span class='label'>Brew Date:</span><span class='content'>{{brew.brewDate}}</span></div>
           <div class='row rowStyle'> <span class='label'>Brewers:</span><span class='content' v-for="b in brew.brewers" :key="b"><span style="padding:3px;">{{b}},</span></span></div>
            <div class='row rowStyle'><span class='label'>ABV:</span><span class='content'>{{brew.ABV}}</span></div>
            <div class='row rowStyle'><span class='label'>IBU:</span><span class='content'>{{brew.IBU}}</span></div>
            <div class='row rowStyle'><span class='label'>Description:</span><span class='content'>{{brew.description}}</span></div>
            <a>Go to Details</a>
    
        </div>
    </div>
    </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters(['allBrewsGetter'])
    },
    methods: {
        searchBrews: function() {
            console.log('todo: search')
        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Long+Cang&display=swap');
.brewTitle {
    font-family: 'Long Cang', cursive;
    font-size: 2rem;
}
.layout {
    display: flex;
    flex-flow: row wrap;
    flex-basis: 100%;
    flex: 1;
    padding: 10px;
    box-sizing: border-box;
}
.section {
    /* margin: 10px; */
    padding: 10px;
    box-shadow: 2px 2px 5px #c1c1c1;
    width: 50%;
    box-sizing: border-box;
}

a {
     font-size: 0.8rem;
    color: blue;
    margin-top: 15px;
    margin-left: 10px;
    cursor: pointer;
}
.rowStyle {
    padding: 5px 10px;
}
.label {
    font-family: 'Long Cang', cursive;
    align-self: flex-end;
    width: 125px;
    padding-right: 15px;
    font-size: 1.2rem;
    color: #a0a0a0;
}
.content {
    align-self: center;
    font-size: .9rem;
    color: #444444;
}
.innerNav {
    padding: 25px;
}
.innerNav > input {
    padding-left: 10px;
}
</style>