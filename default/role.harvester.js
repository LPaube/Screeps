var roleHarvester = {
    run: function(creep) {
        if (creep.store.getFreeCapacity() > 0) {
            let sources = creep.room.find(FIND_SOURCES);
            // *Need to change sources dynamically
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        } else {
            let structs = creep.room.find(FIND_STRUCTURES);
            let targets = _.filter(structs, function(struct) {
                return (struct.structureType == STRUCTURE_SPAWN || struct.structureType == STRUCTURE_EXTENSION) && struct.store.getFreeCapacity(RESOURCE_ENERGY) > 0
            });
            if (targets.length > 0) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            } else {
                creep.moveTo(20, 20);
            }
        }
    }
}

module.exports = roleHarvester;