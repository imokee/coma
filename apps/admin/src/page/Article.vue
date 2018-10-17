
<style>
    .cover-uploader{
        max-width:300px;
    }
</style>

<template>
    <div class="article-c">        
        <Row>
            <Col span="6"><Button type="primary" @click="show_add">添加文章</Button></Col>
            <Col span="6">&nbsp;</Col>
            <Col span="6">&nbsp;</Col>
            <Col span="6"><Input search enter-button="搜索" placeholder="文章标题或关键字" /></Col>
        </Row>
        <br>
        <Table border :columns="columns" :data="list"></Table>
        <Modal
            v-model="showform"
            :title="formtitle"
            width="800"
            :mask-closable="false"
            :loading="true"
            ref="editmodel"
            @on-ok="article_save">
            <Form :model="articleInfo" :label-width="80">
                <input type="hidden" name="id" v-model="articleInfo.id"/>
                <FormItem label="文章标题">
                    <Input v-model="articleInfo.title" placeholder="请输入文章标题"></Input>
                </FormItem>
                <FormItem label="文章分类">
                    <Select v-model="articleInfo.type">
                        <Option value="资讯">资讯</Option>
                        <Option value="平台">平台</Option>
                        <Option value="案例">案例</Option>
                        <Option value="其他">其他</Option>
                    </Select>
                </FormItem>
                <FormItem label="文章封面">                    
                    <Upload
                        name="file"
                        ref="upload"
                        :data="{upload_dir:'covers'}"
                        accept="image/*"
                        :on-success="on_upload"
                        :show-upload-list="true"
                        action="/uploader/server">
                        <Button icon="ios-cloud-upload-outline">上传封面</Button>
                    </Upload>
                    <img v-show="articleInfo.cover !== null" class="cover-uploader" :src="articleInfo.cover"/>
                </FormItem>
                <FormItem label="文章内容">
                    <vue-editor 
                    :editorToolbar="editorToolbar"
                    v-model="articleInfo.content"></vue-editor>
                </FormItem>             
            </Form>
        </Modal>

        <Modal
            v-model="rmconfirm"
            title="删除确认"
            @on-ok="remove_confirm">
            <p>你确定要删除这篇文章？</p>
        </Modal>
    </div>    
</template>
<script>
    import { VueEditor } from "vue2-editor";    
    export default {
        mounted: async function () {
            this.load_articles();
        },
        methods : {
            async load_articles (){
                const articledai = this.$dai.create("article");
                const rs = await articledai.query({_orderd:"ctime"});
                if(rs.data.code > 0){
                    //console.log(this.list);
                    this.list = rs.data.list;
                }
            },
            show_add (){
                this.showform=true;
                this.articleInfo = {};
            },
            on_upload (response, file, fileList){
                if(response.code > 0){
                    this.articleInfo.cover = response.files[0].url;
                }
                this.$refs.upload.clearFiles();   
                this.showform = false;
                this.showform = true; 
            },

            async article_save(evt){
                const articledai = this.$dai.create("article");
                if(!this.articleInfo.title){
                    this.$Message.error("标题不能为空！");
                    this.$refs.editmodel.buttonLoading = false;
                    return ;
                }

                try{
                    const rs = await articledai.save(this.articleInfo);
                    if(rs.data.code > 0){
                        this.$Message.success('保存成功！');
                        this.showform = false;
                        this.load_articles();
                    }else{
                       this.$Message.error(rs.data.message); 
                       this.$refs.editmodel.buttonLoading = false;
                    }
                    
                }catch(e){
                    console.log(e);
                    this.$Message.error("保存失败！"); 
                    this.$refs.editmodel.buttonLoading = false;
                }
                
            },
            async edit (index) {
                const articledai = this.$dai.create("article");
                const aid = this.list[index].id;
                const rs = await articledai.get({id:aid});
                if(rs.data.code > 0){
                    this.articleInfo = rs.data.data;
                    this.showform = true;
                }
            },
            remove(index) {
                this.removing = index;
                this.rmconfirm = true;                
            },
            async remove_confirm() {
                const articledai = this.$dai.create("article");
                const aid = this.list[this.removing].id;
                const rs = await articledai.remove({id:aid});
                if(rs.data.code > 0){
                    this.$Message.success('删除成功！');
                    this.load_articles();
                }else{
                    this.$Message.error(rs.message); 
                }
            }
        },
        data () {
            return {
                articleInfo : {},
                formtitle : "添加文章",
                showform : false,
                rmconfirm : false,
                removing : -1,
                editorToolbar:[
                    [{ header: [false, 1, 2, 3, 4, 5, 6] }],
                    ["bold", "italic", "underline", "strike"],
                    [
                        { align: "" },
                        { align: "center" }
                    ],
                    ["blockquote", "code-block"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    [{ color: [] }],
                    ["link", "image", "video"]
                ],
                columns: [
                    {
                        title: '标题',
                        key: 'title'
                    },
                    {
                        title: '分类',
                        key: 'type'
                    },
                    {
                        title: '创建时间',
                        key: 'ctime',
                        render: (h, params) => {
                            return h("span",new Date(params.row.ctime).pattern('yyyy-MM-dd HH:mm:ss'));
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.edit(params.index)
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                list: []
            }
        },
        components: {
            VueEditor
        }
    }
</script>