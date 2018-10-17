
import axios from 'axios';

function Dai(model_name){
    this.model_name = model_name;
}

Dai.prototype = {
    add : async function(data){
        return await axios.post("/dai/add/"+ this.model_name,data)
    },

    save : async function(data){
        if(data.id){
            const query = {
                id : data.id
            }
            delete data.id;

            return await this.update(query,data);
        }else{
            return await this.add(data);
        }
    },

    query :async function(data){
        return await axios.get("/dai/query/"+ this.model_name,{
            params:data
        })
    },

    get :async function(query){
        return await axios.get("/dai/get/"+ this.model_name,{
            params:query
        })
    },

    update :async function(query,data){
        delete data["_id"];
        delete data["__v"];
        delete data["_search"];
        delete data["ctime"];
        delete data["utime"];

        return await axios({
            method:"post",
            url:"/dai/update/"+ this.model_name,
            params:query,
            data:data
        });
    },

    remove :async function(data){
        return await axios.post("/dai/remove/"+ this.model_name,data);
    },

    count :async function(data){
        return await axios.get("/dai/count/"+ this.model_name,{
            params:data
        })
    },

    action :async function(action,data){
        if(!data){
            data = {};
        }

        return await axios.post("/dai/action/"+ action +"/"+this.model_name, data)
    }
}

const dai_cache = {};

const dai_api = {
    create(model_name){
        if(!dai_cache[model_name]){
            dai_cache[model_name] = new Dai(model_name);
        }
        return dai_cache[model_name];
    }
}
export default {
    install(Vue,opts){
        Vue.prototype.$dai = dai_api;
    }
}