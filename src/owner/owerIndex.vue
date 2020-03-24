<template>
    <div>
  	   <my-content></my-content>
   </div>
</template>

<script>

import Footer from '@/components/Footer';
import Wcontent from '@/owner/Wcontent'

export default {
name: 'app',
   components: {
      'my-content': Wcontent,
      'my-footer': Footer,
    }
}


</script>

<style>

</style>
