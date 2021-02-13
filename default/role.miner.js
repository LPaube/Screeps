var roleMiner = {
    run: function(creep) {
        let sources = creep.room.find(FIND_SOURCES);
        // *Need to change sources dynamically
        if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[1]);
        }
    }
}

module.exports = roleMiner;