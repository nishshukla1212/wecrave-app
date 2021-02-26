<template>
  <div class="home">
    <FirstScreen />
  </div>
</template>

<script>
// @ is an alias to /src
import FirstScreen from '@/components/FirstScreen.vue';

export default {
  name: 'Home',
  components: {
    FirstScreen,
  },
};
</script>
