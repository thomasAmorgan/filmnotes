<!-- This is the main driver component, allows for navigation between views -->
<!-- and contains the data for all the rolls a user may create -->
<template>

  <div class="w3-mobile">
    <!-- Main header -->
    <div class="w3-container w3-black w3-center">
      <h3>Film Notes</h3>
    </div>

    <!-- contains the top navbar, that allows the user to switch between views -->
    <div class="w3-bar w3-black">
      <div class="w3-row">
        <div class="w3-col s4 w3-center">
          <button @click="selectedComponent = 'app-viewrolls'"
                  class="w3-button w3-black w3-small">View Rolls</button>
        </div>

        <div class="w3-col s4 w3-center">
          <button @click="selectedComponent = ''"
                  class="w3-button w3-black w3-small">Tips</button>
        </div>

        <div class="w3-col s4 w3-center">
          <button @click="selectedComponent = ''"
                  class="w3-button w3-black w3-small">Settings</button>
        </div>
      </div>
    </div>

    <!-- displays the current view that user has selected -->
    <keep-alive>
      <component :is='selectedComponent'
                 :rolls="rolls"
                 @newRoll="addRoll"
                 @deleteRoll="deleteRoll"><p>default</p>
      </component>
    </keep-alive>
  </div>

</template>

<script>
  import ViewRolls from './components/ViewRolls.vue';
  // import rollCollection from './services/filmnotesLoki.js';
  // import Database from './services/filmNotesSqlite.js';

  // this is the Roll data object, is out here so it can be instantiated
  // multiple times as a new unique object
  function Roll() {
    this.rollTitle = "Summer roll";
    this.rollFilmType = 'Portra';
    this.rollISO = '400';
    this.rollDescription = 'Shots from last summer.';
    this.shotsArray = [];
  }

  export default {

    // the vue component consist of a rolls array which holds all the rolls
    // that a user may create
    data: function() {
      return {
        rolls: [new Roll(), new Roll(), new Roll()],

        /*
          iterate through all items in localforage, add to rolls array
        */

        // rolls: this.$vlf.getItem('rollDB').then(function(value) {
        //   // This code runs once the value has been loaded
        //   // from the offline store.
        //   console.log(value);
        // }).catch(function(err) {
        //   // This code runs if there were any errors
        //   console.log(err);
        // }),

        // rolls: rollCollection.find(),
        // this used to switch between component vues
        selectedComponent: 'app-viewrolls'
      };
    },

    methods: {
      addRoll() {
        this.rolls.push(new Roll());

        /*
          check if the roll exists
            TRUE: delete old roll
                  replace with new roll
                  reload database?

            FALSE: 

        */

        // this.$vlf.setItem('rollDB', [new Roll()]).then(function(value) {
        //   // This will output `1`.
        //   console.log(value[0]);
        // }).catch(function(err) {
        //   // This code runs if there were any errors
        //   console.log(err);
        // });


        // var temp = new Roll();
        // rollCollection.insert({roll: temp});
      },
      // recieves the index of the roll to be deleted and deletes it
      deleteRoll(rollIndex) {
        console.log("index received: " + rollIndex);
        this.rolls.splice(rollIndex, 1);
      }
    },

    components: {
      'app-viewrolls': ViewRolls,
    }
  }
</script>
