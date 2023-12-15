<template>
    <div class="container">
        <h1> Aplicação de gestão de tarefas </h1>

        <div id="carousel" class="carousel slide" data-bs-touch="false" data-bs-interval="false">
            <div class="carousel-inner">

                <div v-for="(img, index) in imgs" :key="index" class="carousel-item active">
                    <img :src="img" class="d-block w-100" alt="">
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
            Use a nossa aplicação para uma melhor satisfação e resultado. Você terá uma melhor orgnização e seu desenpenho
            em suas tarefas ira tem uma muito superior.
        </p>

    </div>
</template>

<script>
import img1 from "@/Assets/img/HomeFundo/1.jpg";
import img2 from "@/Assets/img/HomeFundo/2.jpg";
import img3 from "@/Assets/img/HomeFundo/3.jpg";

export default {
    name: 'HomeView',
    data: () => ({
        imgs: [
            img1,
            img2,
            img3,
        ]
    })
}
</script>

<style scoped>
.carousel-item{
    max-height: 600px;
    max-width: 1000px;
}
</style>