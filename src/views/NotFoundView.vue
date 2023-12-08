<template>
	<AlertComponent 
		tipo="erro" 
		texto="Página não encontrada!"
		link="/login/login"
		linkTexto="Ir para login"
	/>
</template>

<script>
import AlertComponent from "@/components/AlertComponent.vue";

export default {
	name: 'NotFoundView',
	components:{
		AlertComponent
	}
}
</script>
