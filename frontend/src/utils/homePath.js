/** Default landing after clicking "Home" in the shell (Admin dashboard vs everyone else). */
export function getHomePath() {
  const role = localStorage.getItem('role');
  if (role === 'Admin') return '/';
  return '/view-courses';
}
