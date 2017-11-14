<template>

  <div class="w3-mobile">
    <div class="w3-container w3-black">
      <h3>Film Notes</h3>
    </div>

    <div class="w3-bar w3-black">
      <div class="w3-row">
        <div class="w3-col s4 w3-center">
          <button @click="selectedComponent = 'app-viewrolls'"
                  class="w3-button w3-black w3-small">View Rolls</button>
        </div>

        <div class="w3-col s4 w3-center">
          <button @click="selectedComponent = ''"
                  class="w3-button w3-black w3-small">Edit Roll</button>
        </div>

        <div class="w3-col s4 w3-center">
          <button @click="selectedComponent = ''"
                  class="w3-button w3-black w3-small">Tips</button>
        </div>

      </div>
    </div>

    <keep-alive>
      <component :is='selectedComponent' :rolls="rolls" @newRoll="addRoll" @deleteRoll="deleteRoll">
        <p>default</p>
      </component>
    </keep-alive>
  </div>

</template>

<script>
import ViewRolls from './components/ViewRolls.vue';

function Roll() {
  this.rollTitle = "Summer roll";
  this.rollFilmType = 'Portra';
  this.rollISO = '400';
  this.rollDescription = 'Shots from last summer.';
  this.shotsArray = [];
}

export default {

  data: function() {
    return {
      rolls: [new Roll(), new Roll(), new Roll()],
      selectedComponent: 'app-viewrolls',
    };
  },

  methods: {
    addRoll() {
      this.rolls.push(new Roll());
    },
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
