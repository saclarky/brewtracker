<template>
    <div class='navOffset'>
        <div class='row periodOptions'>
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
        <div class='calendarReq'>
            <!-- The default calendar header emits an input event when a user clicks a button in the header to move the calendar 
            backward or forward through time. The event's argument is the new date to be shown. You have to handle this event and 
            pass the date back to the calendar to change the view. -->
		<calendar-view
			:show-date="showDate"
            :events="brewDaysState"
            :displayPeriodUom='calPeriodDisplay'
            :displayPeriodCount='calPeriodCount'
			class="theme-default holiday-us-traditional holiday-us-official"
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
console.log(this.brewDaysState)
    },
    components: {CalendarView, CalendarViewHeader, viewItemPopup},
    data: function() {
            return { 
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
            ...mapState(['brewDaysState'])
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
@import "../../node_modules/vue-simple-calendar/static/css/default.css";
@import "../../node_modules/vue-simple-calendar/static/css/holidays-us.css";
.calendarReq {
    display: flex;
flex-direction: column;
flex-grow: 1;
height: 800px;
}
.periodOptions {
    padding: 15px 5px;
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


</style>