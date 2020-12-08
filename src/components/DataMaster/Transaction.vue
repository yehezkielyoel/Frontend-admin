<template>
  <body>
    <div>
      <h1
        id="accountTitle"
        class="d-flex justify-content-between align-items-center"
      >
        Transaction
        <div class="admin">
          <b-icon icon="person-circle"></b-icon>
          Admin
        </div>
      </h1>
      <br />
      <b-button variant="danger" @click="generatePDF"
        ><b-icon icon="printer"></b-icon> Print</b-button
      >
      <br /><br />

      <b-table
        class="tabelAcc"
        striped
        hover
        :items="transaksi"
        :fields="fields"
        :borderless="borderless"
      >
        <template #cell(no)="data">
          {{ data.index + 1 }}
        </template>
        <!-- <template #cell(action)="item">
        <b-button variant="link" id="iconEdit" @click="editItem(item)" v-b-modal.modal-center>
          <b-icon icon="pencil-fill"></b-icon>
        </b-button> -->

        <!-- <b-button variant="link" id="iconDelete" @click="deleteItem(item)" v-b-modal.modal-delete>
          <b-icon icon="X"></b-icon>
        </b-button>  
      </template> -->
      </b-table>
      <!-- modal edit -->
      <!-- <b-modal hide-footer hide-header id="modal-center" centered>
        <h1> Edit Account </h1>
              <b-form-input type="text"
                  v-model="form.name"
                  placeholder="Name"
                  required></b-form-input>
              <br>
              <b-form-input
                  v-model="form.email"
                  placeholder="Email"
                  required></b-form-input>
              <br>
              <b-form-input
                  v-model="form.password"
                  placeholder="Password"
                  required></b-form-input>
              <br>
              <b-form-input
                  v-model="form.telp"
                  placeholder="Telp"
                  required></b-form-input>
              <br>
              <b-form-input
                  v-model="form.address"
                  placeholder="address"
                  required>
              </b-form-input>
              <br>
            <b-button @click="edit(form)" class="mr-1">save</b-button>
            <b-button variant="light" style="color: #151D65;" @click="cancel" class="mr-1">cancel</b-button>
            
    </b-modal> -->
      <!-- modal hapus -->
      <!-- <b-modal hide-footer hide-header id="modal-delete" centered>
        <div id="modDel">
        <h1> Are you sure? </h1>
            <b-button variant="outline-danger" @click="confirmdelete" style="font-weight: bold;" >yes</b-button>
            <b-button variant="outline-light" @click="cancel" style="font-weight: bold; color: #151D65; ">no</b-button>
        </div>
    </b-modal> -->
    </div>
  </body>
</template>

<script>
import { jsPDF } from "jspdf";
export default {
  data() {
    return {
      adding: true,
      edititem: null,
      dialog: false,
      dialogdel: false,
      dialognote: false,
      busy: true,
      load: false,
      snackbar: false,
      error_message: "",
      color: "",
      heading:"Froster's Transaction History",
      fields: [
        "no",
        { key: "nama_product", label: "Product Name" },
        { key: "sold_items", label: "Sold Item(s)" },
        { key: "total", label: "Total(Rp)" },
      ],
      transaksi: [],
      // items: [
      //   {
      //     no: 1,
      //     product_name: "Chicken Ball Champ",
      //     sold: "3",
      //     total: "87.000",
      //   },
      //   {
      //     no: 2,
      //     product_name: "Fiesta Chicken Nugget",
      //     sold: "10",
      //     total: "650.000",
      //   },
      //   { no: 3, product_name: "Fiesta Katsu", sold: "10", total: "105.000" },
      // ],
      form: {
        product_name: null,
        sold: null,
        total: null,
      },
      deleteId: "",
      editId: "",
      borderless: true,
    };
  },
  methods: {
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
      this.dialognote = false;
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
    readData() {
      ///tinggal hapus local storage di set pas login
      var url = this.$api + "/transaksi";
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.transaksi = response.data.data;
          //console log bisa dihapus nnti kalo dah kelar
          console.log(this.transaksi);
        });
    },
    //blm jalann
     generatePDF() {
            
        // const { jsPDF } = require("jspdf");
        // const columns = [
        //   { key: 'nama_product', label: 'Product Name'},
        //   { key: 'sold_items', label: 'Sold Item(s)'},
        //   { key: 'total', label: 'Total(Rp)'}
        // ];
        
        const doc = new jsPDF({
            orientation: "portrait",
            unit: "in",
            format: "letter"
        });
        
        // text is placed using x, y coordinates
         doc.setFontSize(16).text(this.heading, 0.5, 1.0); 
        
        // create a line under heading 
        doc.setLineWidth(0.01).line(0.5, 1.1, 8.0, 1.1);
        

        // Using autoTable plugin  
        doc.autoTable({
              
             columnStyles: { transaksi: { halign: 'center' } }, // European countries centered
              body: this.transaksi,
              columns: [
                {tittle:"Transaction History"},
                { header: 'Product Name', dataKey: 'nama_product' },
                { header: 'Sold', dataKey:'sold_items'},
                { header: 'Total (Rp)', dataKey:'total'},
              ],
              margin: { left: 0.5, top: 1.25 }
        }); 
     
        
        // Creating footer and saving file
        doc.text(
            "Transaction History",
            0.5,
            doc.internal.pageSize.height - 0.5
            )
            .save(`Transaction.pdf`); 
        console.log('adqwd')},
  },
  computed: {},
  mounted() {
    this.readData();
  },
};
</script>