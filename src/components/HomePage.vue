<template>
    <div>
        <header class="flex justify-between px-4 py-3 text-slate-100 text-xl font-semibold">
            <span>Welcome <span class="capitalize">{{ log_in_user_name }}</span></span>
            <button class="hidden md:inline-block text-[15px] font-semibold"
                @click="logout">
                Logout
            </button>
            <button class="md:hidden"
                @click="logout">
                <i class="fa-solid fa-power-off"></i>
            </button>
        </header>
        <section class="overflow-auto" style="max-height: calc(100vh - 52px);">
            <!-- calender -->
            <div class="px-4 pt-5">
                <p class="hdng font-semibold">Add Note</p>
                <form @submit.prevent="save_record">
                    <div class="flex flex-col md:flex-row">
                        <div class="md:w-[40%] flex md:self-start">
                            <input type="datetime-local" v-model="time" class="px-2 m-2 w-full border border-slate-300 rounded-sm" required/>
                        </div>
                        <div class="md:w-[60%] flex">
                            <textarea class="px-2 m-2 w-full border border-slate-300 rounded-sm" v-model="reminderdata" required></textarea>
                        </div>    
                    </div>
                    <div>
                        <button class="savebtn px-4 text-sm py-1.5 text-white font-semibold uppercase rounded m-2"
                            type="submit">
                            save
                        </button>
                    </div>
                </form>
            </div>

            <!-- records list -->
            <div v-if="records != ''"  class="pt-5 px-4">
                <p class="hdng font-semibold">Notes</p>
                <div class="flex flex-wrap mx-auto">
                    <div v-for="(each,index) in records" :key="index" class="w-full md:w-[50%] lg:w-[33.33%]">
                        <div class="flex m-2 shadow-md px-3 py-2 rounded border border-slate-300">
                            <div class="w-[97%]">
                                <p>
                                    <i class="fa-solid fa-clock pr-2 text-orange-500"></i> 
                                    <span class="font-medium">{{ each.time }}</span>
                                </p>
                                <p class="pt-0.5">
                                    <i class="fa-solid fa-file-lines pr-2 text-lime-500 text-lg pl-0.5"></i> 
                                    <span class="font-medium break-all">{{ each.reminderdata}}</span>
                                </p>
                            </div>
                            <div class="w-[3%]">
                                <button class="text-red-500"
                                    @click="deleteRecord(each._id)">
                                    <i class="fa-solid fa-trash-can"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="text-red-500 text-lg text-center pt-5">
                No records found
            </div>
        </section>
    </div>
</template>
<script>
import services from "../services/services"
export default {
    data(){
        return{
            log_in_user_name: '',
            records: [],
            time: '',
            reminderdata: '',
        }
    },
    methods:{
        logout(){
            localStorage.clear();
            this.$router.push('/');
        },
        async user_records(){
            try{
                let id = JSON.parse(localStorage.getItem('userInfo'))[0]?._id
                let res = await services.user_records(id)
                if(res.status == '200'){
                    this.records = res.data;
                }
                else if(res.status == "204"){
                    this.records = [];
                }
            }
            catch(err){
                console.log(err)
            }
        },
        async save_record(){
            try{
                let id = JSON.parse(localStorage.getItem('userInfo'))[0]?._id
                let payload = {
                    userid: id,
                    time: this.time,
                    reminderdata: this.reminderdata
                }
                let res = await services.saveRecord(payload)
                if(res.status == '200'){
                    alert('record saved successfully')
                    this.time = ''
                    this.reminderdata = ''
                    await this.user_records();
                }
                else{
                    alert('something went wrong')
                }
            }
            catch(err){
                console.log(err)
            }
        },
        async deleteRecord(id){
            try{
                let payload = {
                    recordid: id
                }
                let res = await services.deleteRecord(payload)
                if(res.status == '200'){
                    alert('record deleted successfully')
                    await this.user_records();
                }
                else{
                    alert('something went wrong')
                }
            }
            catch(err){
                console.log(err)
            }
        },
    },
    mounted(){
        this.log_in_user_name = JSON.parse(localStorage.getItem('userInfo'))[0]?.name || ''
        this.user_records()
    }
}
</script>
<style>
header{
    background: -webkit-linear-gradient(50deg, #08009f71, #00ff95 120%);
}
.hdng{
    background: -webkit-linear-gradient(45deg, #09009f, #00ff95 80%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
.savebtn{
    background: -webkit-linear-gradient(50deg, #08009f71, #00ff95 120%);
}
</style>