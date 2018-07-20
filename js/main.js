
$('#change2').on('click', function (e) {
    e.preventDefault()
    $('#change1').click();
  })

  var config = {
    apiKey: "AIzaSyC57ataWWa1RHNwh75u-QqKPajadxp6oJg",
    authDomain: "wizard-90218.firebaseapp.com",
    databaseURL: "https://wizard-90218.firebaseio.com",
    projectId: "wizard-90218",
    storageBucket: "wizard-90218.appspot.com",
    messagingSenderId: "1070532524828"
  };
  firebase.initializeApp(config);
  document.getElementById('submit').addEventListener("click", submitForm);
    function submitForm(e){
      e.preventDefault();
      var name = $("#name").val();
      var address = $("#address").val();
      var gov = $("#gov").val();
      var email = $("#email").val();
      var phone = $('#phone').val();
      var hoursFrom = $('#from').val();
      var hoursTo = $('#to').val();
      var speciality = $('#spec').val();

    saveMessage(name,address,gov,email,phone,hoursFrom,hoursTo,speciality);
  }
  var messagesRef = firebase.database().ref('doctors');
  function saveMessage(name,address,gov,email,phone,hoursFrom,hoursTo,speciality){
   var newMessageRef = messagesRef.push();
      newMessageRef.set({
        name   : name,
        address : address,
        gov: gov,
        email : email,
        phone : phone,
        hoursFrom : hoursFrom,
        hoursTo : hoursTo,
        speciality : speciality,
      })}



        //var pushups = 100; //alert("amine andek"+pushups+"pompes")
