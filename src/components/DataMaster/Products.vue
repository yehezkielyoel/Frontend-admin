<template>
<body>
  <div >
    <h1 id="accountTitle" class="d-flex justify-content-between align-items-center"> 
      Product
      <div class="admin">
        <b-icon icon="person-circle" ></b-icon>
        Admin
      </div>
    </h1>
    <br>
    <b-button v-b-modal.modal-center variant="danger"><b-icon icon="plus"></b-icon> Add Product</b-button>
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
      <!-- <b-card> -->
        <b-card-title class="titleProduct">
          <span class="headline"
              v-if="adding== true"> Create Product </span>
          <span class="headline"
              v-else>Edit Product </span>
        </b-card-title>

        <!-- <b-card-text> -->
          <b-container>
              <b-icon icon="tag-fill" class="iconForm"></b-icon>
              <b-form-input type="text" style="background-color: #CED4DA;"
                  v-model="form.product_name"
                  placeholder="   Product name"
                  required
                  autofocus></b-form-input>

              <b-icon icon="archive-fill" class="iconForm"></b-icon>
              <b-form-input style="background-color: #CED4DA;"
                  v-model="form.stock"
                  placeholder="   Stock"
                  required></b-form-input>
              
              <b class="iconForm">Rp</b>
              <b-form-input style="background-color: #CED4DA;"
                  v-model="form.price"
                  placeholder="   Price"
                  required
                  number
                    ></b-form-input>
              <br>
              <b-form-file 
                v-model="file1"
                class="mt-3"
                placeholder="Choose a file or drop it here..."
                plain></b-form-file>
          </b-container>
        <!-- </b-card-text> -->
          <br><br>
            <b-button v-if="adding == true" 
              @click="save"
              text
              style="background-color: #151D65; font-weight: bold;" 
              class="mr-1">
              Save
            </b-button>
            <b-button v-else
              @click="edit(form)" 
              style="background-color: #151D65; font-weight: bold;"
              text
              class="mr-1">
              Save
            </b-button>
            <b-button variant="light" style="color: #151D65; font-weight: bold;" @click="cancel" class="mr-1">cancel</b-button>
      <!-- </b-card> -->
    </b-modal>

    <!-- modal hapus -->
    <b-modal v-model="dialogdel" hide-footer hide-header id="modal-delete" centered>
        <div class="modDel">
        <h1> Are you sure? </h1>
            <b-button variant="outline-danger" @click="confirmdelete" style="font-weight: bold;" >Yes</b-button>
            <b-button variant="outline-light" @click="cancel" style="font-weight: bold; color: #151D65; ">No</b-button>
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
        file1: null,
        fields: [
        //   { key: 'no',label: 'No'},
        //   { key: 'product_name', label: 'Product Name'},
        //   { key: 'stock', label: 'Stock(s)'},
        //   { key: 'price', label: 'Price(Rp)'},
        //   { key:'action', label: 'Action'}
            {   
                text: "No",
                align: "start",
                sortable: true,
                value: "no",
            },
            {   
                text: "Product Name",
                sortable: true,
                value: "product_name",
            },
            {   
                text: "Stock(s)",
                sortable: true,
                value: "stock",
            },
            {   
                text: "Price(Rp)",
                sortable: false,
                value: "price",
            },
            {   
                text: "Actions",
                sortable: false,
                value: "action",
            },
        ],
        items: [
          { no: 1, product_name: 'Chicken Ball Champ', stock: '5', price: '150.000', action: "",},
          { no: 2, product_name: 'Fiesta Chicken Nugget', stock: '10', price: '290.000', action: "",},
          { no: 3, product_name: 'Fiesta Katsu', stock: '3', price: '35.000', action: "",},
        ],
        form: {
          product_name: null,
          stock: null,
          price:null,
          file1:null,
      },
      detail: {
          product_name:null,
          stock: null,
          price: null,
          file1: null,
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
                product_name: item.product_name,
                stock: item.stock,
                price: item.price,
                file1: item.file1,
            };
            this.dialog = true;
            this.edititem = item;
        },
      edit(form){
            this.edititem.product_name = form.product_name;
            this.edititem.stock = form.stock;
            this.edititem.price = form.price;
            this.edititem.file1 = form.file1;
            this.cancel();
        },
      resetForm() {
            this.form = {
                product_name: null,
                stock: null,
                price: null,
                file1: null,
            };
        },  

    },
  };
</script>