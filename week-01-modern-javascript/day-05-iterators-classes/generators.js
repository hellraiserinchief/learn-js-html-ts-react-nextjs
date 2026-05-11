// Lazy infinite sequence
function* naturals() {
  let n = 1;
  while (true) yield n++;
}

const g = naturals();
console.log(g.next().value); // 1
console.log(g.next().value); // 2

// TODO: write a generator that paginates a real paginated API one page at a time.
// Example API: https://api.github.com/users/torvalds/repos?per_page=10&page=N
async function* paginate(/* url */) {
  // yield each page's results until the API returns an empty page
}
