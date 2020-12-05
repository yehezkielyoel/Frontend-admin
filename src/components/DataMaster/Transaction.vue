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
      <b-button variant="danger" @click="exportPDF"
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
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
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
      localStorage.setItem(
        "token",
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNjExYWUzZDUwMDkxMWMyM2I4YzRjZDhjMzYwMDAzOTg3Nzk1M2QzYmM2OWRlMjZiYjQ1ZTUyZTFkMDFiYWJiMDMyMDM0MjBiYWFiOTgwMmMiLCJpYXQiOjE2MDcxNzQ3MjksIm5iZiI6MTYwNzE3NDcyOSwiZXhwIjoxNjM4NzEwNzI5LCJzdWIiOiI2Iiwic2NvcGVzIjpbXX0.nw_VPXpYiNPiw6YPcyu4f-GTs5B-p9DEtniyxvnFkYZFdJW4_VsOnjXdpNzuJXyxVu8AVpLrpY4WKVVQxBZJPmAyvKvmxw9X1F5YqCSfgmCn7ho7ZY391FrAuHu1_8KEwEsgc_Uzol_wHCqYxK67TGj3nZqXYkB6p-HVAI_9r8qeoLnzPl5ajrCLRmn57mhlRjMxIOvfT6aL_dR_3LlOqDG5aryRp1fh6eV7xT8ctsVfQrJG3f4L4-4knMxWcWO1eP6lH9d9xQO18bqVfG2AefyovIiW2lYem-VB-XYQNPzhVkuTsnDoF8Bnfz4WF7YdbazW6C8CcFl7aV502iTc4V90s2lkECimkf2TFVwk8j9Y8pWqmOCHKTMlBuFjIG-FbOEeNud2YxnGcAiq9RzG5uNOPegwtCmTWTolmpU8XcEwWIzvkbzpji9QAd76pvmZdJ13lHY7ODui8t5vcqgGZojhbAvo1U4hx1nXmV9We2gc9l1z_AQQvTPmdjIgGrdF5coD7wT-U_-_91fqL9FDqzJzjtIpwVIFu-vGP94bjSUCa5t0CL75-32ezeS8mjkltSEPvwpNe03GIBhN0hKJeILNMIMTDkT8JVilk1pMmaBIm2AYCfLfosi0LPKV9lVRcknNBMJp47Kv3xQAFfA-XQq6lHF8zQsNo9Fn-0jlfbQ"
      );
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
    exportPDF() {
      var vm = this;
      var columns = [
        "no",
        { title: "nama_product", dataKey: "Product Name" },
        { title: "sold_items", dataKey: "Sold Item(s)" },
        { title: "total", dataKey: "Total(Rp)" },
      ];
      var doc = new jsPDF();
      doc.text("Transaction", 40, 40);
      doc.autoTable(columns, vm.transaksi, {
        margin: { top: 60 },
      });
      doc.save("todos.pdf");
    },
  },
  computed: {},
  mounted() {
    this.readData();
  },
};
</script>