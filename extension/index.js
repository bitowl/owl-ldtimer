'use strict';

module.exports = function (nodecg) {
    const ldTimer = nodecg.Replicant('timer', {defaultValue:{
        text: '--:--:--',
    }, persistent: false});

    const timerConf = nodecg.Replicant('config', { 
        defaultValue: {
            startDate: '1323-11-23T15:21',
            endDate: '1323-11-23T18:21',
            finishText: '--:--:--',
            startPrefix: '',
            endPrefix: ''
        }, persistent: true
    });

    var timerInterval = setInterval(() => {
        tick();
    }, 100);

    var startDate = null;
    var endDate = null;

    timerConf.on('change', newVal => {
        if (newVal.startDate === undefined) {
            startDate = null;
        } else {
            startDate = new Date(newVal.startDate);
        }
        if (newVal.endDate === undefined) {
            endDate = null;
        } else {
            endDate = new Date(newVal.endDate);
        }
    });

    function tick() {
        var now = new Date();
        if (startDate !== null) {
            var timeUntilStart = startDate - now;
            if (timeUntilStart >= 0) {
                showTime(timerConf.value.startPrefix, timeUntilStart);
                return;
            }
        }

        if (endDate !== null) {
            var timeUntilEnd = endDate - now;
            if (timeUntilEnd >= 0) {
                showTime(timerConf.value.endPrefix, timeUntilEnd);
                return;
            }
        }

        showFinishText();
    }

    function showTime(prefix, t) {
        var seconds = Math.floor( (t/1000) % 60 );
        var minutes = Math.floor( (t/1000/60) % 60 );
        var hours = Math.floor( (t/(1000*60*60)) );

        ldTimer.value.text = prefix + doubleDigit(hours) + ':' + doubleDigit(minutes) + ':' + doubleDigit(seconds);
    }

    function showFinishText() {
        ldTimer.value.text = timerConf.value.finishText;
    }

    function doubleDigit(digit) {
        if (digit < 10) {
            return '0' + digit;
        }
        return digit;
    }
};
