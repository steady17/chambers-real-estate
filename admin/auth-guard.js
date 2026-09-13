/**
 * CHAMBERS ADMIN — auth guard
 * -----------------------------------------------------------------
 * Runs before the dashboard renders. If nobody is logged in, sends
 * the browser straight to the login page instead of showing any
 * dashboard content. If someone IS logged in, reveals the dashboard
 * and wires up the logout button.
 * -----------------------------------------------------------------
 */
(async () => {
  const { data } = await chambersDB.auth.getSession();
  if(!data?.session){
    location.href = "login.html";
    return;
  }
  document.getElementById("admin-shell").style.display = "";

  // Redirect to login immediately if the session ever ends
  chambersDB.auth.onAuthStateChange((event) => {
    if(event === "SIGNED_OUT") location.href = "login.html";
  });
})();

async function handleLogout(e){
  e.preventDefault();
  await chambersDB.auth.signOut();
  location.href = "login.html";
}
