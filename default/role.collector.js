var roleCollector = {
    run: function(creep) {
        if (creep.memory.transferring == false) {
            let droppedSources = creep.room.find(FIND_DROPPED_RESOURCES);
             droppedSources.sort((a,b) => b.amount - a.amount);
            if (creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
                creep.memory.transferring = true;
            }
            // *Need to change sources dynamically
            else if (droppedSources) {
                if (creep.pickup(droppedSources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(droppedSources[0]);
                }
            } else {
                let storageStructs = creep.room.find(FIND_STRUCTURES);
                let storageTargets = _.filter(storageStructs, function(storageStruct) {
                    return (storageStruct.structureType == STRUCTURE_CONTAINER || storageStruct.structureType == STRUCTURE_STORAGE) && storageStruct.store.getUsedCapacity(RESOURCE_ENERGY) > 0
                });
                storageTargets.sort((a,b) => b.store.getUsedCapacity(RESOURCE_ENERGY) - a.store.getUsedCapacity(RESOURCE_ENERGY));
                if (creep.withdraw(storageTargets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storageTargets[0]);
                }
            }
        } else if (creep.memory.transferring == true) {
            let structs = creep.room.find(FIND_MY_STRUCTURES);
            let targets = _.filter(structs, function(struct) {
                return (struct.structureType == STRUCTURE_SPAWN || struct.structureType == STRUCTURE_EXTENSION) && struct.store.getFreeCapacity(RESOURCE_ENERGY) > 0
            });
            let storageStructs = creep.room.find(FIND_STRUCTURES);
            let storageTargets = _.filter(storageStructs, function(storageStruct) {
                return (storageStruct.structureType == STRUCTURE_CONTAINER || storageStruct.structureType == STRUCTURE_STORAGE || storageStruct.structureType == STRUCTURE_TOWER) && storageStruct.store.getFreeCapacity(RESOURCE_ENERGY) > 0
            });
            storageTargets.sort((a,b) => a.store.getUsedCapacity(RESOURCE_ENERGY) - b.store.getUsedCapacity(RESOURCE_ENERGY));
            
            if (creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0) {
                creep.memory.transferring = false;
            } else if (targets.length > 0) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            } else if (storageTargets.length > 0) {
                if (creep.transfer(storageTargets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storageTargets[0]);
                }
            }
        }
    }
}

module.exports = roleCollector;