<template>
    <router-view v-slot="{ Component }">
        <keep-alive>
            <component :is="Component" />
        </keep-alive>
    </router-view>
    <nav>
        <router-link to="/">REQUEST</router-link>
        <router-link to="/response">RESPONSE</router-link>
    </nav>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Audiowide&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;600;700&display=swap");

@import "assets/main.scss";

* {
    padding: 0%;
    margin: 0%;
    box-sizing: border-box;
    // font-family: "Audiowide", "Heebo", sans-serif;
}

html {
    font-size: 10px;
}

body {
    background: $dark;
}

#app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

h1,
h2,
h3,
h4,
h5,
h6 {
    font-family: "Audiowide", "Heebo", sans-serif;
}

select {
    font-family: "Audiowide", "Heebo", sans-serif;
}

h1 {
    font-size: 2.5rem;
}
h2 {
    font-size: 2rem;
}
h3 {
    font-size: 1.5rem;
}
h4 {
    font-size: 1.25rem;
}
h5 {
    font-size: 1rem;
}
h6 {
    font-size: 0.875rem;
}
nav {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    background: $primary;
    border-radius: 10px 10px 0 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 5px 21px;
    a {
        color: #000;
        cursor: pointer;
        font-family: "Audiowide", sans-serif;
        text-decoration: none;
        font-size: 2rem;
        &:hover {
            color: rgb(255, 255, 255);
        }
    }
}
</style>