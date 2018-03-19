(function () {
    'use strict';

    const timerConfig = nodecg.Replicant('config');

    class OwlTimerDates extends Polymer.Element {
        static get is() {
            return 'owl-timer-dates';
        }

        ready() {
            super.ready();
            this.customText = 'initialText';
            timerConfig.on('change', newValue => {
                this.startDate = newValue.startDate;
                this.endDate = newValue.endDate;
            });

        }

        showMeThings() {
            timerConfig.value.startDate = this.$.startDate.value;
            timerConfig.value.endDate = this.$.endDate.value;
        }
    }
    customElements.define(OwlTimerDates.is, OwlTimerDates);
})();