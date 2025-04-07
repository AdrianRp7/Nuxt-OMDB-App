<template>
    <MediaDescription :id="id" />
</template>

<script lang="ts" setup>
    const route = useRoute();
    const id = route.params.id;
</script>