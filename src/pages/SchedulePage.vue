<template>
<div id="schedule-page">
  <calendar />
</div>
</template>

<script>
import Calendar from '../components/Kalendar.vue';

export default {
  name: 'SchedulePage',
  components: {
    Calendar
},
data(){
  return{
    }
  }
}
</script>
<style scoped>
  #schedule-page {
    margin-left: 5%;
    margin-right: 5%;
    margin-top: 1%;
  }
</style>
