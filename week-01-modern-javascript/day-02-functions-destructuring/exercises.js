// Sample nested user — flatten to { name, city, primaryEmail } using ONLY destructuring.
const user = {
  profile: {
    name: 'Ada',
    address: { city: 'London', country: 'UK' },
  },
  contacts: {
    emails: ['ada@example.com', 'ada.l@example.com'],
  },
};

// TODO: implement using destructuring only — no `user.profile.name` style access
function summarize(/* user */) {
  return { name: '', city: '', primaryEmail: '' };
}

console.log(summarize(user));

// TODO: refactor this class to use arrow methods so `this` binds correctly without .bind()
class Timer {
  constructor() {
    this.seconds = 0;
  }
  start() {
    setInterval(function tick() {
      this.seconds++; // broken — `this` is wrong here
      console.log(this.seconds);
    }, 1000);
  }
}
