global.fetch = require("node-fetch");
function Tamogotchi(tamoName) {
  //
  this.petName;
  this.initialFood = 60;
  this.metabolismRate = 1000;
  this.loadedData = {};
  this.dataLoadedPromise = null;

  this.init = () => {
    this.petName = tamoName;
    console.log(`Hi!  I'm ${this.petName}`);
    this.hatch();
    this.dataLoadedPromise = fetch("./data.json")
      .then((resp) => resp.json())
      .then((data) => {
        this.loadedData = data;
      });
  };
  this.init();
}
Tamogotchi.prototype.resetFood = function () {
  this.food = this.initialFood;
};

Tamogotchi.prototype.feed = function () {
  const foods = this.loadedData.foods;
  const randomFood = foods[Math.floor(Math.random() * foods.length)];
  console.log(`Feeding ${randomFood.name}`);
  this.food += randomFood.foodPoints;
};

Tamogotchi.prototype.hatch = function () {
  this.resetFood();
  this.startMetabolism();
};

Tamogotchi.prototype.die = function () {
  clearInterval(this.metabolism);
  console.log("I am dead!");
};

Tamogotchi.prototype.startMetabolism = function () {
  this.metabolism = setInterval(() => {
    this.food -= 1;
    console.log(`${this.food} until I starve`);
    if (this.food <= 0) {
      this.die();
    }
  }, this.metabolismRate);
};

Tamogotchi.prototype.changeMetabolism = function (metabolismRate) {
  this.die();
  this.metabolismRate = metabolismRate;
  this.startMetabolism();
};

Tamogotchi.prototype.eatLasagna = function () {
  console.log(`can I see the food? ${this.food}`);
  this.food += 20;
};
// Tamogotchi Ends

const dog = new Tamogotchi("Dog");
dog.changeMetabolism(1200);
dog.dataLoadedPromise.then(() => {
  dog.feed();
  setTimeout(function () {
    dog.feed();
  }, 10000);
});
