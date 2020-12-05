<template>
  <body>
    <div>
      <h1
        id="accountTitle"
        class="d-flex justify-content-between align-items-center"
      >
        Account
        <div class="admin">
          <b-icon icon="person-circle"></b-icon>
          Admin
        </div>
      </h1>
      <br /><br /><br />

      <b-table
        class="tabelAcc"
        striped
        hover
        :items="users"
        :fields="fields"
        :borderless="borderless"
      >
        <template #cell(no)="data">
          {{ data.index + 1 }}
        </template>
        <template #cell(action)="item">
          <b-button
            variant="link"
            class="iconEdit"
            @click="editItem(item)"
            v-b-modal.modal-center
          >
            <b-icon icon="pencil-fill"></b-icon>
          </b-button>

          <b-button
            variant="link"
            class="iconDelete"
            @click="deleteItem(item)"
            v-b-modal.modal-delete
          >
            <b-icon icon="X"></b-icon>
          </b-button>
        </template>
      </b-table>
      <!-- modal edit -->
      <b-modal hide-footer hide-header id="modal-center" centered>
        <div class="editForm">Edit Account</div>
        <b-icon icon="person-fill" class="iconForm"></b-icon>
        <b-form-input
          style="background-color: #ced4da"
          type="text"
          v-model="form.name"
          placeholder="   Name"
          required
        >
        </b-form-input>

        <b-icon icon="envelope-fill" class="iconForm"></b-icon>
        <b-form-input
          v-model="form.email"
          placeholder="   Email"
          disabled
        ></b-form-input>
        <div style="color: #cdcfde">Admin can't change email</div>

        <!-- kalo mau gausah diisi password karena pwnya gabalik dari api  -->

        <!-- <b-icon icon="lock-fill" class="iconForm"></b-icon>
        <b-form-input
          type="password"
          v-model="form.password"
          placeholder="   Password"
          disabled
        ></b-form-input>
        <div style="color: #cdcfde">Admin can't change password</div> -->

        <b-icon icon="telephone-fill" class="iconForm"></b-icon>
        <b-form-input
          style="background-color: #ced4da"
          v-model="form.no_tlp"
          placeholder="   Telp"
          required
        ></b-form-input>

        <b-icon icon="credit-card2-front-fill" class="iconForm"></b-icon>
        <b-form-textarea
          style="background-color: #ced4da"
          v-model="form.alamat"
          placeholder="   alamat"
          required
          no-resize
        >
        </b-form-textarea>
        <br />
        <b-button
          @click="save(form)"
          style="background-color: #151d65; font-weight: bold"
          class="mr-1"
          >save</b-button
        >
        <b-button
          variant="light"
          style="color: #151d65; font-weight: bold"
          @click="cancel"
          class="mr-1"
          >cancel</b-button
        >
      </b-modal>
      <!-- modal hapus -->
      <b-modal
        v-model="dialogdel"
        hide-footer
        hide-header
        id="modal-delete"
        centered
      >
        <div class="modDel">
          <h1>Are you sure?</h1>
          <b-button
            variant="outline-danger"
            @click="confirmdelete"
            style="font-weight: bold"
            >yes</b-button
          >
          <b-button
            variant="outline-light"
            @click="cancel"
            style="font-weight: bold; color: #151d65"
            >no</b-button
          >
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
        "no",
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        //ga ada username
        // { key: "username", label: "Username" },
        { key: "action", label: "Action" },
      ],
      items: [
        {
          no: 1,
          name: "Satria",
          email: "satriaw@gmail.com",
          username: "Sa123",
          action: "",
        },
        {
          no: 2,
          name: "Yoel",
          email: "yehezkielyd@gmail.com",
          username: "EL123",
          action: "",
        },
      ],
      form: {
        name: null,
        email: null,
        password: null,
        no_tlp: null,
        alamat: null,
        image: null,
      },
      users: [],
      user: new FormData(),
      detail: {
        name: null,
        email: null,
        password: null,
        no_tlp: null,
        alamat: null,
        image: null,
      },
      deleteId: "",
      editId: "",
      borderless: true,
      id: null,
    };
  },
  methods: {
    // save() {
    //   this.items.push(this.form);
    //   this.cancel();
    // },
    cancel() {
      this.resetForm();
      this.dialog = false;
      this.edititem = null;
      this.adding = true;
      this.dialogdel = false;
      this.$bvModal.hide("modal-center");
    },
    deleteItem(item) {
          this.id = item.item.id;
      console.log(this.id);
      this.dialogdel = true;
      this.edititem = item;
    },
    confirmdelete() {
      //menghapus data produk
      var url = this.$api + "/user/" + this.id;
      //data dihapus berdasarkan id
      this.$http
        .delete(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.dialogdel = false;
          this.error_message = response.data.message;
          this.color = "green";
          this.snackbar = true;
          this.load = false;
          this.readData(); //mengambildata
          this.resetForm();
        })
        .catch((error) => {
          this.error_message = error.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });

      // this.items.splice(this.items.indexOf(this.edititem), 1);
    },
    editItem(item) {
      //console cek
      console.log(item);
      this.adding = false;
      // this.form = {
      //password emang gabisa balik dari db
      this.id = item.item.id;
      (this.form.name = item.item.name),
        (this.form.email = item.item.email),
        (this.form.password = item.item.password),
        (this.form.no_tlp = item.item.no_tlp),
        (this.form.alamat = item.item.alamat),
        // };
        (this.dialog = true);
      this.edititem = item;
    },
    save(form) {
      console.log(form);
      let newData = {
        name: this.form.name,
        email: this.form.email,
        no_tlp: this.form.no_tlp,
        alamat: this.form.alamat,
      };
      //id nya masih ngambil dari id form
      var url = this.$api + "/user/" + this.id;
      this.load = true;
      this.$http
        .put(url, newData, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.error_message = response.data.message;
          this.color = "green";
          this.snackbar = true;
          this.load = false;
          this.readData(); //mengambildata
          this.resetForm();
          this.$bvModal.hide("modal-center");
          // this.inputType = "Tambah";
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });
      // this.cancel();
    },
    resetForm() {
      this.form = {
        name: null,
        email: null,
        password: null,
        no_tlp: null,
        alamat: null,
      };
    },
    readData() {
      ///tinggal hapus local storage di set pas login
      localStorage.setItem(
        "token",
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNjExYWUzZDUwMDkxMWMyM2I4YzRjZDhjMzYwMDAzOTg3Nzk1M2QzYmM2OWRlMjZiYjQ1ZTUyZTFkMDFiYWJiMDMyMDM0MjBiYWFiOTgwMmMiLCJpYXQiOjE2MDcxNzQ3MjksIm5iZiI6MTYwNzE3NDcyOSwiZXhwIjoxNjM4NzEwNzI5LCJzdWIiOiI2Iiwic2NvcGVzIjpbXX0.nw_VPXpYiNPiw6YPcyu4f-GTs5B-p9DEtniyxvnFkYZFdJW4_VsOnjXdpNzuJXyxVu8AVpLrpY4WKVVQxBZJPmAyvKvmxw9X1F5YqCSfgmCn7ho7ZY391FrAuHu1_8KEwEsgc_Uzol_wHCqYxK67TGj3nZqXYkB6p-HVAI_9r8qeoLnzPl5ajrCLRmn57mhlRjMxIOvfT6aL_dR_3LlOqDG5aryRp1fh6eV7xT8ctsVfQrJG3f4L4-4knMxWcWO1eP6lH9d9xQO18bqVfG2AefyovIiW2lYem-VB-XYQNPzhVkuTsnDoF8Bnfz4WF7YdbazW6C8CcFl7aV502iTc4V90s2lkECimkf2TFVwk8j9Y8pWqmOCHKTMlBuFjIG-FbOEeNud2YxnGcAiq9RzG5uNOPegwtCmTWTolmpU8XcEwWIzvkbzpji9QAd76pvmZdJ13lHY7ODui8t5vcqgGZojhbAvo1U4hx1nXmV9We2gc9l1z_AQQvTPmdjIgGrdF5coD7wT-U_-_91fqL9FDqzJzjtIpwVIFu-vGP94bjSUCa5t0CL75-32ezeS8mjkltSEPvwpNe03GIBhN0hKJeILNMIMTDkT8JVilk1pMmaBIm2AYCfLfosi0LPKV9lVRcknNBMJp47Kv3xQAFfA-XQq6lHF8zQsNo9Fn-0jlfbQ"
      );
      var url = this.$api + "/user";
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.users = response.data.data;
          //console log bisa dihapus nnti kalo dah kelar
          console.log(this.users);
        });
    },
  },
  mounted() {
    this.readData();
  },
};
</script>