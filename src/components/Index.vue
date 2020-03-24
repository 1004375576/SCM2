<template>
    <div>  	   	  
  	   <my-content></my-content>	             
   </div>  
</template>

<script>

import Footer from '@/components/Footer';
import Content from '@/components/Content'

export default {
name: 'app',
   components: {     
      'my-content': Content,
      'my-footer': Footer,
    }
}	
     
	
</script>

<style>

</style>
