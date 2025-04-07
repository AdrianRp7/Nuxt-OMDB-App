<template>
    <div class="min-h-screen flex flex-col justify-between">
        <UtilsNavbar></UtilsNavbar>
        <div class="background-secondary flex flex-1">
            <main class="main-container background-secondary flex flex-col justify-start flex-1">
                <slot />
            </main>
        </div>
        <UtilsFooter></UtilsFooter>
    </div>
</template>