<!-- handles the displying of all the rolls in the rolls array -->
<template lang="html">

  <div class="">
        <!-- will emit an event to the parent component that will add a new roll -->
        <button class="w3-bar w3-button w3-blue-gray w3-small"
                @click="addRoll">Create Roll
        </button>

        <hr>

        <!-- loops through all the rolls in the array and displays them -->
        <app-rolls v-for="(roll, index) in rolls"
                   v-model="rolls[index]"
                   @deleteRoll="removeRoll">
        </app-rolls>

        <!-- TODO: add a filter option -->

  </div>

</template>

<script>
  import Rolls from './Rolls.vue';

  export default {
    // allows access to the array of rolls from the parent component
    props: ["rolls"],

    methods: {
      addRoll() {
        this.$emit("newRoll");
      },
      // emits the index of the roll that the user wants to delete, the parent
      // will read in the index and then delete the correct roll
      removeRoll(roll) {
        var rollIndex = this.rolls.indexOf(roll);
        this.$emit("deleteRoll", rollIndex);
      }
    },

    components: {
      'app-rolls': Rolls,
    }
  }
</script>

<style lang="css">
</style>
