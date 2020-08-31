<template>
  <div class="navOffset">
    Add Brew Day
    <form @submit.prevent>
      <div class="formSection">
        <div class="sectionTitle">Beer</div>
        <label for="beerName">Name:</label>
        <input type="text" id="beerName" name="beerName" />

        <label for="brewers">Brewers:</label>

        <select name="brewers" id="brewers" multiple>
          <option value="volvo">Peter</option>
          <option value="saab">Steve</option>
          <option value="opel">Dave</option>
          <option value="audi">Cliff</option>
        </select>
      </div>

      <div class="formSection">
        <div class="sectionTitle">Schedule</div>
      </div>

      <div class="formSection">
        <div class="sectionTitle">Yeast</div>
      </div>

      <div class="formSection">
        <div class="sectionTitle">Equipment</div>
      </div>

      <div class="formSection"></div>
      <div class="row rowStyle">
        <div class="loader" v-if="showSpinner"></div>
        <input type="submit" class="rowItem" @click="saveBrewDay" value="Save" />
        <button class="rowItem" @click="cancel" :disabled="disableCancel">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showSpinner: false,
      disableCancel: false,
    };
  },
  methods: {
    cancel: function () {
      console.log("cancel");
    },
    saveBrewDay: function (e) {
      e.preventDefault();
    },
  },
};
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