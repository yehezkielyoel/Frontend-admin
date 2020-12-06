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
      <!-- <b-card> -->
        <b-card-title class="titleProduct">
          <span class="headline"
              v-if="adding== true"> Create Product </span>
          <span class="headline"
              v-else>Edit Product </span>
        </b-card-title>

        <!-- <b-card-text> -->
          <b-container>
             
              <b-input-group class="mb-2">
              <b-input-group-prepend is-text>
                <b-icon icon="tag-fill" style="color:#151D65;"></b-icon>
              </b-input-group-prepend>
               <b-form-input type="text" style="background-color: #CED4DA;"
                  v-model="form.product_name"
                  placeholder="Product name"
                  required
                  autofocus></b-form-input>
              </b-input-group>

              <b-input-group class="mb-2">
              <b-input-group-prepend is-text>
                <b-icon icon="tag-fill" style="color:#151D65;"></b-icon>
              </b-input-group-prepend>
               <b-form-input type="text" style="background-color: #CED4DA;"
                  v-model="form.deskripsi_product"
                  placeholder="Deskripsi produk"
                  required
                ></b-form-input>
              </b-input-group>

              <b-input-group class="mb-2">
              <b-input-group-prepend is-text>
                <b-icon icon="archive-fill" style="color:#151D65;"></b-icon>
              </b-input-group-prepend>
               <b-form-input style="background-color: #CED4DA;"
                  v-model="form.stock"
                  placeholder="Stock"
                  required></b-form-input>
              </b-input-group>
            
            <b-input-group class="mb-2">
              <b-input-group-prepend is-text>
                <b  style="color:#151D65;">Rp</b>
              </b-input-group-prepend>
               <b-form-input style="background-color: #CED4DA;"
                  v-model="form.price"
                  placeholder="Price"
                  required
                  number
                    ></b-form-input>
              </b-input-group>

              <b-form-file 
                v-model="form.file1"
                class="mt-3"
                placeholder="Choose a file or drop it here..."
                ></b-form-file>
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
              @click="edit" 
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

    <b-alert
      v-model="snackbar"
      class="position-fixed fixed-bottom m-0 rounded-0"
      style="z-index: 2000;"
      variant="success"
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
        dialog: false,
        dialogdel: false,
        snackbar:false,
        error_message: '',
        color:'',
        busy: true,
        file1: null,
        fields:[
        {key: 'nama_product'},
        {key: 'stok_product'},
        {key: 'harga_product'},
        {key: 'action'},
        {key: 'created_at', thClass: 'd-none', tdClass: 'd-none'},
        ],
        item: new FormData,
        items: [
  
        ],
        form: {
          product_name: null,
          deskripsi_product:null,
          stock: null,
          price:null,
          file1:null,
          id:null,
      },
      detail: {
          product_name:null,
          deskripsi_product:null,
          stock: null,
          price: null,
          file1: null,
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
      var url = this.$api + '/product'
      this.$http.get(url, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        this.items = response.data.data
        console.log(this.items);
      })
    },
      save() {
            this.item = new FormData;
            this.item.append('nama_product',this.form.product_name);
            this.item.append('deskripsi_product',this.form.deskripsi_product);
            this.item.append('stok_product',this.form.stock);
            this.item.append('harga_product',this.form.price);
            this.item.append('gambar_product',this.form.file1);
                  
              var url = this.$api + '/product/'
              this.load = true
              this.$http.post(url, this.item, {
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
            this.deleteId=item.id;
        },
      confirmdelete() {
            var url = this.$api + '/product/' + this.deleteId;
            //data dihapus berdasarkan id
            this.$http.delete(url, {
              headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
           }).then(response => {
            this.error_message = response.data.message;
            this.color = "green"
            this.snackbar = true;
            this.load = false;
            this.close();
            this.readData(); //mengambil data
          }).catch(error => {
            this.error_message = error.response.data.message;
            this.color = "red"
            this.snackbar = true;
            this.load = false;
          })
            this.dialogdel = false;
        },
        //untuk form edit modal
      editItem(item) {
            this.adding = false;
            this.form.product_name= item.nama_product;
            this.form.stock= item.stok_product;
            this.form.price= item.harga_product;
            this.form.deskripsi_product=item.deskripsi_product;
            this.form.id=item.id;
            this.dialog = true;
            this.edititem = item;
        },
        //save edit
      edit(){
            let newData = {
              nama_product : this.form.product_name,
              deskripsi_product : this.form.deskripsi_product,
              stok_product : this.form.stock,
              harga_product : this.form.price,
            }
                  
              var url = this.$api + '/product/' + this.form.id
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

              let item=new FormData();
              item.append('gambar_product', this.form.file1);
              console.log(item);
              url = this.$api + '/product/gambar_product/'+this.form.id;
              this.load = true
              this.$http.post(url, item, {
                headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
              }).then(response => {
                this.error_message = response.data.message;
                this.color = "green"
                this.snackbar = true;
    
                this.close();
                this.readData(); //mengambil data
                this.resetForm();
              }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red"
                this.snackbar = true;
                this.load = false;
              })
              
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
    mounted() {
      this.readData();
    },
    
  };
</script>

<style scoped>
.iconStyle{
  margin: 5px;
}
</style>