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
                        input: {
                            title: '输入框',
                            type: 'string',
                            'ui:options': {
                                placeholder: '请输入'
                            }
                        }
                    },
                    'ui:order': [
                        'input'
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
                bus.$emit('on-upload');
                this.$message.success('提交成功');
            }
        }
    };
</script>

<style scoped>

</style>
