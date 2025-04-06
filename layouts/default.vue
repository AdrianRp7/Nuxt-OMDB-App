<template>
    <div class="min-h-screen flex flex-col justify-between">
        <UtilsNavbar></UtilsNavbar>
        <main class="main-container flex flex-col justify-start flex-1">
            <slot />
        </main>
        <UtilsFooter></UtilsFooter>
    </div>
</template>