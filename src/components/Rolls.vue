<template lang="html">

  <div class="w3-container w3-mobile">

    <div class="w3-cell-row" v-if="!editMode">
      <div class="w3-cell">
        <div class="w3-card-4 w3-light-gray">

          <div class="w3-bar w3-black w3-center">
            <h4>{{roll.rollTitle}}</h4>
          </div>

          <div class="w3-row w3-bar w3-black w3-small w3-center">
            <div class="w3-col s6">
              <button @click="toggleEdit"
                      class="w3-button w3-black">Edit
              </button>
            </div>

            <div class="w3-col s6">
              <button @click="toggleView"
                      class="w3-button w3-black"
                      v-if="!viewShots">Shots
              </button>
              <button @click="toggleView"
                      class="w3-button w3-black"
                      v-if="viewShots">Roll
              </button>
            </div>
          </div>

          <div class="w3-container" v-if="!viewShots">
            <div class="w3-row w3-center">
              <div class="w3-col s6">
                <p>Shots: {{roll.shotsArray.length}}/36</p>

              </div>
              <div class="w3-col s6">
                <p>{{roll.rollFilmType}} {{roll.rollISO}}</p>
              </div>
            </div>

            <div class="w3-center">
              <p>{{roll.rollDescription}}</p>
            </div>
          </div>

          <div class="w3-container w3-small" v-if="viewShots" v-for="(shot, index) in roll.shotsArray">
            <div class="w3-row">

              <div class="w3-col s6">
                <p><b>Title:</b> {{shot.shotTitle}}</p>
              </div>

              <div class="w3-col s6">
                <p><b>Shot Number:</b> {{index}}/36</p>
              </div>
            </div>

            <div class="w3-row">
              <div class="w3-col s6">
                <p><b>Shutter Speed:</b> {{shot.shotShutterSpeed}}</p>
              </div>

              <div class="w3-col s6">
                <p><b>Aperture:</b> {{shot.shotAperture}}</p>
              </div>
            </div>

            <div class="w3-row">
              <div class="w3-col">
                <p><b>Description:</b> {{shot.shotDescription}}</p>
              </div>
            </div>
          </div>

          <hr>

        </div>
      </div>
    </div>


    <div class="w3-cell-row " v-if="editMode">
      <div class="w3-cell">
        <div class="w3-card-4 w3-light-gray">

          <div class="">
            <button @click="toggleEdit"
                    class="w3-button w3-bar w3-black w3-small w3-center">Done</button>
          </div>

          <div class="w3-container" v-if="!addingShot">
            <div class="">
              <label for="roll.rollTitle" id="descripLabels">Title</label>
              <input type="text"
                     class="w3-input"
                     id="rollTitle"
                     v-model="roll.rollTitle" @input="emitChange">
            </div>

            <div class="w3-center">
              <label id="descripLabels">Shots: {{ shotNumber }} / 36</label>
            </div>

            <div class="">
              <label for="roll.rollFilmType" id="descripLabels">Film Type</label>
              <input type="text"
                     class="w3-input"
                     id="rollFilmType"
                     v-model="roll.rollFilmType" @input="emitChange">
            </div>

            <div class="">
              <label for="roll.rollISO" id="descripLabels">ISO</label>
              <input type="text"
                     class="w3-input"
                     id="rollISO"
                     v-model="roll.rollISO" @input="emitChange">
            </div>

            <div class="">
              <label for="roll.rollDescription" id="descripLabels">Description</label>
              <textarea id="rollDescription"
                        rows="5"
                        class="w3-input"
                        v-model="roll.rollDescription" @input="emitChange">
              </textarea>
            </div>
          </div>

          <div class="w3-row" v-if="!addingShot">
            <div class="w3-col">
              <button @click="deleteRoll" class="w3-bar w3-button w3-red w3-small">Delete Roll</button>
            </div>
          </div>

          <div class="">
            <!-- toggleAddShot doesn't work quite right-->
            <app-shots @click="toggleAddShot" @addShot="addShotToRoll" v-if="!completed"></app-shots>
          </div>
          <hr>

          <!-- TODO: add delete button for shots view and a way to edit -->

        </div>
      </div>
    </div>
  </div>

</template>

<script>
import Shots from './Shots.vue';

export default {

  model: {
    prop: 'roll',
    event: 'input'
  },

  props: ["roll"],

  data: function() {

    return {
      shotNumber: 0,
      editMode: false,
      viewShots: false,
      addingShot: false
    };
  },

  methods: {
    saveRoll() {
      this.$emit('addRoll', this.roll);
    },

    addShotToRoll(shot) {
      console.log("added shot");
      this.roll.shotsArray.push(shot);
      this.shotNumber++;
      this.emitChange();
    },
    emitChange() {
      console.log("emit");
      this.$emit('input', this.roll);
    },
    deleteRoll() {
      console.log("deleting roll");

      if (confirm("Are your sure you want to delete this Roll?") == true) {
        this.$emit('deleteRoll', this.roll);
        this.toggleEdit();
      }

      else {
        console.log("not deleted");
      }

    },
    toggleEdit() {
      this.editMode = !this.editMode;
    },
    toggleView() {
      this.viewShots = !this.viewShots;
    },
    toggleAddShot() {
      console.log("addingShot toggled")
      this.addingShot = !this.addingShot;
    }
  },

  computed: {
    completed() {
      if(this.shotNumber >= 36) {
        return true;
      }
      else {
        return false;
      }
    }
  },

  components: {
    'app-shots': Shots,
  }
}
</script>

<style lang="css">
  #descripLabels {
    font-style: italic;
    font-weight: bold;
  }
</style>
