<script>
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCred) => {
      const uid = userCred.user.uid;

      firebase.database().ref("users/" + uid).once("value")
        .then(snapshot => {
          if (!snapshot.exists()) {
            alert("No role assigned to this user");
            return;
          }

          const role = snapshot.val().role;

          if (role === "admin") {
            window.location.href = "admin.html";
          } 
          else if (role === "teacher") {
            window.location.href = "teacher.html";
          } 
          else if (role === "student") {
            window.location.href = "student.html";
          }
        });
    })
    .catch(error => alert(error.message));
}
</script>
