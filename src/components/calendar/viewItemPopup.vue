<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-body">
            <form v-on:submit.prevent class="column">
              <div class="row lineStyle">
                <span>{{item.title}}</span>
              </div>
              <div v-if="item.originalEvent.brewers" class="row lineStyle">
              <span> Brewers: </span>
               <span v-for="brewer in item.originalEvent.brewers" :key='brewer'> {{brewer}},</span>
              </div>
           <a class='lineStyle'> Go to page </a>
              
              
              
              <div class="row rowStyle">
                 <div class="loader" v-if="showSpinner"></div>
                <input type="submit" class="rowItem" @click="saveNewTrip" value="Save" />
                <button @click="$emit('close')">Close</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: ['item'],
  data() {
    return {
      showSpinner: false,
      title: "",
      range: {
        start: new Date(),
        end: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()+2)
      },
      group: 'true',
      radioFlex: 'true',
      groupGearTemplate: 'None',
      indGearTemplate: 'None'
    }
  },
  
  methods: {
    saveNewTrip(e) {
      e.preventDefault();
      this.showSpinner = true;
      if (!this.title) {
        this.showSpinner = false;
        this.$toasted.show("Need a trip name!");
        return;
      }
      // DEFAULTS: flexible dates, today's dates, group trip, no gear list
      let booleanFlex
      let booleanGroup
      switch (this.radioFlex) {
        case true:
        case 'true':
          booleanFlex = true
          break
        default:
          booleanFlex = false
      }
      switch (this.group) {
        case true:
        case 'true':
          booleanGroup = true
          break
        default:
          booleanGroup = false
      }
      let data = {
        name: this.title,
        dateStart: this.range.start,
        dateEnd: this.range.end,
        finalDates: booleanFlex,
        group: booleanGroup,
        template: this.groupGearTemplate,
        indTemplate: this.indGearTemplate,
      };
      console.log(data)
      this.$store.dispatch("saveNewTripAction", data).then(() => {
        this.showSpinner = false
        this.$emit("close");
          this.$toasted.show("Success! Trip Saved.");      
      }).catch(e => {
        this.showSpinner = false
        console.log(e)
        this.$toasted.show(e.message)
      })
    },
  },
};
</script>

<style scoped>
.columnStyle {
  justify-content: center;
}
.leftColumn {
  align-items: flex-start;
}
.modal-mask {
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: auto;
}

.modal-container {
  /* width: 300px; */
  max-height: 80%;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  overflow-y: scroll;
}

.modal-body {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.rowItem {
  padding: 0 5px;
}
button.rowItem {
  margin-left: 10px;
}

/* .modal-default-button {
  float: right;
} */

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.rowStyle {
  justify-content: center;
  align-items: center;
  margin: 10px 0;
}
input,
button {
  margin: 5px;
}
.header {
  margin-bottom: 15px;
 
}
.teal {
   color: #42b983;
}
.smText {
  font-size: 1rem;
}
.hidden {
  display: none;
}
.lineStyle {
  padding: 10px 5px;
}
</style>