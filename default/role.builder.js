var roleBuilder = {
    run: function(creep) {
        if(creep.memory.transferring == false) {
            let droppedSources = creep.room.find(FIND_DROPPED_RESOURCES);
            if (creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
                creep.memory.transferring = true;
            }
            // *Need to change sources dynamically
            // else if (droppedSources) {
            //     if (creep.pickup(droppedSources[0]) == ERR_NOT_IN_RANGE) {
            //         creep.moveTo(droppedSources[0]);
            //     }
            // } 
            else {
                let storageStructs = creep.room.find(FIND_STRUCTURES);
                let storageTargets = _.filter(storageStructs, function(storageStruct) {
                    return (storageStruct.structureType == STRUCTURE_CONTAINER || storageStruct.structureType == STRUCTURE_STORAGE) && storageStruct.store.getUsedCapacity(RESOURCE_ENERGY) > 0
                });
                storageTargets.sort((a,b) => b.store.getUsedCapacity(RESOURCE_ENERGY) - a.store.getUsedCapacity(RESOURCE_ENERGY));
                if (creep.withdraw(storageTargets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storageTargets[0]);
                }
            }
        }
            // var sources = creep.room.find(FIND_SOURCES);
            // if (creep.store.getFreeCapacity() == 0) {
            //     creep.memory.transferring = true;
            // }
            // // *Need to change sources dynamically
            // if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
            //     creep.moveTo(sources[0]);
            // }
        else if (creep.memory.transferring == true) {
            let target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
            if (creep.store.getUsedCapacity() == 0) {
                creep.memory.transferring = false;
            } else if (target) {
                if (creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            } else if (!target) {
                creep.memory.role = "upgrader";
            }
        }
    }
}

module.exports = roleBuilder;