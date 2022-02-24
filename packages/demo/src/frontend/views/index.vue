<template>
    <VueForm
        v-model="formData"
        :ui-schema="uiSchema"
        :schema="schema"
        class="form"
        @on-submit="handleSubmit"
    ></VueForm>
</template>

<script>
    import VueForm from '@lljj/vue-json-schema-form';
    import bus from '@lljj/bus';

    export default {
        name: 'Index',
        components: { VueForm },
        data() {
            return {
                formData: {},
                schema: {
                    type: 'object',
                    required: [],
                    properties: {
                        file: {
                            title: '文件',
                            type: 'string',
                            'ui:widget': 'UploadWidget',
                        }
                    },
                    'ui:order': [
                        'file'
                    ]
                },
                uiSchema: {},
                formFooter: {
                    show: false
                },
                formProps: {
                    labelWidth: '100px',
                    labelSuffix: '：'
                }
            };
        },
        methods: {
            handleSubmit() {
                bus.$emit('on-upload');
                this.$message.success('提交成功');
            }
        }
    };
</script>

<style module>
    form{
        position: absolute;
        left: 30%;
        width: 40%;
    }
</style>
