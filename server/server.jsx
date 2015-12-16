if (MyData.find().count() === 0) {
  _.each(_.range(25), function(){
    MyData.insert({
      name: faker.name.findName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar()
    });
  });
}

if (Meteor.users.find().count() === 0) {
  Accounts.createUser({
    username: "vqc",
    password: "password",
    profile: {
      image: "http://i.imgur.com/NqyBZSp.gif"
    }
  })
}
if (MyCards.find().count() === 0) {
  _.each(_.range(25), function() {
    MyCards.insert({
      name: faker.name.findName(),
      image: faker.image.people() + "?" + Random.hexString(24),
      details: faker.lorem.sentence()
    })
  })
}


Meteor.publish("myData", function() {
  return MyData.find();
});

Meteor.publish("myCards", function() {
  return MyCards.find();
});

