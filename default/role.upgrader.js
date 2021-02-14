var roleUpgrader = {
    run: function(creep) {
        if(creep.memory.transferring == false) {
            let storageStructs = creep.room.find(FIND_STRUCTURES);
            let storageTargets = _.filter(storageStructs, function(storageStruct) {
                return (storageStruct.structureType == STRUCTURE_CONTAINER || storageStruct.structureType == STRUCTURE_STORAGE) && storageStruct.store.getUsedCapacity(RESOURCE_ENERGY) > 0
            });
            storageTargets.sort((a,b) => b.store.getUsedCapacity(RESOURCE_ENERGY) - a.store.getUsedCapacity(RESOURCE_ENERGY));

            if (creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
                creep.memory.transferring = true;
            }
            // *Need to change sources dynamically
            else if (creep.withdraw(storageTargets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storageTargets[0]);
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