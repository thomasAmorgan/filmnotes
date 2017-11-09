import Vue from 'vue'

export const eventBus = new Vue({
  methods: {
    saveRoll(roll) {
      this.$emit('rollUpdated', roll);
    }
  }
});
