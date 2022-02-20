<template>
    <VueForm
        v-model="formData"
        :ui-schema="uiSchema"
        :schema="schema"
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
                        string_1645333413210x0: {
                            title: '单文件',
                            type: 'string',
                            'ui:widget': 'UploadWidget',
                        }
                    },
                    'ui:order': [
                        'string_1645333413210x0'
                    ]
                },
                uiSchema: {
                    bio: {
                        'ui:options': {
                            placeholder: '请输入你的签名',
                            type: 'textarea',
                            rows: 1
                        }
                    }
                }
            };
        },
        methods: {
            handleSubmit() {
                console.log('提交');
                bus.$emit('on-upload');
            }
        }
    };
</script>

<style scoped>

</style>
