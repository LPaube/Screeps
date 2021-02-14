var roleMiner = {
    run: function(creep) {
        let sources = creep.room.find(FIND_SOURCES);
        // *Need to change sources dynamically
        if (creep.harvest(sources[creep.memory.source]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[creep.memory.source]);
        }
    }
}

module.exports = roleMiner;