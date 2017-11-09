<template lang="html">
  <div class="">
    <button @click="addRoll">Create Roll</button>

    <div>
      <app-rolls v-for="(roll, index) in rolls" v-model="rolls[index]"></app-rolls>
    </div>

    <!-- <div v-if="newRoll">
      <app-rolls @addRoll="addRollToRolls"></app-rolls>
    </div> -->

  </div>

</template>

<script>

import Rolls from './Rolls.vue';
import Shots from './Shots.vue';
import {eventBus} from '../main';
// import eventBus from '../helpers/eventBus.js';

function Roll() {
  this.rollTitle = "summer roll";
  this.rollFilmType = 'Portra';
  this.rollISO = '400';
  this.rollDescription = 'shots from last summer.';
  this.shotsArray = [];
}

export default {

  props: ['rollData'],
  // props: {
  //   rollData: {
  //     type: Array
  //   }
  // },

  data: function() {
    return {
      rolls: [new Roll(), new Roll(), new Roll()]
    };
  },

  methods: {
    addRoll() {
      this.rolls.push(new Roll());
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
