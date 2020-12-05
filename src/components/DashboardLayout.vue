<template>
  <div>
    <b-button v-b-toggle.sidebar-backdrop width="500px" id="listHam"><b-icon icon="list"></b-icon></b-button>
    <b-sidebar id="sidebar-backdrop" aria-labelledby="sidebar-no-header-title" no-header backdrop-variant="transparent" backdrop shadow>
      <template #default="{ hide }">
        <div class="sidebar">
            <div class="froster">
            <img style="position: relative;" src="../assets/logo-reversed.png" width="50" height="50" >
            Froster.
            ______________
            </div>
          <br><br><br><br>

          <nav class="DatMas">
              <b-nav-item to="/account" @click="hide">
                <div class="warnaDL">
                  <b-icon icon="person-fill"></b-icon>
                    <span style="color: #151D65;">______</span>Account
                  </div>
              </b-nav-item><br>
              <b-nav-item to="/products" @click="hide">
                <div class="warnaDL">
                  <b-icon icon="archive-fill"></b-icon>
                    <span style="color: #151D65;">______</span>Product
                </div>
              </b-nav-item><br>
              <b-nav-item to="/transaction" @click="hide">
                <div class="warnaDL">
                  <b-icon icon="cart-3" flip-h></b-icon>
                  <span style="color: #151D65;">____</span>Transaction
                </div>
              </b-nav-item><br>
              <b-nav-item to="/location" @click="hide">
                <div class="warnaDL">
                  <b-icon icon="geo-alt-fill"></b-icon>
                  <span style="color: #151D65;">_______</span>Location
                </div>
              </b-nav-item><br>
              
          </nav>
          
          <!-- <b-button variant="primary" block @click="hide">Close Sidebar</b-button> -->
          <br><br><br><br><br><br>
          <nav class="logout">
            <b-nav-item to="/login" @click="logout()">
            <div class="warnaDL">
              <b-icon icon="box-arrow-in-right"></b-icon>
              Logout
            </div>
            </b-nav-item>
          </nav>
        </div>
      </template>
    </b-sidebar>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name:"Account",
  data(){
    return{
      drawer:true,
      items:[
        {name: "Account",to:"/account",icon:"person-fill"},
        {name: "Product",to:"/products"},
        {name: "Transaction",to:"/transaction"},
        {name: "Location",to:"/location"},
      ],
    };
  },
  methods: {
    logout(){
      localStorage.removeItem('token')
      this.$router.replace('/login')
    }
  }
}
</script>

<style>
  .warnaDL{
    color: white;
  }

  .froster{
    font-weight: bold;
    font-size:30px;
    color: white;
    padding-top: 80px;
    padding-left: 70px;
  }
</style>