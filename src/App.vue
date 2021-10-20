<template>
    <router-view />
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Audiowide&display=swap");
@import url('https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;600;700&display=swap');

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

h1, h2, h3, h4, h5, h6 {
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
</style>