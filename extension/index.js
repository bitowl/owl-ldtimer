'use strict';

module.exports = function (nodecg) {
    const ldTimer = nodecg.Replicant('timer', {defaultValue:{
        text: "--:--:--",
    }, persistent: false});

    const timerConf = nodecg.Replicant('config', { 
        defaultValue: {
            startDate: '1323-11-23T15:21',
            endDate: '1323-11-23T18:21'
        }, persistent: true
    });

    var timerInterval = setInterval(() => {
        tick();
    }, 100);

    var startDate = null;
    var endDate = null;

    timerConf.on('change', newVal => {
        startDate = new Date(newVal.startDate);
        endDate = new Date(newVal.endDate);
        console.log(startDate);
    });

    function tick() {
        if (endDate === null) {
            return;
        }
        var t = endDate - new Date();
        if (t < 0) {
            ldTimer.value.text = "\\ö/";
            return;
        }
        var seconds = Math.floor( (t/1000) % 60 );
        var minutes = Math.floor( (t/1000/60) % 60 );
        var hours = Math.floor( (t/(1000*60*60)) );

        ldTimer.value.text = doubleDigit(hours) + ":" + doubleDigit(minutes) + ":" + doubleDigit(seconds);
    }

    function doubleDigit(digit) {
        if (digit < 10) {
            return "0" + digit;
        }
        return digit;
    }
};
