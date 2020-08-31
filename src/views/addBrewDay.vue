<template>
    <div class='navOffset'>
        Add Brew Day
        <form @submit.prevent>
        <div>Beer</div>
        <div>Schedule</div>
        <div>Yeast</div>
        <div>Equipment</div>

        <div class="row rowStyle">
                <div class="loader" v-if="showSpinner"></div>
                <input
                  type="submit"
                  class="rowItem"
                  @click="saveBrewDay"
                  value="Save"
                />
                <button class='rowItem'
                  @click="cancel"
                  :disabled="disableCancel"
                >Cancel</button>
              </div>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showSpinner: false,
            disableCancel: false
        }
    },
    methods: {
        cancel: function () {
            console.log('cancel')
        },
        saveBrewDay: function(e) {
            e.preventDefault()
        }
    }
    
}
</script>
<style scoped>
.rowStyle {
  justify-content: center;
  align-items: center;
  margin: 10px 0;
}
.rowItem {
  padding: 3px 10px;
}
button.rowItem {
  margin-left: 10px;
}
input,
button {
  margin: 5px;
}
</style>