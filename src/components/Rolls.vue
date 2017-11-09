<template lang="html">

  <div class="roll-container">
    <div class="">
      <label for="roll.rollTitle">Title</label>
      <input type="text"
             id="rollTitle"
             v-model="roll.rollTitle" @input="emitChange">
    </div>

    <div class="">
      <label for="roll.rollFilmType">Film Type</label>
      <input type="text"
             id="rollFilmType"
             v-model="roll.rollFilmType" @input="emitChange">
    </div>

    <div class="">
      <label for="roll.rollISO">ISO</label>
      <input type="text"
             id="rollISO"
             v-model="roll.rollISO" @input="emitChange">
    </div>

    <div class="">
      <label for="roll.rollDescription">Description</label>
      <textarea id="rollDescription"
                rows="5"
                v-model="roll.rollDescription" @input="emitChange">
      </textarea>
    </div>

    <!-- <button @click="saveRoll">Save</button> -->
    <button @click="saveRoll">Add Roll</button>
    <!-- <hr> -->

    <!-- <app-shots @addShot="addShotToRoll"></app-shots> -->
  </div>

</template>

<script>
import Shots from './Shots.vue';
import {eventBus} from '../main';
// import eventBus from '../helpers/eventBus.js';

export default {

  model: {
    prop: 'roll',
    event: 'input'
  },

  props: ["roll"],

  data: function() {

    return {
      // roll: {
      //   rollTitle: 'Summer 2017',
      //   rollFilmType: 'Portra',
      //   rollISO: '400',
      //   rollDescription: 'shots from last summer.',
      //   shotsArray: []
      // },
      editMode: false,
    };
  },

  methods: {
    // saveRoll() {
    //   // this.$emit('dataSaved', this.rollTitle);
    //   eventBus.saveRoll(this.roll);
    // },
    saveRoll() {
      this.$emit('addRoll', this.roll);
    },

    addShotToRoll(shot) {
      console.log("added shot");
      this.roll.shotsArray.push(shot);
    },
    emitChange() {
      console.log("emit");
      this.$emit('input', this.roll);
    }
  },
  computed: {

  },

  // mounted() {
  //   eventBus.$on('shotUpdated', (shot) => {
  //   this.roll.shotsArray.push(shot);
  //   });
  // },

  components: {
    'app-shots': Shots
  }
}
</script>

<style lang="css">
.roll-container {
  outline: 1px solid;
}
</style>
