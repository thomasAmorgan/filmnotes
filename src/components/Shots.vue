<!-- handles the creation of a new shot -->
<template lang="html">

  <div>
    <!-- when clicked it toggles the view to edit a new shot -->
    <button @click="editShot"
            v-if="!editMode"
            class="w3-bar w3-button w3-blue-gray w3-small">Add Shot
    </button>

    <div v-if="editMode" >
      <div class="w3-container">
        <div class="">
          <label for="shotTitle" id="descripLabels">Title</label>
          <input type="text"
                 class="w3-input"
                 id="shotTitle"
                 v-model="shot.shotTitle">
        </div>

        <div class="">
          <label for="shotShutterSpeed" id="descripLabels">Shutter Speed</label>
          <input type="text"
                 class="w3-input"
                 id="shotShutterSpeed"
                 v-model="shot.shotShutterSpeed">
        </div>

        <div class="">
          <label for="shotAperture" id="descripLabels">Aperture</label>
          <input type="text"
                 class="w3-input"
                 id="shotAperture"
                 v-model="shot.shotAperture">
        </div>

        <div class="">
          <label for="shotDescription" id="descripLabels">Notes</label>
          <textarea id="shotDescription"
                    class="w3-input"
                    rows="5"
                    v-model="shot.shotDescription">
          </textarea>
        </div>
      </div>

      <!-- one button to save the shot to the roll and another to discard it -->
      <div class="w3-bar w3-small w3-row">
        <div class="w3-col s6 w3-center w3-blue-gray ">
          <button @click="saveShot" class=" w3-button w3-blue-gray">Save</button>
        </div>
        <div class="w3-col s6 w3-center w3-red">
          <button @click="discardShot" class=" w3-button w3-red">Discard</button>
        </div>
      </div>

    </div>
  </div>

</template>

<script>
  export default {

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
      // emits an event to the parent so the shot can be added to the roll
      // resets the page so a new shot can be added after and hides editor view
      saveShot() {
        this.$emit('addShot', this.shot);
        this.resetShot();
        this.editMode = false;
      },
      resetShot() {
        this.shot = {
          shotTitle: '',
          shotShutterSpeed: '',
          shotAperture: '',
          shotDescription: ''
        }
      },
      editShot() {
        this.editMode = true;
      },
      // prompts user if they want to discard the shot if yes it resets the shot
      // info and hides the editor view
      discardShot() {
        if (confirm("Are you sure you want to discard this shot?") == true) {
          this.editMode = false;
          this.resetShot();
        }
        else {
          console.log("ignore discard");
        }
      }
    }
  }
</script>

<style lang="css" scoped>
  #descripLabels {
    font-style: italic;
    font-weight: bold;
  }
</style>
