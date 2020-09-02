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
        <!-- Color -->
        <div>Choose a calendar color for this brew:</div>
        <verte v-model="brewColor" model="rgb"></verte>
        <!-- Date and Time -->
        <div class="row lineSection">
          <div class="column">
            <span class="rowItem">Set Date:</span>
            <v-date-picker mode="single" v-model="brewDate" is-inline />
          </div>
          <div class="column">
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
        <div class="sectionTitle">Brew Details</div>
        <div class="lineSection">
          <label for="brewVolume">Volume:</label>
          <input type="text" id="brewVolume" name="brewVolume" v-model="brewVolume" />
        </div>
        <div class="lineSection">
          <label for="brewYeast">Yeast:</label>
          <input type="text" id="brewYeast" name="brewYeast" v-model="brewYeast" />
        </div>
        <div class="lineSection">
          <label for="brewHops">Hops:</label>
          <input type="text" id="brewHops" name="brewHops" v-model="brewHops" />
        </div>
      </div>

      <div class="formSection">
        <div class="sectionTitle">Schedule</div>
        <div class="row">
          <span class="rowItem">Rest:</span>
          <v-date-picker mode="single" v-model="brewRestDate" />
        </div>
        <div class="row">
          <span class="rowItem">Dry-Hop:</span>
          <v-date-picker mode="single" v-model="brewDryHopDate" />
        </div>
        <div class="row">
          <span class="rowItem">Cold Crash:</span>
          <v-date-picker mode="single" v-model="brewColdCrashDate" />
        </div>
        <div class="row">
          <span class="rowItem">Bright Tank:</span>
          <v-date-picker mode="single" v-model="brewBrightTankDate" />
        </div>
        <div class="row">
          <span class="rowItem">Package:</span>
          <v-date-picker mode="single" v-model="brewPackageDate" />
        </div>
      </div>

      <div class="formSection">
        <div class="sectionTitle">Equipment</div>
         <div class="lineSection">
          <label for="fermentors">Fermentors:</label>
          <select name="fermentors" id="fermentors" mutliple v-model="fermentors">
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select>
        </div>
        <div class="lineSection">
          <label for="brightTanks">Bright Tanks:</label>
          <select name="brightTanks" id="brightTanks" mutliple v-model="brightTanks">
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select>
        </div>
        <div class="lineSection">
          <label for="system">System:</label>
          <select name="system" id="system" mutliple v-model="system">
            <option value="A">A</option>
            <option value="B">B</option>
          </select>
        </div>
        
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
import Verte from "verte";

export default {
  components: { VueTimepicker, Verte },
  data() {
    return {
      showSpinner: false,
      disableCancel: false,
      brewName: "",
      brewColor: "",
      brewers: [],
      brewVolume: "",
      brewYeast: "",
      brewHops: "",
      
      fermentors: [],
      brightTanks: [],
      system:'',
      brewDate: new Date(),
      newEntryTime: {
        hh: "08",
        mm: "00",
        a: "AM",
      },
    };
  },
  computed: {
brewPackageDate: function() {
  if(this.brewDate) {
return new Date(this.brewDate.getFullYear(), this.brewDate.getMonth(), this.brewDate.getDate() + 45)
  }
  else {
    return ''
  }
},
brewBrightTankDate: function() {
   if(this.brewDate) {
  return new Date(this.brewDate.getFullYear(), this.brewDate.getMonth(), this.brewDate.getDate() + 44)  
  }
   else {
    return ''
  }
},
      brewColdCrashDate: function() {
         if(this.brewDate) {
  return new Date(this.brewDate.getFullYear(), this.brewDate.getMonth(), this.brewDate.getDate() + 40)   
  }
  else {
    return ''
  }
},
      brewDryHopDate: function() {
         if(this.brewDate) {
  return new Date(this.brewDate.getFullYear(), this.brewDate.getMonth(), this.brewDate.getDate() + 30)  
  }
   else {
    return ''
  }
},
      brewRestDate: function() {
         if(this.brewDate) {
  return new Date(this.brewDate.getFullYear(), this.brewDate.getMonth(), this.brewDate.getDate() + 14)  
  }
   else {
    return ''
  }
}
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
      if (!this.brewDate) {
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
      console.log("color", this.brewColor);
      let data = {
        date: new Date(
          this.brewDate.getFullYear(),
          this.brewDate.getMonth(),
          this.brewDate.getDate(),
          h,
          this.newEntryTime.mm
        ),
        brewName: this.brewName,
        brewers: this.brewers,
        color: this.brewColor,
        hops: this.brewHops,
        volume: this.brewVolume,
        yeast: this.brewYeast,
         brewPackageDate: this.brewPackageDate,
      brewBrightTankDate: this.brewBrightTankDate,
      brewColdCrashDate: this.brewColdCrashDate,
      brewDryHopDate: this.brewDryHopDate,
      brewRestDate: this.brewRestDate,
       fermentors: this.fermentors,
      brightTanks: this.brightTanks,
      system:this.system
      };
      console.log(data);
      // Add new date to tripDates
      this.$store
        .dispatch("addBrewDayAction", data)
        .then((saves) => {
           Promise.all(saves).then(() => {
this.showSpinner = false;
          this.$emit("close");
          this.brewName = "";
          (this.brewers = []), (this.brewDate = "");
          this.newEntryTime = {
            hh: "08",
            mm: "00",
            a: "AM",
          };
          this.$toasted.show("Added brew day!");
           })
          
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
@import "../../node_modules/verte/dist/verte.css";
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