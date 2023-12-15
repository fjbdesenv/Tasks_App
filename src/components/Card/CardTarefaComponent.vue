<template>
    <div class="card m-2" style="width: 18rem;">
        <img :src="ImageTarefa" class="card-img-top w-75 m-auto" alt="Imagem da tarefa">
        <div class="card-body">
            <h5 class="card-title">{{ titulo }}</h5>
            <p class="card-text">Descrição: {{ descricao }}</p>
            <p class="card-text">Data: {{ data }}</p>
            <p class="card-text">Início: {{ horarioInicio }}</p>
            <p class="card-text">Fim: {{ horarioFim }}</p>
            <p class="card-text">Status: {{ statusNome }}</p>
            <router-link to="/tarefas/edicao/1"><button class="btn btn-primary">Editar</button></router-link>
            <button class="btn btn-danger mx-2">Deletar</button>
        </div>
    </div>
</template>

<script>
import ImageTarefa from "@/Assets/img/defaultTarefa.png";

export default {
    name: 'CardTarefaComponent',
    data: () => ({
        ImageTarefa
    }),
    props: {
        titulo: {
            type: String,
            required: true
        },
        descricao: {
            type: String,
            required: true
        },
        data: {
            type: String,
            required: true
        },
        horarioInicio: {
            type: String,
            required: true
        },
        horarioFim: {
            type: String,
            required: true
        },
        status: {
            type: Number,
            required: true
        },  
    },
    computed:{
        statusNome(){
            let aux = '';
            switch(this.status){
                case 1: 
                    aux = "Não iniciada"
                    break;
                case 2: 
                    aux = "Em execução"
                    break; 
                case 3: 
                    aux = "Finalizada"
                    break; 
            }
            return aux;
        }
    }
}
</script>