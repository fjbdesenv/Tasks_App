<template>
  <div>
    <MenuComponent/>
    <router-view/>
  </div>
</template>


<script>
import MenuComponent from '@/Components/MenuComponent.vue';

export default {
  name: 'DefaultLayout',
  components: {
    MenuComponent
  }
}
</script>
