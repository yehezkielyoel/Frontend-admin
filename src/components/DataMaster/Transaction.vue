<template>
<body>
  <div >
    <h1 id="accountTitle" class="d-flex justify-content-between align-items-center"> 
      Transaction
      <div class="admin">
        <b-icon icon="person-circle" ></b-icon>
        Admin
      </div>
    </h1>
    <br>
    <b-button variant="danger" @click="generatePDF" ><b-icon icon="printer"></b-icon> Print</b-button>
    <br><br>

    <b-table class="tabelAcc" striped hover 
      :items="items" 
      :fields="fields" 
      :borderless="borderless">

    </b-table>
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
        heading:"Froster's Transaction History",
        fields: [
          { key: 'no',label: 'No'},
          { key: 'product_name', label: 'Product Name'},
          { key: 'sold', label: 'Sold Item(s)'},
          { key: 'total', label: 'Total(Rp)'},
        ],
        items: [
          { no: 1, product_name: 'Chicken Ball Champ', sold: '3', total: '87.000'},
          { no: 2, product_name: 'Fiesta Chicken Nugget', sold: '10', total: '650.000'},
          { no: 3, product_name: 'Fiesta Katsu', sold: '10', total: '105.000'},
        ],
        
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
    methods:{
        generatePDF() {
            
        // const { jsPDF } = require("jspdf");
        const columns = [
          { key: 'no',label: 'No'},
          { key: 'product_name', label: 'Product Name'},
          { key: 'sold', label: 'Sold Item(s)'},
          { key: 'total', label: 'Total(Rp)'}
        ];
        
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
              
             columnStyles: { items: { halign: 'center' } }, // European countries centered
              body: this.items,
              columns: [
                {tittle:"Transaction History"},
                { header: 'No', dataKey: 'no' },
                { header: 'Product Name', dataKey: 'product_name' },
                { header: 'Sold', dataKey:'sold'},
                { header: 'Total (Rp)', dataKey:'total'},
              ],
              margin: { left: 0.5, top: 1.25 }
        }); 
        // Using array of sentences
        // doc
        //     .setFont("helvetica")
        //     .setFontSize(12)
        //     .text(this.moreText, 0.5, 3.5, { align: "left", maxWidth: "7.5" });
        
        // Creating footer and saving file
        doc
            // .setFont("times")
            // .setFontSize(11)
            // .setFontStyle("italic")
            // .setTextColor(0, 0, 255)
            .text(
            "Transaction History",
            0.5,
            doc.internal.pageSize.height - 0.5
            )
            .save(`Transaction.pdf`); 
        console.log('adqwd')},
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
    },
  };
</script>