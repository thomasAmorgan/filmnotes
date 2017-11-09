<template lang="html">
  <div class="">
    <button @click="addRoll">Create Roll</button>

    <div v-if="newRoll">
      <app-rolls @addRoll="addRollToRolls"></app-rolls>
    </div>

  </div>

</template>

<script>

import Rolls from './Rolls.vue';
import Shots from './Shots.vue';
import {eventBus} from '../main';
// import eventBus from '../helpers/eventBus.js';

export default {

  props: ['rollData'],
  // props: {
  //   rollData: {
  //     type: Array
  //   }
  // },

  data: function() {
    return {
      newRoll: false,
      newShot: false,
      tempRoll: {}
    };
  },

  methods: {
    addRoll() {
      this.newRoll = true;
    },
    addShot() {
      this.newShot = true;
    },
    addRollToRolls(roll) {
      this.tempRoll.push(roll);
    }
  },

  components: {
    'app-rolls': Rolls,
    'app-shots': Shots
  }

}
</script>

<style lang="css">
</style>
