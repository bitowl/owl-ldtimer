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
                this.finishText = newValue.finishText;
                this.startPrefix = newValue.startPrefix;
                this.endPrefix = newValue.endPrefix;
            });

        }

        update() {
            timerConfig.value.startDate = this.$.startDate.value;
            timerConfig.value.endDate = this.$.endDate.value;
            timerConfig.value.finishText = this.$.finishText.value;
            timerConfig.value.startPrefix = this.$.startPrefix.value;
            timerConfig.value.endPrefix = this.$.endPrefix.value;
        }
    }
    customElements.define(OwlTimerDates.is, OwlTimerDates);
})();