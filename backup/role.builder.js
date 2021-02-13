var roleBuilder = {
    run: function(creep) {
        if(creep.memory.transferring == false) {
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.store.getFreeCapacity() == 0) {
                creep.memory.transferring = true;
            }
            // *Need to change sources dynamically
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        } else if (creep.memory.transferring == true) {
            let target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
            if (creep.store.getUsedCapacity() == 0) {
                creep.memory.transferring = false;
            } else if (target) {
                if (creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
        }
    }
}

module.exports = roleBuilder;