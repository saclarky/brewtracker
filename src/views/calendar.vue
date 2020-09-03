<template>
    <div class='navOffset'>
        <div class='row rowPadding'>
            Duration
            <input type='text' id='periodCount' v-model="countOfPeriod" placeholder='1'>
            <div class="row rowStyle">
                 <input type="radio" name="periodSelect" value="month" id="flex" v-model="radioFlex" selected>
                 <label class="rowItem smText" for="flex">Months</label>
                 <input type="radio" name="periodSelect" value="week" id="poss" v-model="radioFlex">
                 <label class="rowItem smText" for="poss">Weeks</label>
                 <input type="radio" name="periodSelect" value="year" id="hard" v-model="radioFlex">
                 <label class="rowItem smText" for="hard">Years</label>
              </div>
        </div>
        <div class='row rowPadding'>
            Schedules to Display: 
            
                <span class='row inputRow'>
            <label class="rowItem smText" for="bd">Brew</label>
            <input type='checkbox' id='bd' :value='showBrewDays' v-model='showBrewDays'>
            </span>
                <span class='row inputRow'>
             <label class="rowItem smText" for="bd">Rest</label>
            <input type='checkbox' id= 'rd' v-model='showRestDays'>
            </span>
                <span class='row inputRow'>
             <label class="rowItem smText" for="bd">Dry Hop</label>
            <input type='checkbox' id='dhd' v-model='showDryHopDays'>
            </span>
                <span class='row inputRow'>
             <label class="rowItem smText" for="bd">Cold Crash</label>
            <input type='checkbox' id='ccd' v-model='showColdCrashDays'>
            </span>
                <span class='row inputRow'>
             <label class="rowItem smText" for="bd">Bright Tank</label>
            <input type='checkbox' id= 'btd' v-model='showBrightTankDays'>
            </span>
                <span class='row inputRow'>
             <label class="rowItem smText" for="bd">Package</label>
            <input type='checkbox' id= 'pd' v-model='showPackageDays'>
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
			class="custom"
             @click-event="toggleItemModal" 
            >
            <!-- in v5 you can clcik in item directly, replace click-date -->
			<calendar-view-header
				slot="header"
				slot-scope="t"
				:header-props="t.headerProps"
				@input="setShowDate" />
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
/* @import "../../node_modules/vue-simple-calendar/static/css/default.css"; */
/* @import "../../node_modules/vue-simple-calendar/static/css/holidays-us.css"; */
.calendarReq {
    display: flex;
flex-direction: column;
flex-grow: 1;
min-height: 800px;
}
.rowPadding {
    padding: 15px 5px;
}
.inputRow {
    padding-right: 15px;
    align-items: center;
}


/*
**************************************************************
This theme is the default shipping theme, it includes some
decent defaults, but is separate from the calendar component
to make it easier for users to implement their own themes w/o
having to override as much.
**************************************************************
*/

/* Header */
.custom .cv-header,
.custom .cv-header-day {
	background-color: #32637a;
}
.custom .cv-header .periodLabel {
	font-size: 1rem;
}
.custom .cv-header button {
	color: #7f7f7f;
}
.custom .cv-header button:disabled {
	color: #ccc;
	background-color: #f7f7f7;
}
/* Grid */
.custom .cv-day.past {
	background-color: #fafafa;
}
.custom .cv-day.outsideOfMonth {
	background-color: #f7f7f7;
}
.custom .cv-day.today {
	background-color: #ffe;
}
.custom .cv-wrapper, .custom .cv-wrapper div {
    line-height: 1.6rem;
    /* font-size: .7rem; */
}
/* Events */
.custom .cv-event {
	border-color: #e0e0f0;
	border-radius: 0.5em;
	background-color: #e7e7ff;
	text-overflow: ellipsis;
    font-size: .9rem;
}
.custom .cv-event.purple {
	background-color: #f0e0ff;
	border-color: #e7d7f7;
}
.custom .cv-event.orange {
	background-color: #ffe7d0;
	border-color: #f7e0c7;
}
.custom .cv-event.continued::before,
.custom .cv-event.toBeContinued::after {
	content: " \21e2 ";
	color: #999;
}
.custom .cv-event.toBeContinued {
	border-right-style: none;
	border-top-right-radius: 0;
	border-bottom-right-radius: 0;
}
.custom .cv-event.isHovered.hasUrl {
	text-decoration: underline;
}
.custom .cv-event.continued {
	border-left-style: none;
	border-top-left-radius: 0;
	border-bottom-left-radius: 0;
}
/* Event Times */
.custom .cv-event .startTime,
.custom .cv-event .endTime {
	font-weight: bold;
	color: #666;
}


</style>