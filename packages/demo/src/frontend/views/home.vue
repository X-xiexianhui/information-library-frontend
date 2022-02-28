<template>
    <div>
        <Menu/>
        <h1>首页</h1>
    </div>
</template>

<script>
    import Menu from './components/Menu';
    import { getQueryString } from '../common/utils';

    export default {
        name: 'Home',
        components: { Menu },
        data() {
            return {
                formName: ''
            };
        },
        created() {
            this.formName = getQueryString('form');
            console.log(this.formName);
        },
        methods: {
        }
    };
</script>

<style scoped>

</style>
