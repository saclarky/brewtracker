<template>
    <div class='navOffset'>
        <div class='calendarReq'>
            <!-- The default calendar header emits an input event when a user clicks a button in the header to move the calendar 
            backward or forward through time. The event's argument is the new date to be shown. You have to handle this event and 
            pass the date back to the calendar to change the view. -->
		<calendar-view
			:show-date="showDate"
            :events="brewDaysState"
			class="theme-default">
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
            return { showDate: new Date(),
            items: [{
            id: 'e1',
            startDate: '2020-08-19',
            title: 'Sample event 1'
          }] 
          }
        },
        computed: {
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
@import "../../node_modules/vue-simple-calendar/static/css/default.css";
@import "../../node_modules/vue-simple-calendar/static/css/holidays-us.css";

.calendarReq {
    display: flex;
flex-direction: column;
flex-grow: 1;
}
</style>