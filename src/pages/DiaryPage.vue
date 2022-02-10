<template>
  <div id="diary-page">
  <Diaryschedule />
</div>
</template>

<script>
import Diaryschedule from '../components/Diaryschedule.vue'

export default {
  name: 'DiaryPage',
    components: { 
    Diaryschedule
},
  data(){
    return{
    }
  }
}
</script>

<style>

</style>
