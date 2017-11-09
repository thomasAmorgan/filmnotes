<template>

  <div class="">

    <h1>Film Notes</h1>

    <button @click="selectedComponent = 'app-add-roll'">Add Roll</button>

    <hr>

    <keep-alive>
      <component :is='selectedComponent'>
        <p>default</p>
      </component>
    </keep-alive>

  </div>

</template>

<script>

import AddRoll from './components/AddRoll.vue';
// import eventBus from './helpers/eventBus.js';
import {eventBus} from './main';

export default {

  data: function() {
    return {
      selectedComponent: 'app-add-roll',
      rollData: []
      // rollData: [
      //   {
      //   rollTitle: '',
      //   rollFilmType: '',
      //   rollISO: '',
      //   rollDescription: '',
      //   shotsArray: [
      //     {
      //         shotTitle: '',
      //         shotShutterSpeed: '',
      //         shotAperture: '',
      //         shotDescription: ''
      //     }
      //   ]
      // }]
    };
  },
  methods: {
    // rollUpdated() {
    //   eventBus.$on('rollUpdated', function(roll) {
    //   this.rollData.push(roll);
    //   });
    // }
  },
  // mounted() {
  //   console.log('mounted');
  //   eventBus.$on('rollUpdated', (roll) => {
  //   this.rollData.push(roll);
  //   });
  // },

  components: {
    'app-add-roll': AddRoll
  }
}
</script>
