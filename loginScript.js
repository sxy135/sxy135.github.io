function checkPswd() {
          var confirmPassword = "KMA 2019";
          var password = document.getElementById("pswd").value;
          if (password == confirmPassword) {
              window.location.href="kmawithpsw.html";
          }
          else{
              alert("Passwords do not match.");
          }
      }