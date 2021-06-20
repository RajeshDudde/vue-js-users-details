Vue.createApp({
    data(){
        return{
            data:[],
            errorMessage:'',
            loading:true,
            editable:false,
            selected:'',
            objdata:'',
            name:'',email:'',phone:'',website:''
        };
    },
    async created() {
        // GET request using fetch with async/await
        const response = await fetch("https://jsonplaceholder.typicode.com/users",{"method":"GET"}) 
        .catch(error => {
            this.errorMessage = error;
            console.error("There was an error!", error);
          });
        const info = await response.json();
        this.data = info;
        if(response.ok)
        {
            this.loading=false;
        }
      
      },

    methods:{
     select(data,event)
     {
        // this.selected=!this.selected;
        if(!('selected' in data))
        {
            let s=true;
            data['selected']=s;
        }
        else{
            data.selected=! data.selected;
        }
        
     },
    edit(data)
    {
       this.editable=true,
       this.objdata=data
    },
    close()
    {
        this.name='';
      this.email='';this.phone='';this.website='';
      this.objdata='';
        this.editable=false;
    },
    cancel()
    {
        this.name='';
      this.email='';this.phone='';this.website='';
      this.objdata='';
        this.editable=false;
    },
    save(obj)
    {
       let key=obj.id;
       obj.name=this.name;
       obj.email=this.email;
       obj.phone=this.phone;
       obj.website=this.website;
       this.data['key']=obj;
      this.name='';
      this.email='';this.phone='';this.website='';
      this.objdata='';
      this.editable=false;
    },
    del(objct)
    {
        var removeIndex = this.data.map(function(item) { return item.id; }).indexOf(objct);
        this.data.splice(removeIndex, 1);
    }
    }
}).mount('#app');
