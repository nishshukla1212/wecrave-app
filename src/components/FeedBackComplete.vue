<template>
    <div class="landing-page">
    <div class="logo-container">
      <div class="row">
        <h1 class="pageTitle" style="margin-left:auto; margin-right:auto;">
          Feedback
        </h1>
      </div>
    </div>
    <div class="pageBody">
      <div class="confirmationText">
        Thank you for your feedback!
      </div>
      <div class="confirmationLogo">
        <img src="~@/assets/logo.png" width="141px" height="96px" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:"FeedbackComplete"
}
</script>

<style lang="scss">
  .confirmationLogo {
    width: 141px;
    height: 96px;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
  }
  .confirmationText {
    width: 315px;
    height: 72px;
  
    font-family: Nunito;
    font-style: normal;
    font-weight: bold;
    font-size: 32px;
    line-height: 44px;
    display: flex;
    align-items: center;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 10%;
    color: #000000;
  }
  .orderID {
    @extend .confirmationText;
    margin-top: 10%;
  }
  .pageBody {
    margin-left: auto;
    margin-right: auto;
    justify-content: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  </style>
  