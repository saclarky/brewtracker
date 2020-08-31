<template>
  <div class="navOffset">
    <div class="title">Add to Brew Schedule</div>
    <form @submit.prevent>
      <div class="column formSection">
        <div class="lineSection">
          <label for="beerName">Brew Name:</label>
          <input type="text" id="beerName" name="beerName" v-model="brewName" />
        </div>
        <div class="lineSection">
          <label for="brewers">Brewers:</label>
          <select name="brewers" id="brewers" multiple v-model="brewers">
            <option value="Peter">Peter</option>
            <option value="Steve">Steve</option>
            <option value="Dave">Dave</option>
            <option value="Cliff">Cliff</option>
          </select>
        </div>
        <!-- Date and Time -->
        <div class='row lineSection'>
        
        <div class="column ">
          <span class="rowItem">Set Date:</span>
          <v-date-picker mode="single" v-model="newEntryDate" is-inline />
        </div>
        <div class="column ">
          <span class="rowItem">Set Time:</span>
          <vue-timepicker
            format="hh:mm A"
            :minute-interval="10"
            v-model="newEntryTime"
            close-on-complete
          ></vue-timepicker>
        </div>

      </div>
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
import VueTimepicker from "vue2-timepicker";
export default {
  components: { VueTimepicker },
  data() {
    return {
      showSpinner: false,
      disableCancel: false,
      brewName: "",
      brewers: [],
      newEntryDate: new Date(),
      newEntryTime: {
        hh: "08",
        mm: "00",
        a: "AM",
      },
    };
  },
  methods: {
    cancel: function () {
      console.log("cancel");
    },
    saveBrewDay(e) {
      e.preventDefault();
      this.showSpinner = true;
      if (!this.brewName) {
        this.showSpinner = false;
        this.$toasted.show("Please add a name.");
        return;
      }
      if (!this.newEntryDate) {
        this.showSpinner = false;
        this.$toasted.show("Please add a date.");
        return;
      }
      if (!this.newEntryTime) {
        this.showSpinner = false;
        this.$toasted.show("Please add a time.");
        return;
      }
      let h;
      if (this.newEntryTime.hh != 12 && this.newEntryTime.A === "PM") {
        h = parseInt(this.newEntryTime.hh) + 12;
      } else if (this.newEntryTime.hh == 12 && this.newEntryTime.A == "AM") {
        h = 0;
      } else {
        h = this.newEntryTime.hh;
      }
      let data = {
        date: new Date(
          this.newEntryDate.getFullYear(),
          this.newEntryDate.getMonth(),
          this.newEntryDate.getDate(),
          h,
          this.newEntryTime.mm
        ),
        brewName: this.brewName,
        brewers: this.brewers,
      };
      console.log(data);
      // Add new date to tripDates
      this.$store
        .dispatch("addBrewDayAction", data)
        .then(() => {
          this.showSpinner = false;
          this.$emit("close");
          this.brewName = "";
          (this.brewers = []), (this.newEntryDate = "");
          this.newEntryTime = {
            hh: "08",
            mm: "00",
            a: "AM",
          };
          this.$toasted.show("Added brew day!");
        })
        .catch((e) => {
          this.showSpinner = false;
          console.log(e);
          this.$toasted.show(e.message);
        });
    },
  },
};
</script>
<style scoped>
.title {
  margin: 25px 5px;
  font-size: 1.3rem;
}
.sectionTitle {
  margin: 5px;
  font-size: 1.1rem;
}
.formSection {
  padding: 25px;
}
.lineSection {
  margin: 20px 0;
}
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