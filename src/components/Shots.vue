<template lang="html">

  <div>
    <button @click="saveShot">Add Shot</button>

    <div >
      <div>
        <div class="">
          <label for="shotTitle">Title</label>
          <input type="text"
                 id="shotTitle"
                 v-model="shot.shotTitle">
        </div>

        <div class="">
          <label for="shotShutterSpeed">Shutter Speed</label>
          <input type="text"
                 id="shotShutterSpeed"
                 v-model="shot.shotShutterSpeed">
        </div>

        <div class="">
          <label for="shotAperture">Aperture</label>
          <input type="text"
                 id="shotAperture"
                 v-model="shot.shotAperture">
        </div>

        <div class="">
          <label for="shotDescription">Notes</label>
          <textarea id="shotDescription"
                    rows="5"
                    v-model="shot.shotDescription">
          </textarea>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import {eventBus} from '../main';

export default {

  props: ['roll'],

  data: function() {
    return {
      shot: {
        shotTitle: '',
        shotShutterSpeed: '',
        shotAperture: '',
        shotDescription: ''
      }
    }
  },

  methods: {
    // saveShot: function() {
    //   eventBus.saveShot(this.shot);
    // },
    saveShot() {
      this.$emit('addShot', this.shot);
    }
  }


}
</script>

<style lang="css">
</style>
