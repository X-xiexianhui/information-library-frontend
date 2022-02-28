<template>
    <div>
        <Menu/>
        <el-card class="box-card">
            <div>
                <VueForm
                    v-model="formData"
                    :ui-schema="uiSchema"
                    :schema="schema"
                    @on-submit="handleSubmit"
                ></VueForm>
            </div>
        </el-card>
    </div>
</template>

<script>
    import VueForm from '@lljj/vue-json-schema-form';
    import bus from '@lljj/bus';
    import Menu from './components/Menu';

    export default {
        name: 'Index',
        components: { VueForm, Menu },
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
                    labelPosition: 'Left',
                    labelWidth: '100px',
                    labelSuffix: '：',
                }
            };
        },
        methods: {
            handleSubmit() {
                bus.$emit('on-upload');
            }
        }
    };
</script>

<style>
.box-card{
        position: absolute;
        left: 30%;
        width: 500px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }
</style>
