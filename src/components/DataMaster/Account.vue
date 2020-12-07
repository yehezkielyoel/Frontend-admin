<template>
<body>
  <div >
    <h1 id="accountTitle" class="d-flex justify-content-between align-items-center"> 
      Account
      <div class="admin">
        <b-icon icon="person-circle" ></b-icon>
        Admin
      </div>
    </h1>
    <br><br><br>

    <b-table class="tabelAcc" striped hover 
      :items="items" 
      :fields="fields" 
      :borderless="borderless">

      <template #cell(action)="item">
        <b-button variant="link" class="iconEdit" @click="editItem(item)" v-b-modal.modal-center>
          <b-icon icon="pencil-fill"></b-icon>
        </b-button>

        <b-button variant="link" class="iconDelete" @click="deleteItem(item)" v-b-modal.modal-delete>
          <b-icon icon="X"></b-icon>
        </b-button>  
      </template>

    </b-table>
    <!-- modal edit -->
    <b-modal hide-footer hide-header id="modal-center" centered>
        <div class="editForm"> Edit Account </div>
              <b-icon icon="person-fill" class="iconForm"></b-icon>
              <b-form-input style="background-color: #CED4DA;"
                  type="text"
                  v-model="form.name"
                  placeholder="   Name"
                  required>
              </b-form-input>
            
              <b-icon icon="envelope-fill" class="iconForm"></b-icon>
              <b-form-input 
                  v-model="form.email"
                  placeholder="   Email"
                  disabled></b-form-input>
              <div style="color: #CDCFDE;">Admin can't change email</div>
              
              <b-icon icon="lock-fill" class="iconForm"></b-icon>
              <b-form-input 
                  type="password"
                  v-model="form.password"
                  placeholder="   Password"
                  disabled></b-form-input>
              <div style="color: #CDCFDE;">Admin can't change password</div>    
              
              <b-icon icon="telephone-fill" class="iconForm"></b-icon>
              <b-form-input style="background-color: #CED4DA;"
                  v-model="form.telp"
                  placeholder="   Telp"
                  required></b-form-input>
              
                <b-icon icon="credit-card2-front-fill" class="iconForm"></b-icon>
                <b-form-textarea style="background-color: #CED4DA;"
                  v-model="form.address"
                  placeholder="   address"
                  required
                  no-resize>
              </b-form-textarea>
              <br>
            <b-button @click="edit(form)" style="background-color: #151D65; font-weight: bold;" class="mr-1">save</b-button>
            <b-button variant="light" style="color: #151D65; font-weight: bold;" @click="cancel" class="mr-1">cancel</b-button>
            
    </b-modal>
    <!-- modal hapus -->
    <b-modal v-model="dialogdel" hide-footer hide-header id="modal-delete" centered>
        <div class="modDel">
        <h1> Are you sure? </h1>
            <b-button variant="outline-danger" @click="confirmdelete" style="font-weight: bold;" >yes</b-button>
            <b-button variant="outline-light" @click="cancel" style="font-weight: bold; color: #151D65; ">no</b-button>
        </div>
    </b-modal>
  </div>
</body>
</template>

<script>
  export default {
    data() {
      return {
        edititem: null,
        dialog: false,
        dialogdel: false,
        busy: true,
        fields: [
          { key: 'no',label: 'No'},
          { key: 'name', label: 'Name'},
          { key: 'email', label: 'Email'},
          { key: 'username', label: 'Username'},
          { key:'action', label: 'Action'}
        ],
        items: [
          { no: 1, name: 'Satria', email: 'satriaw@gmail.com', username: 'Sa123', action: ''},
          { no: 2, name: 'Yoel', email: 'yehezkielyd@gmail.com', username: 'EL123', action: ''}
        ],
        form: {
          name: null,
          email: null,
          password:null,
          telp: null,
          address: null,
      },
      detail: {
          name: null,
          email: null,
          password:null,
          telp: null,
          address: null,
      },
      deleteId: "",
      editId: "",
      borderless: true,
      };
    },
    methods:{
        
      save() {
            this.items.push(this.form);
            this.cancel();
        },
      cancel() {
            this.resetForm();
            this.dialog = false;
            this.edititem = null;
            this.adding = true;
            this.dialogdel = false;
            this.$bvModal.hide('modal-center')
        },
      deleteItem(item) {
            this.dialogdel = true;
            this.edititem = item;
        },
      confirmdelete() {
            this.items.splice(this.items.indexOf(this.edititem), 1);
            this.dialogdel = false;
        },
      editItem(item) {
            this.adding = false;
            this.form = {
                name: item.name,
                email: item.email,
                password: item.password,
                telp: item.telp,
                address: item.address,
            };
            this.dialog = true;
            this.edititem = item;
        },
      edit(form){
            this.edititem.name = form.name;
            this.edititem.email = form.email;
            this.edititem.password = form.password;
            this.edititem.telp = form.telp;
            this.edititem.address = form.address;
            this.cancel();
        },
      resetForm() {
            this.form = {
                name: null,
                email: null,
                password: null,
                telp: null,
                address: null,
            };
        },
          

    },
  };
</script>