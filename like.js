$(document).ready(function(){
    $(".like-content").click(function(){
      $(".like-content").toggleClass("like-active")
      $(".like").toggleClass("like-active")
      $(".counter").toggleClass("like-active")
    })
  })