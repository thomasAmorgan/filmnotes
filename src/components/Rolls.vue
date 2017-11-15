<!-- handles the displaying of a single roll object as a card that the user -->
<!-- can interact with to edit or delete the roll or shots -->
<template lang="html">

  <div class="w3-container w3-mobile">
<!-- TODO: Move the card class out here to reduce code -->

<!-- ~~~~~~~~~~~~~~~~~~~~~~ START - ROLL DETAIL CARD ~~~~~~~~~~~~~~~~~~~~~~~ -->
    <!-- this is for viewing the information about the roll without editing -->
    <!-- user can choose to view the shots in the roll without editing -->
    <!-- as well -->
    <div class="w3-cell-row" v-if="!editMode & !addingShot">
      <div class="w3-cell">
        <div class="w3-card-4 w3-light-gray">

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~ START - ROLL TITLE ~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
          <!-- displays the roll title -->
          <div class="w3-bar w3-black w3-center">
            <h4>{{roll.rollTitle}}</h4>
          </div>
<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~ END - ROLL TITLE ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~ START - NAVBAR ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
          <!-- navbar within roll to allow editing and or displaying the shots -->
          <div class="w3-row w3-bar w3-black w3-small w3-center">
            <div class="w3-col s4">
              <button @click="toggleEdit"
                      class="w3-button w3-black">Edit
              </button>
            </div>

            <!-- button will flip depending on what view is displayed roll or shots -->
            <div class="w3-col s4">
              <button @click="toggleView"
                      class="w3-button w3-black"
                      v-if="!viewShots">Shots
              </button>
              <button @click="toggleView"
                      class="w3-button w3-black"
                      v-if="viewShots">Roll
              </button>
            </div>

            <!-- brings up a view to edit info for a new shot -->
            <div class="w3-col s4">
              <button @click="toggleAddShot"
                      v-if="!addingShot"
                      class="w3-bar w3-button w3-black w3-small">Add Shot
              </button>
            </div>
          </div>
<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~ END - NAVBAR ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<!-- ~~~~~~~~~~~~~~~~~~~~~~~ START - ROLL DETAILS ~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
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
<!-- ~~~~~~~~~~~~~~~~~~~~~~~~ END - ROLL DETAILS ~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<!-- ~~~~~~~~~~~~~~~~~~~~~~ START - SHOT DETAIL LIST ~~~~~~~~~~~~~~~~~~~~~~~ -->
<!-- TODO: add delete button for shots view and a way to edit -->
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
<!-- ~~~~~~~~~~~~~~~~~~~~~~~ END - SHOT DETAIL LIST ~~~~~~~~~~~~~~~~~~~~~~~~ -->

          <hr>
        </div>
      </div>
    </div>
<!-- ~~~~~~~~~~~~~~~~~~~~~~~ END - ROLL DETAIL CARD ~~~~~~~~~~~~~~~~~~~~~~~~ -->

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~ START - ADD SHOT ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
    <div class="w3-cell-row" v-if="addingShot">
      <div class="w3-cell">
        <div class="w3-card-4 w3-light-gray">

          <div class="">
            <button @click="toggleAddShot"
                    v-if="addingShot"
                    class="w3-bar w3-button w3-blue-gray w3-small">Done
            </button>
          </div>

          <div class="w3-container" v-if="addingShot">
            <!-- toggleAddShot doesn't work quite right-->
            <app-shots @addShot="addShotToRoll"
                       v-if="!completed & addingShot">
            </app-shots>
          </div>
          <hr>
        </div>
      </div>
    </div>
<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~ END - ADD SHOT ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<!-- ~~~~~~~~~~~~~~~~~~~~~~ START - EDITS ROLL DATA ~~~~~~~~~~~~~~~~~~~~~~~~ -->
    <!-- allows for the editing of the roll's information, the values are -->
    <!-- linked with a custom v-model that will update the roll's info -->
    <!-- as soon as a value is changed -->
    <div class="w3-cell-row " v-if="editMode">
      <div class="w3-cell">
        <div class="w3-card-4 w3-light-gray">

          <!-- when clicked the editing mode switches back to view only -->
          <div class="">
            <button @click="toggleEdit"
                    class="w3-button w3-bar w3-black w3-small w3-center">Done
            </button>
          </div>

          <!-- all inputs for the roll data -->
          <div class="w3-container">
            <div class="">
              <label for="rollTitle" id="descripLabels">Title</label>
              <input type="text"
                     class="w3-input"
                     id="rollTitle"
                     v-model="roll.rollTitle"
                     @input="emitChange">
            </div>

            <div class="w3-center">
              <label id="descripLabels">Shots: {{ shotNumber }} / 36</label>
            </div>

            <div class="">
              <label for="rollFilmType" id="descripLabels">Film Type</label>
              <input type="text"
                     class="w3-input"
                     id="rollFilmType"
                     v-model="roll.rollFilmType"
                     @input="emitChange">
            </div>

            <div class="">
              <label for="rollISO" id="descripLabels">ISO</label>
              <input type="text"
                     class="w3-input"
                     id="rollISO"
                     v-model="roll.rollISO"
                     @input="emitChange">
            </div>

            <div class="">
              <label for="rollDescription" id="descripLabels">Description</label>
              <textarea id="rollDescription"
                        rows="5"
                        class="w3-input"
                        v-model="roll.rollDescription"
                        @input="emitChange">
              </textarea>
            </div>
          </div>

          <!-- button for deleting the roll -->
          <div class="w3-row">
            <div class="w3-col">
              <button @click="deleteRoll"
                      class="w3-bar w3-button w3-red w3-small">Delete Roll
              </button>
            </div>
          </div>

          <hr>

        </div>
      </div>
    </div>
<!-- ~~~~~~~~~~~~~~~~~~~~~~~~ END - EDITS ROLL DATA ~~~~~~~~~~~~~~~~~~~~~~~~ -->

  </div>

</template>

<script>
  import Shots from './Shots.vue';

  export default {
    // used to help make the roll useable as a v-model
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
      // pushes a shot to the roll's shots array and emits a change that will
      // update the data in the parent
      addShotToRoll(shot) {
        console.log("added shot");
        this.roll.shotsArray.push(shot);
        this.shotNumber++;
        this.emitChange();
      },
      // required to make roll a v-model, any change to the input emits a change
      emitChange() {
        console.log("emit");
        this.$emit('input', this.roll);
      },
      // ask user if they confirm to delete the roll, if yes the function will
      // emit an event that will tell the parent which roll needs to be deleted
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
      // toggles to help switch on and off views
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
      // used to check whether the current number of shots does not exceed 36
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
