var roleRepairer = {
    run: function(creep) {
        if (creep.memory.transferring == false) {
            let droppedSources = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
            if (creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
                creep.memory.transferring = true;
            }
            // *Need to change sources dynamically
            else if (droppedSources) {
                if (creep.pickup(droppedSources) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(droppedSources);
                }
            } 
            else {
                let storageStructs = creep.room.find(FIND_STRUCTURES);
                let storageTargets = _.filter(storageStructs, function(storageStruct) {
                    return (storageStruct.structureType == STRUCTURE_CONTAINER || storageStruct.structureType == STRUCTURE_STORAGE) && storageStruct.store.getUsedCapacity(RESOURCE_ENERGY) > 0
                });
                if (creep.withdraw(storageTargets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storageTargets[0]);
                }
            }
        } 
        else if (creep.memory.transferring == true) {
            let targets = creep.room.find(FIND_STRUCTURES, {
                filter: object => object.hits < object.hitsMax && object.structureType != STRUCTURE_WALL
            });
            
            if (targets.length > 0) {
                if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
            if (creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0) {
                creep.memory.transferring = false;
            }
        }
    }
}

module.exports = roleRepairer;