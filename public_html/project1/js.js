Vue.filter('doneLabel',function(value){
    if(value == false){
        return 'Wating';
    } else{
        return 'Done';
    }
});

Vue.filter('totalOpenLabel', function(value){
    
    if(value > 0){
        return 'Existem ' + value + ' contas a serem pagas';
    } else{
        return 'Nenhuma conta a pagar';
    } 
})

Vue.filter('statusLabel', function(value){
    
    if(value > 0){
        return 'Existem ' + value + ' contas a serem pagas';
    } else if(value == 0){
        return 'Nenhuma conta a pagar';
    } else if(value < 0){
        return 'Não existem registros...';
    }
    
})

Vue.filter('totalBills', function(value){
    
    if(value > 0){
        return 'Existem registros de pagamentos';
    } else{
        return 'Não existem registros de pagamento';
    } 
    
})

var data = new Vue({
    el: 'body',
    data: {
        title: 'Contas a PAGAR',
        title_list:"Listagem de Dados",
        bills_title:"Contas a Pagar", 
        action_title:"Editar",
        menu:[
            {id:1,name:"Listar Contas"},
            {id:0,name:"Criar Contas"}
        ],
        formType:'insert',
        showList:1,
        showForm:false,
        showQuestRemove:false,
        names:[
            'Luz',
            'Água',
            'Gasolina',
            'Mercado',
            'Telefone',
            'Farmácia'
        ],
        bill:{ due_date:'',name:"",value:0, done:false },
        bill_remove:{ due_date:'',name:"",value:0, done:false },
        bills:[
            {id:1, due_date:'2016-08-10',name:"Gasolina",value:270, done:true },
            {id:2, due_date:'2016-07-5',name:"Mercado",value:100, done:false },
            {id:3, due_date:'2016-07-3',name:"Farmácia",value:50, done:true },
            {id:4, due_date:'2016-08-21',name:"Lanche",value:150, done:false },
            {id:5, due_date:'2016-09-08',name:"Gasolina",value:190, done:false },
            {id:6, due_date:'2016-08-28',name:"Gasolina",value:68, done:true },
            {id:7, due_date:'2014-04-09',name:"Gasolina",value:90, done:true }
        ]
    },
    computed:{
        status:function(){
            var count = false;

            for(var i in this.bills){
                if(!this.bills[i].done){
                    count++;
                }
            }
            
            if(count >= 0 && this.bills.length > 0){
                return count;
            } else{
                return -1;
            } 
        },
        totalOpen:function(){
            var count = 0;

            for(var i in this.bills){
                if(!this.bills[i].done){
                    count++;
                }
            }
            
            return count;
            
        }
    },
    methods:{
        showView:function($event,id){
            this.showQuestRemove = false;
            this.showList = id;
            if(id == 0){
                console.log('Form Show');
                this.action_title = 'Registrar';
                this.showForm = true;
                this.formType = 'insert';
                this.bill = {due_date: '', name: "", value: 0, done: false}
            } else if(id == 1){
                this.showForm = false;
            }
            
        },
        closeForm:function(){
            this.showForm = false;
        },
        submit: function(){
            if(this.formType == 'insert'){
            this.bills.push(this.bill);
            }            
            this.bill = { due_date:'',name:"",value:0, done:false }
            this.showForm = false;
        },
        loadBill: function(bill){
            this.action_title = 'Editar';
            this.bill = bill;
            this.showForm = true;
            this.showQuestRemove = false;
            this.formType = 'update';
        },
        questRemoveShow:function(bill){
           this.showQuestRemove = true;
           bill_remove = bill;
           this.showForm = false;
        },
        questRemoveClose:function(){
            this.showQuestRemove = false;
        },
        questRemoveConfirm:function(bill){
           
           for(i = 0; i < this.bills.length; i++){
               var bill = this.bills[i];
               if(bill.id == bill_remove.id){
                   this.bills.splice(i, 1);
                   this.showQuestRemove = false;
                   return false;
               }
               
           }
           
        },
        
        
    }
  });
  

