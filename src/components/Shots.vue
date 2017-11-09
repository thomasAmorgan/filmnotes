<template lang="html">

  <div>
    <button @click="editShot" v-if="!editMode">Add Shot</button>

    <div v-if="editMode" >
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
      <button @click="saveShot">Save</button>
    </div>
  </div>

</template>

<script>
import {eventBus} from '../main';

export default {

  props: ['roll'],

  data: function() {
    return {
      editMode: false,
      shot: {
        shotTitle: '',
        shotShutterSpeed: '',
        shotAperture: '',
        shotDescription: ''
      }
    }
  },

  methods: {
    saveShot: function() {
      this.$emit('addShot', this.shot);
      this.resetShot();
      this.editMode = false;
    },
    resetShot: function() {
      this.shot = {
        shotTitle: '',
        shotShutterSpeed: '',
        shotAperture: '',
        shotDescription: ''
      }
    },
    editShot() {
      this.editMode = true;
    }
  }


}
</script>

<style lang="css">
</style>
