<template>
    <div>
        <button class="btn" :value="name"></button>
    </div>
</template>

<script>
export default {
    props: {
        name: String
    }
}
</script>

<style scoped>

.btn {
    
}

</style>