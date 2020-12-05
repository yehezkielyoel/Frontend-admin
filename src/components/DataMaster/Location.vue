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
    <b-modal v-model="dialog" hide-footer hide-header id="modal-center" centered>
        <b-card-title class="titleProduct">
          <span class="headline"
            v-if="adding==true"> Create Location </span>
          <span class="headline"
            v-else>Edit Location</span>
        </b-card-title>
          <b-container>
              <b-icon class="iconForm" icon="geo-alt-fill"></b-icon>
              <b-form-input type="text" style="background-color: #CED4DA;"
                  v-model="form.regency"
                  placeholder="   Regency"
                  required></b-form-input>

              <b-icon class="iconForm" icon="globe2"></b-icon>
              <b-form-input style="background-color: #CED4DA;"
                  v-model="form.subDistrict"
                  placeholder="   Sub-district"
                  required></b-form-input>

              <b class="iconForm">Rp</b>
              <b-form-input style="background-color: #CED4DA;"
                  v-model="form.shipping"
                  placeholder="   Shipping"
                  required></b-form-input>
              <br>
              
            <b-button v-if="adding == true"
               @click="save"
               style="background-color: #151D65; font-weight: bold;"  
               class="mr-1"
               >
               Save
            </b-button>
            <b-button v-else
               @click="edit(form)"
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
        busy: true,
        fields: [
          { key: 'no',label: 'No'},
          { key: 'regency', label: 'Regency'},
          { key: 'subDistrict', label: 'Sub-district'},
          { key: 'shipping', label: 'Shipping Price(Rp)'},
          { key:'action', label: 'Action'}
        ],
        items: [
          { no: 1, regency: 'Yogyakarta', subDistrict: 'Umbulharjo', shipping: '2.000', action: ''},
          { no: 2, regency: 'Yogyakarta', subDistrict: 'Jetis', shipping: '2.000', action: ''},
          { no: 3, regency: 'Sleman', subDistrict: 'Depok', shipping: '2.000', action: ''},
        ],
        form: {
          regency: null,
          subDistrict: null,
          shipping:null,
      },
        detail:{
            regency: null,
          subDistrict: null,
          shipping:null,
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
                regency: item.regency,
                subDistrict: item.subDistrict,
                shipping: item.shipping,
            };
            this.dialog = true;
            this.edititem = item;
        },
      edit(form){
            this.edititem.regency = form.regency;
            this.edititem.subDistrict = form.subDistrict;
            this.edititem.shipping = form.shipping;
            this.cancel();
        },
      resetForm() {
            this.form = {
                regency: null,
                subDistrict: null,
                shipping: null,
            };
        },  
    },
  };
</script>