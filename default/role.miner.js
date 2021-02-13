var roleMiner = {
    run: function(creep) {
        if (creep.store.getFreeCapacity() > 0) {
            let sources = creep.room.find(FIND_SOURCES);
            // *Need to change sources dynamically
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        } 
    }
}

module.exports = roleMiner;