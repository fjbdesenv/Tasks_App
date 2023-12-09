<template>
    <div class="container">
        <h1> Aplicação de gestão de tarefas </h1>
        
        <div id="carousel" class="carousel slide" data-bs-touch="false" data-bs-interval="false">
            <div class="carousel-inner">

                <div class="carousel-item active">
                    <img src="../Assets/img/HomeFundo/1.jpg" class="d-block w-100" alt="">
                </div>
                
                <div class="carousel-item">
                    <img src="../Assets/img/HomeFundo/2.jpg" class="d-block w-100" alt="Imagem de fundo 2">
                </div>
                
                <div class="carousel-item">
                    <img src="../Assets/img/HomeFundo/3.jpg" class="d-block w-100" alt="Imagem de fundo 3">
                </div>

            </div>
            
            <button class="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Anterior</span>
            </button>

            <button class="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Próximo</span>
            </button>
        
        </div>

        <p class="m-3">
            Use a nossa aplicação para uma melhor satisfação e resultado. Você terá uma melhor orgnização e seu desenpenho em suas tarefas ira tem uma muito superior.
        </p>

    </div>
</template>

<script>

export default {
    name: 'HomeView',
}
</script>