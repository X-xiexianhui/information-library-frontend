/**
 * Created by Liu.Jun on 2020/11/26 10:01 下午.
 */


import axios from 'axios';
import bus from '../../../bus';

export default {
    name: 'UploadWidget',
    props: {
        value: {
            default: null,
            type: [String, Array]
        },
        responseFileUrl: {
            default: res => (res ? (res.url || (res.data && res.data.url)) : ''),
            type: [Function]
        },
        btnText: {
            type: String,
            default: '点击上传'
        },
        // 传入 VNode
        slots: {
            type: null,
            default: null
        }
    },
    data() {
        // 设置默认 fileList
        const value = this.value;
        const isArrayValue = Array.isArray(value);

        let fileList = this.$attrs.fileList || [];

        if (isArrayValue) {
            fileList = value.map((item, index) => ({
                name: `已上传文件（${index + 1}）`,
                url: item
            }));
        } else if (value) {
            fileList.push({
                name: '已上传文件',
                url: value
            });
        }

        return {
            isArrayValue,
            fileList
        };
    },
    created() {
        bus.$on('on-upload', () => {
            try {
                this.$refs.upload.submit();
            } catch (e) {
                // eslint-disable-next-line no-alert
                alert('请选择文件');
            }
        });
    },
    methods: {
        emitValue(fileList) {
            // v-model
            let value;

            const geUrl = fileItem => (fileItem && (fileItem.url || this.responseFileUrl(fileItem.response))) || '';

            if (this.isArrayValue) {
                value = fileList.length ? fileList.reduce((pre, item) => {
                    const url = geUrl(item);
                    if (url) pre.push(url);
                    return pre;
                }, []) : [];
            } else {
                const fileItem = fileList[fileList.length - 1];
                value = geUrl(fileItem);
            }
            this.$emit('input', value);
        }
    },
    render() {
        const h = this.$createElement;
        const attrs = this.$attrs;

        const {
            slots,
        } = this.$props;

        const data = {
            attrs: {
                fileList: this.fileList,
                'auto-upload': false,
                action: '#',
                'http-request': (fileList) => {
                    if (fileList.length === 0) {
                        this.$message.warning('请选择文件');
                        return;
                    }
                    const formData = new FormData();
                    formData.append('file', fileList.file);
                    formData.append('name', fileList.file.name);
                    axios.post('/api/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
                        .then((res) => {
                            console.log(res);
                        }).catch((e) => {
                        // eslint-disable-next-line no-alert
                            alert(e);
                        });
                },
                'on-exceed': () => {
                    if (this.$message) {
                        this.$message.warning('超出文件上传数');
                    }
                },
                ...attrs,
                'on-remove': (file, fileList) => {
                    this.emitValue(fileList);

                    if (attrs['on-remove']) {
                        attrs['on-remove'](file, fileList);
                    }
                },
                'on-success': (response, file, fileList) => {
                    this.emitValue(fileList);
                    // eslint-disable-next-line no-unused-expressions
                    this.$refs.upload.clearFiles();

                    // 用户注册的 onSuccess
                    if (attrs['on-success']) {
                        attrs['on-success'](response, file, fileList);
                    }
                }
            },
            ref: 'upload',
        };

        if (!this.isArrayValue) data.attrs.limit = 1;

        const childVNode = [];

        if (slots && slots.default) {
            childVNode.push(h('template', {
                slot: 'default',
            }, [slots.default]));
        } else {
            childVNode.push(h('el-button', {
                props: {
                    type: 'primary'
                },
            }, [this.btnText]));
        }

        if (slots && slots.tip) {
            childVNode.push(h('template', {
                slot: 'tip',
            }, [slots.tip]));
        }

        return h('el-upload', data, childVNode);
    }
};
