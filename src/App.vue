<template>
  <div id="app">

      <b-container fluid>
        <router-view></router-view>
      </b-container>

  </div>
</template>

<script>
export default {
  name: "App",
}
</script>

<style>

body{
  background-color: #F2F5F7 !important;
  padding-left: 12%;
  padding-right: 3%;
}

#page{
  background-color: #F2F5F7 !important;
  padding-left: 10%;
}

.DatMas{
    text-align: center;
    color: #151D65;
    font-size: 100%;
    font-weight: bold;
  }

  .sidebar{
    background-color: #151D65;
    border-radius: 0% 10% 10% 0%;
  }

  .iconForm{
    color: #151D65;
    position: relative;
    top: 30px;
    
  }

  .logout{
    text-align: center;
    color: #151D65;
    font-size: 100%;
    font-weight: bold;
  }

  #listHam{
    position:absolute;
    left: 0px;
    right: 0px;
    padding-bottom: 45%;
    padding-right: 5%;
    border-radius: 0% 10% 10% 0%;
    background-color: #151D65;
  }

  .titleProduct{
    text-align: center;
    font-weight: bold;
    color: #151D65;
    font-size: 30px;
  }

  

  .modDel{
    font-weight:900;
    color:#151D65;
    text-align: center;
  }

  .admin{
    padding-right: 15%;
  }

  #accountTitle{
    color: #151D65;
    font-size: 200%;
    font-weight: bold;
    padding-top: 2%;
  }

  .tabelAcc{
    color: #151D65;
  }

  .iconEdit{
    color: #61AB43;
  }

  .iconDelete{
    color: #D9534F;
  }

  .editForm{
    color: #151D65;
    font-weight: bold;
    font-size: 30px;
    text-align: center;
  }

  .saveBtn{
    color: #151D65;
  }
</style>

