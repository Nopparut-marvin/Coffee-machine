const coffeeMachine = document.getElementById("coremachine");

const status = {
  plugin: {
    isActive: true,
    statusClass: "isPlugIn",
    controller: document.getElementById("isPlugIn"),
    controllerLabel: ["PLUG IN ", "UNPLUG"],
  },
  clear: {
    isActive: false,
    statusClass: "isCleared",
    controller: document.getElementById("clear"),
    controllerLabel: ["Clear", "Unclear"],
  },
  power: {
    isActive: false,
    statusClass: "isFilling",
    controller: document.getElementById("power"),
    controllerLabel: ["STOP", "START"],
  },
};

for (let action in status) {
  const { statusClass, controller, controllerLabel } = status[action];

  controller.addEventListener("click", function (event) {
    const { isActive } = status[action];
    coffeeMachine.classList.toggle(statusClass);
    this.innerHTML = controllerLabel[isActive * 1];

    if (action === "power" && !isActive) {
      // Slow start
      coffeeMachine.classList.add(statusClass);
      coffeeMachine.classList.add("isStarting");
      setTimeout(() => {
        coffeeMachine.classList.remove("isStarting");
      }, washSpeed * 2);
    }

    status[action].isActive = !isActive;

    setTimeout(function () {
      updateMachine();
    }, 100); // Timeout needed because of a bug on FF when updating innerHTML
  });
}
