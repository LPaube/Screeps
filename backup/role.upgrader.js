var roleUpgrader = {
    run: function(creep) {
        if(creep.memory.transferring == false) {
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.store.getFreeCapacity() == 0) {
                creep.memory.transferring = true;
            }
            // *Need to change sources dynamically
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1]);
            }
        } else if (creep.memory.transferring == true) {
            if (creep.store.getUsedCapacity() == 0) {
                creep.memory.transferring = false;
            }
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
    }
}

module.exports = roleUpgrader;