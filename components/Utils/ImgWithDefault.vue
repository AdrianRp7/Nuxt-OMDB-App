<template>
    <img :src="errorLoad ? '/img/image-no-available.jpg' : url" :alt="alt" @error="errorLoad">
</template>

<script lang="ts" setup>
    interface Props {
        url:string,
        alt?:string,
    }

    const {url} = defineProps<Props>();

    const errorLoad = ref(false)
</script>