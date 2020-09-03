<template>
<div class='navOffset'>
    <div class='section' v-for="brew in allBrewsGetter" :key='brew.id'>
        <div class='brewTitle'>{{brew.brewName}}</div>
        <div class='column'>
            <div class='row'><span>Brew Date:</span><span>{{brew.startDate}}</span></div>
           <div class='row'> <span>Brewers:</span><span v-for="b in brew.brewers" :key="b"><span style="padding:3px;">{{b}},</span></span></div>
            <div class='row'><span>ABV:</span><span>{{brew.ABV}}</span></div>
            <div class='row'><span>IBU:</span><span>{{brew.IBU}}</span></div>
            <div class='row'><span>Description:</span><span>{{brew.description}}</span></div>
            <a>Go to Details</a>
            <hr>
        </div>
    </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters(['allBrewsGetter'])
    }
}
</script>

<style scoped>
.section {
    padding: 10px
}
hr {
    color: black;
}
</style>