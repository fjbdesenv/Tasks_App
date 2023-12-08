<template>
    <div class="m-3 " :class="classAlert">
        {{ texto }} <router-link :to="link" v-if="link && linkTexto">{{ linkTexto }}</router-link>
    </div>
</template>

<script>
export default {
    name: 'AlertComponent',
    props: {
        tipo:{
            type: String,
            required: true
        },
        texto:{
            type: String,
            required: true
        },
        link:{
            type: String,
        },
        linkTexto:{
            type: String,
        },
    },
    computed: {
        classAlert(){
            switch(this.tipo){
                case "erro":
                    return "alert alert-danger" 
                case "sucesso":
                    return "alert alert-success" 
                case "info":
                    return "alert alert-info" 
            }
            return '';
        }
    }
}
</script>