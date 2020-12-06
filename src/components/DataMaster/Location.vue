<template>
<body>
  <div >
    <h1 id="accountTitle" class="d-flex justify-content-between align-items-center"> 
      Location
      <div class="admin">
        <b-icon icon="person-circle" ></b-icon>
        Admin
      </div>
    </h1>
    <br>
    <b-button v-b-modal.modal-center variant="danger"><b-icon icon="plus"></b-icon>Add Location</b-button>
    <br><br>

    <b-table class="tabelAcc" striped hover 
      :items="items" 
      :fields="fields" 
      :borderless="borderless">

      <template #cell(action)="items">
        <b-button variant="link" class="iconEdit" @click="editItem(items.item)" v-b-modal.modal-center>
          <b-icon icon="pencil-fill"></b-icon>
        </b-button>

        <b-button variant="link" class="iconDelete" @click="deleteItem(items.item)" v-b-modal.modal-delete>
          <b-icon icon="X"></b-icon>
        </b-button>  
      </template>

    </b-table>
    <!-- modal edit -->
    <b-modal v-model="dialog" hide-footer hide-header id="modal-center" centered>
        <b-card-title class="titleProduct">
          <span class="headline"
            v-if="adding==true"> Create Location </span>
          <span class="headline"
            v-else>Edit Location</span>
        </b-card-title>
          <b-container>

            <b-input-group class="mb-2">
              <b-input-group-prepend is-text>
                 <b-icon icon="geo-alt-fill" style="color:#151D65;"></b-icon>
              </b-input-group-prepend>
              <b-form-input type="text" style="background-color: #CED4DA;"
                  v-model="form.region"
                  placeholder="region"
                  required></b-form-input>
              </b-input-group>

              
            <b-input-group class="mb-2">
              <b-input-group-prepend is-text>
                 <b-icon icon="globe2" style="color:#151D65;"></b-icon>
              </b-input-group-prepend>
               <b-form-input style="background-color: #CED4DA;"
                  v-model="form.subDistrict"
                  placeholder="Sub-district"
                  required></b-form-input>
              </b-input-group>

              <b-input-group class="mb-2">
              <b-input-group-prepend is-text>
                <b style="color:#151D65;">Rp</b>
              </b-input-group-prepend>
                <b-form-input style="background-color: #CED4DA;"
                  v-model="form.shipping"
                  placeholder="Shipping"
                  required></b-form-input>
              </b-input-group>
              
            <b-button v-if="adding == true"
               @click="save"
               style="background-color: #151D65; font-weight: bold;"  
               class="mr-1"
               >
               Save
            </b-button>
            <b-button v-else
               @click="edit"
               style="background-color: #151D65; font-weight: bold;"  
               class="mr-1"
               >
               Save
            </b-button>
            <b-button variant="light" style="color: #151D65;" @click="cancel" class="mr-1">cancel</b-button>
          </b-container>
    </b-modal>
    <!-- modal hapus -->
    <b-modal hide-footer hide-header id="modal-delete" centered>
        <div class="modDel">
        <h1> Are you sure? </h1>
            <b-button variant="outline-danger" @click="confirmdelete" style="font-weight: bold;" >yes</b-button>
            <b-button variant="outline-light" @click="cancel" style="font-weight: bold; color: #151D65; ">no</b-button>
        </div>
    </b-modal>

    <b-alert
      v-model="snackbar"
      class="position-fixed fixed-bottom m-0 rounded-0"
      style="z-index: 2000;"
      variant="Success"
      dismissible
    >{{error_message}}</b-alert>
  </div>
</body>
</template>

<script>
  export default {
    data() {
      return {
        adding: true,
        edititem: null,
        dialog: false,
        dialogdel: false,
        error_message:null,
        variant:null,
        busy: true,
        fields: [
          { key: 'id',label: 'ID'},
          { key: 'region', label: 'Region'},
          { key: 'sub_district', label: 'Sub-district'},
          { key: 'harga_ongkir', label: 'Shipping Price(Rp)'},
          { key:'action', label: 'Action'}
        ],
        item: new FormData,
        items: [],
        form: {
          region: null,
          subDistrict: null,
          shipping:null,
          id:null,
      },
        detail:{
            region: null,
          subDistrict: null,
          shipping:null,
        },
      deleteId: "",
      editId: "",
      borderless: true,
      };
    },
    beforeMount(){
      this.readData()
    },
    methods:{
       readData() {
      var url = this.$api + '/ongkir'
      this.$http.get(url, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        this.items = response.data.data

      })
      },
      save() {
            this.item = new FormData;
            this.item.append('region',this.form.region);
            this.item.append('sub_district',this.form.subDistrict);
            this.item.append('harga_ongkir',this.form.shipping);
        
                  
              var url = this.$api + '/ongkir/'
              this.load = true
              this.$http.post(url, this.item, {
                headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
              }).then(response => {
                this.error_message = response.data.message;
                this.variant="Success"
                this.snackbar = true;
                this.load = false;
                this.readData(); //mengambil data
                this.resetForm();
              }).catch(error => {
                this.error_message = error.response.data.message;
                this.variant="Danger"
                this.snackbar = true;
              })
              
            this.cancel();
        },
      cancel() {
            this.resetForm();
            this.dialog = false;
            this.edititem = null;
            this.adding = true;
            this.dialogdel = false;
        },
      deleteItem(item) {
            this.dialogdel = true;
            this.deleteId=item.id;
        },
      confirmdelete() {

            var url = this.$api + '/ongkir/' + this.deleteId;
            //data dihapus berdasarkan id
            this.$http.delete(url, {
              headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
           }).then(response => {
            this.error_message = response.data.message;
            this.color = "green"
            this.snackbar = true;
            this.close();
            this.readData(); //mengambil data
    
          }).catch(error => {
            this.error_message = error.response.data.message;
            this.color = "red"
            this.snackbar = true;
            this.load = false;
          })
           
        },
      editItem(item) {
            this.adding = false;
            this.form.region= item.region;
            this.form.subDistrict= item.sub_district;
            this.form.shipping= item.harga_ongkir;
            this.dialog = true;
            this.form.id=item.id;
        },
      edit(){
             let newData = {
              region : this.form.region,
              sub_district : this.form.subDistrict,
              harga_ongkir : this.form.shipping,
            }
                  
              var url = this.$api + '/ongkir/' + this.form.id
              this.load = true
              this.$http.put(url, newData, {
                headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
              }).then(response => {
                this.error_message = response.data.message;
                this.color = "green"
                this.snackbar = true;
                this.load = false;
               // this.close();
                this.readData(); //mengambil data
                
               // this.resetForm();
              }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red"
                this.snackbar = true;
              //  this.load = false;
              })

            this.cancel();
        },
      resetForm() {
            this.form.region= null;
            this.form.subDistrict= null;
            this.form.shipping= null;
        },  
    },
  };
</script>