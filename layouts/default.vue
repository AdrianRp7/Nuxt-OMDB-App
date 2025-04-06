<template>
    <div class="min-h-screen flex flex-col justify-between">
        <UtilsNavbar></UtilsNavbar>
        <main class="mx-auto container flex flex-col justify-start flex-1 ">
            <slot />
        </main>
        <UtilsFooter></UtilsFooter>
    </div>
</template>