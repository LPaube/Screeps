var roleLongDistanceMiner = {
    run: function(creep) {
        if (creep.room.name == creep.memory.targetRoom) {
            var source = creep.room.find(FIND_SOURCES)[0];
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        } else {
            var exit = creep.room.findExitTo(creep.memory.targetRoom);
            creep.moveTo(creep.pos.findClosestByRange(exit));
        }
    }
}

module.exports = roleLongDistanceMiner;