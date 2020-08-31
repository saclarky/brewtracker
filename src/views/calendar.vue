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
			class='custom'
            >
			<calendar-view-header
				slot="header"
				slot-scope="t"
				:header-props="t.headerProps"
				@input="setShowDate" />
		</calendar-view>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { CalendarView, CalendarViewHeader } from "vue-simple-calendar"
export default {
    mounted() {
console.log(this.brewDaysState)
    },
    components: {CalendarView, CalendarViewHeader},
    data: function() {
            return { 
                showDate: new Date(),
                radioFlex: 'month',
                countOfPeriod: 1,
            items: [{
            id: 'e1',
            startDate: '2020-08-19',
            title: 'Sample event 1'
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
            }
        }
}
</script>

<style scoped>
/* @import "../../node_modules/vue-simple-calendar/static/css/default.css"; */
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

.custom .cv-header,
.custom .cv-header-day {
	background-color: #7d9ccc;
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
    font-size: .7rem;
}

/* Events */

.custom .cv-event {
	border-color: #e0e0f0;
	border-radius: 0.5em;
	background-color: #e7e7ff;
	text-overflow: ellipsis;
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