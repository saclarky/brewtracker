<template>
    <div class='navOffset'>
        <div class='row rowPadding'>
            <div class='pad'>
            Calendar:
            </div>
            <input type='text' id='periodCount' v-model="countOfPeriod" placeholder='1'>
            <div class="row rowStyle">
                 <span class='row inputRow'>
                 <input type="radio" name="periodSelect" value="month" id="flex" v-model="radioFlex" selected>
                 <label class="rowItem smText" for="flex">Months</label>
                 </span>
                  <span class='row inputRow'>
                 <input type="radio" name="periodSelect" value="week" id="poss" v-model="radioFlex">
                 <label class="rowItem smText" for="poss">Weeks</label>
                    </span>
                  <span class='row inputRow'>
                 <input type="radio" name="periodSelect" value="year" id="hard" v-model="radioFlex">
                 <label class="rowItem smText" for="hard">Years</label>
                 </span>
              </div>
        </div>
        <div class='row rowPadding'>
            <div class='pad'>
            Events: 
            </div>
                <span class='row inputRow'>
            
            <input type='checkbox' id='bd' :value='showBrewDays' v-model='showBrewDays'>
            <label class="rowItem smText" for="bd">Brew</label>
            </span>
                <span class='row inputRow'>
            
            <input type='checkbox' id= 'rd' v-model='showRestDays'>
             <label class="rowItem smText" for="bd">Rest</label>
            </span>
                <span class='row inputRow'>
             
            <input type='checkbox' id='dhd' v-model='showDryHopDays'>
            <label class="rowItem smText" for="bd">Dry Hop</label>
            </span>
                <span class='row inputRow'>
            
            <input type='checkbox' id='ccd' v-model='showColdCrashDays'>
             <label class="rowItem smText" for="bd">Cold Crash</label>
            </span>
                <span class='row inputRow'>
            
            <input type='checkbox' id= 'btd' v-model='showBrightTankDays'>
             <label class="rowItem smText" for="bd">Bright Tank</label>
            </span>
                <span class='row inputRow'>
            
            <input type='checkbox' id= 'pd' v-model='showPackageDays'>
             <label class="rowItem smText" for="bd">Package</label>
            </span>
        </div>
        <div class='calendarReq'>
            <!-- The default calendar header emits an input event when a user clicks a button in the header to move the calendar 
            backward or forward through time. The event's argument is the new date to be shown. You have to handle this event and 
            pass the date back to the calendar to change the view. -->
		<calendar-view
			:show-date="showDate"
            :events="allCalItems"
            :displayPeriodUom='calPeriodDisplay'
            :displayPeriodCount='calPeriodCount'
			class="theme-default"
             @click-event="toggleItemModal" 
            >
            <!-- in v5 you can clcik in item directly, replace click-date -->
			<calendar-view-header
				slot="header"
				slot-scope="t"
				:header-props="t.headerProps"
				@input="setShowDate" 
                 />
		</calendar-view>
        </div>
        <viewItemPopup v-if="showItem" @close='toggleItemModal("","")' :item="item"></viewItemPopup>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { CalendarView, CalendarViewHeader } from "vue-simple-calendar"
import viewItemPopup from '../components/calendar/viewItemPopup'
export default {
    mounted() {
console.log(this.brewsState)
    },
    components: {CalendarView, CalendarViewHeader, viewItemPopup},
    data: function() {
        
            return { 
                showBrewDays: true,
        showRestDays: true,
        showDryHopDays: true,
        showColdCrashDays: true,
        showBrightTankDays: true,
        showPackageDays: true,
                showDate: new Date(),
                radioFlex: 'month',
                countOfPeriod: 1,
            item: '',
            showItem: false,
            tmpItems: [
				{
					id: "e0",
                    startDate: "2020-09-05",
                    title: 'test'
				}]
          }
        },
        computed: {
            calPeriodDisplay: function() {
                return this.radioFlex
            },
            calPeriodCount: function() {
                return Number(this.countOfPeriod)
            },
            allCalItems: function() {
                let blankArray = []
                if(this.showBrewDays == true) {
                    blankArray = blankArray.concat(this.brewsState)
                }
                 if(this.showRestDays == true) {
                    blankArray = blankArray.concat(this.restDatesState)
                }
                 if(this.showDryHopDays == true) {
                    blankArray = blankArray.concat(this.dryHopDatesState)
                }
                 if(this.showColdCrashDays == true) {
                    blankArray = blankArray.concat(this.coldCrashDatesState)
                }
                 if(this.showBrightTankDays == true) {
                    blankArray = blankArray.concat(this.brightTankDatesState)
                }
                 if(this.showPackageDays == true) {
                    blankArray = blankArray.concat(this.packageDatesState)
                }       
                return blankArray
            },
            ...mapState(['brewsState','restDatesState','dryHopDatesState','coldCrashDatesState','brightTankDatesState',
            'packageDatesState'])            
        },
		methods: {
			setShowDate(d) {
				this.showDate = d;
            },
            toggleItemModal(c,e) {
                console.log(c,e)
                // console.log(calendarItem)
                this.item = c
                this.showItem = !this.showItem
            }
        }
}
</script>

<style scoped>
@import "../components/calendar/defaultCustom.css";
.calendarReq {
    display: flex;
flex-direction: column;
flex-grow: 1;
min-height: 600px;
}
.rowPadding {
    padding: 15px 5px;
    display: flex;
    align-items: center;
}
.inputRow {
    padding-right: 15px;
    align-items: baseline;
    font-size: 0.8rem;
}
.rowStyle {
    align-items: center;
    
}
#periodCount {
    width: 25px;
    margin-right: 5px;
}
.pad {
    margin: 0 5px;
}
</style>